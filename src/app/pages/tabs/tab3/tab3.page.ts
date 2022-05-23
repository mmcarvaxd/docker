import { Component, OnInit } from '@angular/core';
import { Docker } from 'src/app/classes/docker';
import { DockerVersion } from 'src/app/classes/docker-version';
import { DockerService } from 'src/app/services/docker.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  dockerVersion: DockerVersion = null
  dockerInfo: Docker = null
  isLoading: boolean = false
  isError: boolean = false

  constructor(private dockerService: DockerService) {}
  async ngOnInit(): Promise<void> {
    await this.getDockerInfo()
  }

  async getDockerInfo() {
    try {
      this.isLoading = true
      this.dockerVersion = await this.dockerService.getDockerVersion().toPromise()
      this.dockerInfo = await this.dockerService.getDockerInfo().toPromise()
      this.isError = false
    } catch (_) {
      this.isError = true
    } finally {
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    }
  }
}
