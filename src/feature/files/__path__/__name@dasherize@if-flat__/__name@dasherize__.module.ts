import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponentsModule } from '@ktbComponent/common-components.module';
import { TwdComponentsModule } from '@ktbComponent/twd-components.module';
import { <%= classify(name) %> } from './<%= dasherize(name) %>';
import { FeatureLoader } from './feature-loader';
import { FeatureManager } from './feature-manager';

// Optional Module
import { SharedModule } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: <%= classify(name) %>,
    children: []
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonComponentsModule,
    SharedModule
  ],
  declarations: [FeatureLoader, <%= classify(name) %>],
  providers: [FeatureManager]
})
export class <%= classify(name) %>Module {}
