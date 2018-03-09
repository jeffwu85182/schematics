import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { HandleApiCall } from '../../decorators/handle-api-call';
import { KtbDoAction } from '../../interfaces/ktb-do-action';
import { <%= classify(name) %>FeatureManager } from './<%= dasherize(name) %>-feature-manager';

@IonicPage({
  name: '<%= classify(name) %>FeatureLoader',
  segment: '<%= classify(name) %>FeatureLoader'
})
@Component({
  templateUrl: '../../components/feature-loader/ktb-feature-loader.html'
})
export class <%= classify(name) %>FeatureLoader implements OnInit, KtbDoAction {
  initialized: boolean = false;
  constructor(
    private navParams: NavParams,
    private fm: <%= classify(name) %>FeatureManager
  ) {}
  ngOnInit() {
    //初始化featureManager 使用async來等待資源載入
    this.fm.init();

    //載入共用資源
    this.doAction().then(res => {
      this.fm.start(this.navParams.data);
      this.initialized = true;
    });
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
    }
  }
  //===== interface implements =====
  //載入所有feature-scope共用資源
  @HandleApiCall(false)
  async doAction() {
    //load feature
    await this.fm.loadFeature();
  }
  //===== interface implements =====
}
