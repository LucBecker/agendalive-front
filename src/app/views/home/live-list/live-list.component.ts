import { LiveService } from './../../../shared/service/live.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Live } from 'src/app/shared/model/live.model';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent  implements OnInit {

  livesNext: Live[] = [];
  livesPrevious: Live[] = [];
  next: boolean = false;
  previous: boolean = false;
  url: string = '';
  urlSafe!: SafeResourceUrl;


  constructor(
    private liveService: LiveService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
   this.getLives();
  }

  getLives(){
    this.liveService.getLivesWithFlag('previous').subscribe(data => {
      this.livesPrevious = data.content;
      this.livesPrevious.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
      this.next = true;
    });

    this.liveService.getLivesWithFlag('previous').subscribe(data => {
      this.livesNext = data.content;
      this.livesNext.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
      this.previous = true;
    });
  }
}
