import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { <%= classify(name) %>FeatureLoader } from './<%= dasherize(name) %>-feature-loader';

@NgModule({
  declarations: [<%= classify(name) %>FeatureLoader],
  imports: [
    IonicPageModule.forChild(<%= classify(name) %>FeatureLoader),
    PipesModule,
    ComponentsModule
  ],
  providers: []
})
export class <%= classify(name) %>FeatureLoaderModule {}
