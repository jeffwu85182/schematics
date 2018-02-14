import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/primeng';
import { KtbFeatureResources } from '@ktbService/ktb-feature-resources';
import { CommonComponentsModule } from '@ktbComponent/common-components.module';
import { FeatureLoader } from './feature-loader';
import { FeatureManager } from './feature-manager';
import { <%= classify(name) %> } from './<%= dasherize(name) %>';
import { Mock<%= classify(name) %>Client } from './mock.proxygen';

const routes: Routes = [
  {
    path: '',
    component: FeatureLoader,
    children: []
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonComponentsModule,
    SharedModule
  ],
  declarations: [FeatureLoader, <%= classify(name) %>],
  providers: [
    FeatureManager,
    KtbFeatureResources,
    Mock<%= classify(name) %>Client // TODO: 換成正式的 API
  ]
})
export class <%= classify(name) %>Module {}
