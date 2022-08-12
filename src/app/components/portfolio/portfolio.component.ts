import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  skillItems = document.getElementsByClassName('skills__item');
  openOrCloseModal = fromEvent(this.skillItems, 'click');

  close = document.getElementsByClassName("close");
  closeModal = fromEvent(this.close, 'click')



  @ViewChild("myModal")
  modal!: ElementRef;

  @ViewChild("caption")
  captionText!: ElementRef;
  
  @ViewChild("modalContent")
  modalContent!: ElementRef;

  constructor() {

  }

  ngOnInit(): void {
    this.openOrCloseModal.subscribe(x => {

      this.modal.nativeElement.style.display = 'block';

      this.modalContent.nativeElement.innerHTML = x.target
    });
    
    this.closeModal.subscribe(x => {
      this.modal.nativeElement.style.display = 'none';
    });

  }


}
