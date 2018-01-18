import { Component, OnInit, DoCheck, ViewChild, ViewEncapsulation } from '@angular/core';
import { BankInfoClient } from '@service/ktbpib-proxygen';
import { HandleApiCall } from '@service/handle-api-call';
import { KtbNotificationLevel } from '@component/ktb-notification/ktb-notification';
import { KtbNotification } from '@component/ktb-notification/ktb-notification';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Observable } from 'rxjs/Observable';
import { FeatureManager } from './feature-manager';



@Component({
  selector: 'feature-loader',
  templateUrl: './feature-loader.html',
  styleUrls: ['./<%= dasherize(name) %>.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [BankInfoClient]
})
export class FeatureLoader implements OnInit {
  @ViewChild('notification') notification: KtbNotification;
  steps: MenuItem[];
  isSuccess: boolean;

  constructor(
    private fm: FeatureManager,
    private bankInfoClient: BankInfoClient,
    private handleApiCall: HandleApiCall
  ) {
  }

  ngOnInit() {
    this.fm.init();
    this.steps = [{ label: 'Step1' }, { label: 'Step2' }, { label: 'Step3' }];
    this.fm.loadFeature().then(res => {
      this.initResources();
    });
  }

  initResources() {
  }
}
