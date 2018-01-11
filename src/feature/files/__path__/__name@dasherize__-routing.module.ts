import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: <%= classify(name) %>Component,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class <%= classify(name) %>RoutingModule {}
