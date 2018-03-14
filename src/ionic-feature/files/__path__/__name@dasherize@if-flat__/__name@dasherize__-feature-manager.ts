import { Injectable, Injector } from '@angular/core';
import { App } from 'ionic-angular';

import { KTBPIBFeatures } from '../../constants/ktbpibfeatures';
import { KtbFeatureManager } from '../../service/ktb-feature-manager';

@Injectable()
export class <%= classify(name) %>FeatureManager extends KtbFeatureManager {
  get featureId(): string {
    return KTBPIBFeatures.<%= classify(name) %>;
  }
  //Feature步驟設定
  _pageSettings: any = [
  ];
  constructor(app: App, public injector: Injector) {
    super(app, injector);

  }

  init() {

  }
  reset() {

  }

}
