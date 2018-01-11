import { Injectable, Injector } from '@angular/core';
import * as proxy from '../../services/ktbpib-proxygen';
import {
    FeatureId,
    <%= classify(name) %>VM,
} from '.';
import { KtbFeatureManager } from '../../services/ktb-feature-manager';
import { Router } from '@angular/router';

@Injectable()
export class FeatureManager extends KtbFeatureManager {
    //提供BasePage存取featureId
    get featureId(): string { return FeatureId; }

    public vm: <%= classify(name) %>VM; // 整個Feature需要使用的viewModel

    //Feature-scope共用資源
    allBankInfo: any; //所有銀行代碼

    get bankDict(): any {
        let dict = [];
        this.allBankInfo.forEach(element => {
            dict.push({ id: element.BankID, name: element.BankName });
        });
        return dict;
    }
    constructor(
        injector: Injector,
        router: Router,
    ) {
        super(injector, router);
        this.vm = new <%= classify(name) %>VM(); //初始化ViewModel
    }
    //===== Base Class implements Start =====
    init() {
    }
    reset() {
    }
    //===== Base Class implements End =====

    commentToFull() {
    }

    /**
     * 轉全形字
     *
     * @param {any} chars
     * @returns
     * @memberof FeatureManager
     */
    toFull(chars) {
        return chars.replace(/[A-Za-z0-9]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) + 0xFEE0); });
    }

    getContract() {
    }

    getConfirmContract() {
    }

    getConfirmReq() {
    }

    getExecuteReq() {
    }
}
