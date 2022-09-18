import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { WelcomeService } from './welcome.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socketStatus = false;
  usuario!: Usuario | null;

  constructor(
    private socket: Socket,
    private router: Router,
    private welcomeService: WelcomeService

    ) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
    })
    this.socket.on('disconnect', () => {
      console.log('desconectado al servidor');
      this.socketStatus = false;
    })
  }

  emit(event: string, payload?: any, callback?: Function) {
    // console.log('emitiendo');
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }

  loginWS(nombre: string) {

    return new Promise<void>((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, (resp: any) => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        this.welcomeService.listenLogin();
        resolve();
      });
    });


  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    this.welcomeService.listenLogout();

    const payload = {
      nombre: 'sin-nombre'
    };

    this.emit('configurar-usuario', payload, () => { });
    this.router.navigateByUrl('');

  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }
  cargarStorage() {

    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);
      this.loginWS(this.usuario!.nombre);
    }

  }
  getUsuario() {
    return this.usuario;
  }

}
