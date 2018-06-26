import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonComponentsModule } from '@ktbComponent/common-components.module';
import { PipesModule } from '@ktbPipe/pipes.module';
import { KtbFeatureResources } from '@ktbService/ktb-feature-resources';
import {
  FundBasicInfoClient,
  FundRedeemClient
} from '@ktbService/ktbpib-proxygen';
import { StepsModule } from 'primeng/components/steps/steps';
import { SharedModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
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
    SharedModule,
    PipesModule,
    TableModule,
    StepsModule
  ],
  declarations: [FeatureLoader, <%= classify(name) %>],
  providers: [
    FeatureManager,
    KtbFeatureResources,
    Mock<%= classify(name) %>Client // TODO: 換成正式的 API
  ]
})
export class <%= classify(name) %>Module {}
