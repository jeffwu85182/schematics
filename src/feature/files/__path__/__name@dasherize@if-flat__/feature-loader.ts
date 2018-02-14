import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { HandleApiCall } from '@ktbService/handle-api-call';
import { KtbNotificationLevel, KtbNotification } from '@ktbComponent/ktb-notification/ktb-notification';
import { Observable } from 'rxjs/Observable';
import {
  ContentTypeReq,
  ContentTypeReqContentType
} from '@ktbService/ktbpib-proxygen';
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
    const additionalTypes = [
      new ContentTypeReq({
        // ContentType: ContentTypeReqContentType.XXXXX
      })
    ];
    this.fm.loadFeature(additionalTypes).subscribe(res => {
      this.isSuccess = true;
    });
  }
}
