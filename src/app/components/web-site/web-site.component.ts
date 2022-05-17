import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-site',
  templateUrl: './web-site.component.html',
  styleUrls: ['./web-site.component.css']
})
export class WebSiteComponent implements OnInit {

  options = {};

  constructor() {
    this.options = { duration: 2000, origin: 'bottom' }
  }

  ngOnInit(): void {
  }

}
