import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookFormComponent } from './books/book-form/book-form.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { UsuarioGuard } from './guards/usuario.guard';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'book',
    component: BooksListComponent,
  },
  {
    path: 'book/:id',
    component: BookFormComponent,
  },
  {
    path: 'mensaje',
    component: MensajesComponent,
    canActivate:[UsuarioGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
