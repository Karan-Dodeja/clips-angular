import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClipService } from '../services/clip.service';



@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrl: './clips-list.component.css'
})
export class ClipsListComponent implements OnInit, OnDestroy {

  constructor(public clipservice: ClipService) { 
    clipservice.getClips()
   }

  ngOnInit(): void {
    window.addEventListener('scroll',this.handleScroll)
  }

  handleScroll = () => {
    
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window

    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

    if(bottomOfWindow) {
        this.clipservice.getClips()
    }

  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll',this.handleScroll)
  }

}
