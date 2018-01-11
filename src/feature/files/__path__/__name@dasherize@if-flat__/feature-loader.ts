import {
  Component,
  OnInit,
  DoCheck,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import * as feature from '.';
import * as proxy from '../../services/ktbpib-proxygen';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'feature-loader',
  templateUrl: './feature-loader.html',
  styleUrls: ['./<%= dasherize(name) %>.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [proxy.BankInfoClient]
})
export class FeatureLoader implements OnInit {
  @ViewChild('notification') notification: feature.KtbNotification;
  steps: MenuItem[];
  isSuccess: boolean;

  constructor(
    private fm: feature.FeatureManager,
    private bankInfoClient: proxy.BankInfoClient,
    private handleApiCall: feature.HandleApiCall
  ) {
  }

  async ngOnInit() {
    this.fm.init();
    this.steps = [{ label: 'Step1' }, { label: 'Step2' }, { label: 'Step3' }];
    await this.fm.loadFeature();
    this.initResources();
  }

  initResources() {
    return this.bankInfoClient.getAllBankInfo(false).forEach(rsp => {
      this.handleApiCall.handleResponse(
        rsp,
        res => {
          this.fm.allBankInfo = res.Result;
          this.isSuccess = true;
        },
        (c, m) => {
          this.notification.showNotification(
            m,
            feature.KtbNotificationLevel.danger
          );
          this.isSuccess = false;
        }
      );
    });
  }
}
