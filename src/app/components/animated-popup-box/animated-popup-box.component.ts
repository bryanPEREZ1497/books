import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-popup-box',
  templateUrl: './animated-popup-box.component.html',
  styleUrls: ['./animated-popup-box.component.css']
})
export class AnimatedPopupBoxComponent implements OnInit {
  popupContainer = document.querySelector('.popupContainer');
  toogleBtn = document.querySelector('.toogleBtn');

  constructor() { }

  ngOnInit(): void {
  }

  toogle() {
    console.log('s');
    this.popupContainer?.classList.toggle('active');
  }

}
