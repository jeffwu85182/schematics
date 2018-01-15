import { FeatureLoader } from './feature-loader';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';
import { Router } from '@angular/router';
import { CommonComponentsModule } from '../../components/common-components.module';
import { TwdComponentsModule } from '../../components/twd-components.module';
import { <%= classify(name) %>RoutingModule } from './<%= dasherize(name) %>-routing.module';
import { FeatureManager } from './feature-manager';

// Optional Module
import { SharedModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    <%= classify(name) %>RoutingModule,
    // fxComponentModule 若是外幣相關
    TwdComponentsModule, // 台幣相關，若是屬於台外幣 Feature 相關則兩個都會用到
    CommonComponentsModule,
    SharedModule
  ],
  declarations: [FeatureLoader, <%= classify(name) %>Component],
  providers: [FeatureManager]
})
export class <%= classify(name) %>Module {}
