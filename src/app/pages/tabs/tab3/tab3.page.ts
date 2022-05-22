import { Component, OnInit } from '@angular/core';
import { Docker } from 'src/app/classes/docker';
import { DockerService } from 'src/app/services/docker.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

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
      this.dockerInfo = await this.dockerService.getDockerInfo().toPromise()
      this.isError = false
    } catch (_) {
      this.isError = true
    } finally {
      this.isLoading = false
    }
  }
}
