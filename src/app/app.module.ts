import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

/**
 * 3 party libraries
 */
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SharedModule } from "./shared/shared.module";
import { NgsRevealModule } from 'ngx-scrollreveal';

import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url: environment.WSHOTS, options: {} };

/**
 * Components
 */
import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';
import { BookFormComponent } from './books/book-form/book-form.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { WebSiteComponent } from './web-site/web-site.component';
import { BootstrapLessonsComponent } from './bootstrap-lessons/bootstrap-lessons.component';
import { LoginComponent } from './pages/login/login.component';


/**
 * Prime ng 
 */
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PasswordModule } from 'primeng/password';
import { ToolbarModule } from 'primeng/toolbar';
import { BadgeModule } from 'primeng/badge';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';



@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    BookFormComponent,
    BooksListComponent,
    WebSiteComponent,
    BootstrapLessonsComponent,
    FooterComponent,
    ChatComponent,
    ListaUsuariosComponent,
    MensajesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AccordionModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    TableModule,
    SplitButtonModule,
    PasswordModule,
    ToolbarModule,
    BadgeModule,
    SharedModule,
    NgsRevealModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
