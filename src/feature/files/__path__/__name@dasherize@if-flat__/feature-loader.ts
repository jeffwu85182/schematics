import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { HandleApiCall } from '@ktbService/handle-api-call';
import { KtbNotificationLevel, KtbNotification } from '@ktbComponent/ktb-notification/ktb-notification';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Observable } from 'rxjs/Observable';
import { FeatureManager } from './feature-manager';



@Component({
  selector: 'feature-loader',
  templateUrl: './feature-loader.html'
})
export class FeatureLoader implements OnInit {
  @ViewChild('notification') notification: KtbNotification;
  steps: MenuItem[];
  isSuccess: boolean;
  featureName = this.fm.featureName;

  constructor(
    private fm: FeatureManager,
    private handleApiCall: HandleApiCall
  ) {
  }

  ngOnInit() {
    this.fm.init();
    this.steps = [{ label: 'Step1' }, { label: 'Step2' }, { label: 'Step3' }];
    this.fm.loadFeature().subscribe(res => {
      this.isSuccess = true;
    });
  }
}
