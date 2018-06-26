import { Component, OnInit, DoCheck, ViewChild } from "@angular/core";
import { MenuItem } from "primeng/components/common/menuitem";
import {
  KtbNotificationLevel,
  KtbNotification
} from "@ktbComponent/ktb-notification/ktb-notification";
import {
  ContentTypeReq,
  ContentTypeReqContentType
} from "@ktbService/ktbpib-proxygen";
import { FeatureManager } from "./feature-manager";

@Component({
  selector: "feature-loader",
  templateUrl: "../feature-loader.html"
})
export class FeatureLoader implements OnInit {
  @ViewChild("notification") notification: KtbNotification;
  steps: MenuItem[];
  isSuccess: boolean;

  constructor(
    private fm: FeatureManager
  ) {}

  ngOnInit() {
    const additionalTypes = [
      new ContentTypeReq({
        // ContentType: ContentTypeReqContentType.XXXXX
      })
    ];
    this.fm.loadResources(additionalTypes).subscribe(res => {
      this.fm.showSteps = false;
      this.fm.init();
      this.isSuccess = true;

      // 若需要透過其他功能進入取得參數，可解除以下註解並補上對應的參數在 featureManager
      // this.fm.queryParam = this.contentService.featureParam;
      // if (this.fm.queryParam) {
      //   this.fm.goSibling('input');
      // }
    });
  }
}
