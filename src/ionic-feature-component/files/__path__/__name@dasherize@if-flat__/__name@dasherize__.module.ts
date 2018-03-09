import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { <%= classify(name) %> } from './<%= dasherize(name) %>';


@NgModule({
  declarations: [<%= classify(name) %>],
  imports: [
    IonicPageModule.forChild(<%= classify(name) %>),
    PipesModule,
    ComponentsModule
  ],
  providers: []
})
export class <%= classify(name) %>Module {}
