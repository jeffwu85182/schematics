import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';

import { AjaxResponse } from '../../service/ktbpib-proxygen';
@Injectable()
export class Mock<%= classify(name) %>Client {
   /**
   * 進行假資料查詢
   * 模擬 API 呼叫進行查詢
   * @param {*} [req] 可帶參數
   * @returns {Observable<any>} 請將假資料放在註解的地方
   * @memberof Mock<%= classify(name) %>Client
   */
  query(req?: any): Observable<AjaxResponse> {
    return timer(1000).map(_ => (new AjaxResponse({

      // 以下為查詢結果假資料
      Success: true,
      Result: []
      // 以上為查詢結果假資料

    })));
  }

  /**
   * 進行假資料執行
   * 模擬 API 呼叫進行執行
   * @param {*} [req] 可帶參數
   * @returns {Observable<any>} 請將假資料放在註解的地方
   * @memberof Mock<%= classify(name) %>Client
   */
  execute(req?: any): Observable<any> {
    return timer(1000).map(_ => ({
      // 以下為執行結果假資料
      helloWorld: 'hello'
      // 以上為執行結果假資料
    }));
  }
}
