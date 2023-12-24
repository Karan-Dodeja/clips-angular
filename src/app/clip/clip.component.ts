import { ViewEncapsulation, ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from "video.js";

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ClipComponent implements OnInit {
  id = ''
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef
  player?: typeof videojs.players
  constructor(public route: ActivatedRoute) { }
  ngOnInit() {
    this.player = videojs(this.target?.nativeElement)
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
  }
}
