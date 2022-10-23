import { LibraryModule } from './library/library.module';
import { MaterialModule } from './library/material/material.module';
import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddStageComponent } from './add-stage/add-stage.component';
@NgModule({
  declarations: [AppComponent, LoginComponent, NavbarComponent, AddStageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HomeModule,
    MaterialModule,
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
