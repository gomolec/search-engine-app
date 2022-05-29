import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchEngineRoutingModule } from './search-engine-routing.module';
import { SearchEngineComponent } from './search-engine.component';


@NgModule({
  declarations: [
    SearchEngineComponent,
  ],
  imports: [
    CommonModule,
    SearchEngineRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class SearchEngineModule { }

