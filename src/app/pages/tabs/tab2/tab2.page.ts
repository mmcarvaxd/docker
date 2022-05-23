import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Image } from 'src/app/classes/image';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit  {
  isLoading: boolean = false
  isError: boolean = false
  imagens: Image[] = []

  constructor(private imagesService: ImagesService, 
    public actionSheetController: ActionSheetController, 
    public toastController: ToastController,
    public alertController: AlertController) {}

    async ngOnInit(): Promise<void> {
      await this.getDockerInfo()
    }
  
    async getDockerInfo(event?: any) {
      try {
        if(!event){
          this.isLoading = true
        }
        this.imagens = await this.imagesService.getAllImages().toPromise()
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
  
    async deleteContainer(containerId: string) {
      try {
        this.presentToast("A imagem está sendo apagada...")
        await this.imagesService.deleteImage(containerId).toPromise()
        this.presentToast("O imagem foi apagada")
        return
      } catch (error) {
        this.presentToast("Ocorreu um erro ao apagar a Imagem!") 
      }
    }

    async presentToast(message: string) {
      const toast = await this.toastController.create({
        message,
        duration: 4000
      });
      toast.present();
    }

    async containerClick(container: Image) {
      let buttons: ActionSheetButton[] = []
  
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
        header: container.RepoTags[0],
        cssClass: 'my-custom-class',
        buttons
      });
      await actionSheet.present();
    }
}
