import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { ContentTypeReq, ContentTypeReqContentType } from '../../service/ktbpib-proxygen';
import { <%= classify(name) %>FeatureManager } from './<%= dasherize(name) %>-feature-manager';

@IonicPage({
  name: '<%= classify(name) %>FeatureLoader',
  segment: '<%= classify(name) %>FeatureLoader'
})
@Component({
  templateUrl: '../../components/feature-loader/ktb-feature-loader.html'
})
export class <%= classify(name) %>FeatureLoader implements OnInit, OnDestroy {
  initialized: boolean = false;
  constructor(
    private navParams: NavParams,
    private fm: <%= classify(name) %>FeatureManager
  ) {}
  ngOnInit() {

  }
  ngOnDestroy(): void {
    console.log('fl ondestroy!');
    this.fm.stop();
  }
  ionViewDidEnter() {
    console.log('fl viewDidEnter!');
    if (this.initialized) {
      //已被載入過
      this.fm.start(this.navParams.data);
    } else {
      const additionalTypes = [
        new ContentTypeReq({
          ContentType: ContentTypeReqContentType.XXXX
        }),
      ];

      this.fm.loadFeature(additionalTypes).subscribe(res => {
        this.fm.init(); // 初始化fm
        this.initialized = true;
        this.fm.start(this.navParams.data);
      });
    }
  }
}
