import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  nombre: string = '';

  constructor(private wsService: WebsocketService,
    private router: Router
  ) { }

  ingresar() {
    if (this.nombre.trim() !== '') {
      this.wsService.loginWS(this.nombre)
        .then(() => {
          this.router.navigateByUrl('/mensaje');
        });
    }
  }

}
