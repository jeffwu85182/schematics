import { FeatureLoader } from './feature-loader';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { <%= classify(name) %> } from './<%= dasherize(name) %>';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponentsModule } from '../../components/common-components.module';
import { TwdComponentsModule } from '../../components/twd-components.module';
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
    // fxComponentModule 若是外幣相關
    TwdComponentsModule, // 台幣相關，若是屬於台外幣 Feature 相關則兩個都會用到
    CommonComponentsModule,
    SharedModule
  ],
  declarations: [FeatureLoader, <%= classify(name) %>],
  providers: [FeatureManager]
})
export class <%= classify(name) %>Module {}
