import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../library/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { StagePOCComponent } from './stage-poc/stage-poc.component';
import { CarColorComponent } from './car-color/car-color.component';


@NgModule({
  declarations: [
    HomeComponent,
    ResultComponent,
    StagePOCComponent,
    CarColorComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class HomeModule { }
