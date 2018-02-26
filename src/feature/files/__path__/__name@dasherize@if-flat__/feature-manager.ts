import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { KtbFeatureManager } from '@ktbService/ktb-feature-manager';

@Injectable()
export class FeatureManager extends KtbFeatureManager {
    // 提供BasePage存取featureId
    featureId = "KTBPIB.<%= classify(name) %>";
    // Feature-scope共用資源
    allBankInfo: any; // 所有銀行代碼

    constructor(
        injector: Injector,
        router: Router,
    ) {
        super(injector, router);
    }
    //===== Base Class implements Start =====
    init() {
    }
    reset() {
    }
    //===== Base Class implements End =====
}
