import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
 
 
  

  constructor(public wsService: WebsocketService) {

  }

  sendMessage(message: string) {
    const payload = {
      de: this.wsService.getUsuario()!.nombre,
      cuerpo: message
    }

    this.wsService.emit('mensaje', payload);
  }

  getMessages() {
    return this.wsService.listen('mensaje-nuevo');
  }

  getMessagesPrivate() {
    return this.wsService.listen('mensaje-privado');

  }

  getUsuariosActivos(): Observable<any> {
    // console.log('imlistning');
    return this.wsService.listen('usuarios-activos');

  }

  emitirUsuariosActivos() {
    this.wsService.emit( 'obtener-usuarios');
  }
}
