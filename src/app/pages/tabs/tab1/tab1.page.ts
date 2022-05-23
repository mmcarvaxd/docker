import { Component, OnInit } from '@angular/core';
import { Container } from 'src/app/classes/container';
import { CreateContainer } from 'src/app/classes/createContainer';
import { ContainersService } from 'src/app/services/containers.service';
import { ActionSheetButton, ActionSheetController, AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  containers: Container[] = []
  isLoading: boolean = false
  isError: boolean = false

  constructor(private containerService: ContainersService, public actionSheetController: ActionSheetController, public toastController: ToastController, public alertController: AlertController) {}
  async ngOnInit(): Promise<void> {
    await this.getDockerInfo()
  }

  async getDockerInfo(event?: any) {
    try {
      if(!event){
        this.isLoading = true
      }
      this.containers = await this.containerService.getAllContainers().toPromise()
      // this.dockerInfo = await this.containerService.getAllContainers().toPromise()
      this.isError = false
    } catch (_) {
      this.isError = true
    } finally {
      setTimeout(() => {
        if(event){
          event.target.complete();
        }

        this.isLoading = false
      }, 2000)
    }
  }

  async containerClick(container: Container) {
    let buttons: ActionSheetButton[] = []
    if(container.State === 'exited' || container.State === 'created') {
      buttons.push({
        text: 'Run',
        icon: 'caret-forward-circle',
        data: 'Data value',
        handler: () => {
          this.startContainer(container.Id).then(async () => {
            await this.getDockerInfo()
          })
        }
      })
    } else {
      buttons.push({
        text: 'Stop',
        icon: 'stop-circle',
        handler: () => {
          this.stopContainer(container.Id).then(async () => {
            await this.getDockerInfo()
          })
        }
      })
    }

    buttons.push({
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      id: 'delete-button',
      data: {
        type: 'delete'
      },
      handler: () => {
        this.deleteContainer(container.Id).then(async () => {
          await this.getDockerInfo()
        })
      }
    })

    buttons.push({
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    })

    const actionSheet = await this.actionSheetController.create({
      header: container.Names[0],
      cssClass: 'my-custom-class',
      buttons
    });
    await actionSheet.present();
  }

  async startContainer(containerId: string) {
    try {
      this.presentToast("O Container está iniciando...")
      await this.containerService.startContainer(containerId).toPromise()
      this.presentToast("O Container foi iniciado...")
      return
    } catch (error) {
      this.presentToast("Ocorreu um erro ao iniciar o Docker!") 
    }
  }

  async stopContainer(containerId: string) {
    try {
      this.presentToast("O Container está parando...")
      await this.containerService.stopContainer(containerId).toPromise()
      this.presentToast("O Container foi parado")
      return
    } catch (error) {
      this.presentToast("Ocorreu um erro ao parar o Docker!") 
    }
  }

  async deleteContainer(containerId: string) {
    try {
      this.presentToast("O Container está sendo apagado...")
      await this.containerService.deleteContainer(containerId).toPromise()
      this.presentToast("O Container foi apagado")
      return
    } catch (error) {
      this.presentToast("Ocorreu um erro ao parar o Docker!") 
    }
  }

  async createContainer(container: CreateContainer, name?:string) {
    try {
      this.presentToast("O Container está sendo criado...")
      await this.containerService.createContainer(container, name).toPromise()
      this.presentToast("O Container foi criado")
      return
    } catch (error) {
      this.presentToast("Ocorreu um erro ao criar o Docker!") 
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 4000
    });
    toast.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Criar Container',
      inputs: [
        {
          name: 'Name',
          type: 'text',
          placeholder: 'Nome do Container'
        },
        {
          name: 'Hostname',
          type: 'text',
          placeholder: 'Nome do Host'
        },
        {
          name: 'Domainname',
          type: 'text',
          value: 'localhost',
          placeholder: 'Nome do Dominio'
        },
        {
          name: 'Image',
          type: 'text',
          placeholder: 'Nome da Imagem'
        },
        {
          name: 'ServicePort',
          type: 'number',
          placeholder: 'Porta do Serviço'
        },
        {
          name: 'ExternalPort',
          type: 'number',
          placeholder: 'Porta Externa'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (resp) => {
            let cc: CreateContainer = {
              Domainname: resp.Domainname,
              Hostname: resp.Hostname,
              Image: resp.Image
            }
            if(resp.ServicePort && resp.ExternalPort) {
              cc.ExposedPorts = {}
              cc.ExposedPorts[`${resp.ServicePort}`] = resp.ExternalPort
            }

            this.createContainer(cc, resp.Name).then(async () => {
              await this.getDockerInfo()
            })
          }
        }
      ]
    });

    await alert.present();
  }

}
