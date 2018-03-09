import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../../components/base-page/base-page';
import { <%= clsNameWithTrimLast(name) %>FeatureManager  } from './<%= dshNameWithTrimLast(name) %>-feature-manager';


@IonicPage({
  name: '<%= classify(name) %>'
})
@Component({
  selector: '<%= dasherize(name) %>',
  templateUrl: '<%= dasherize(name) %>.html'
})
export class <%= classify(name) %> implements OnInit {
  @ViewChild(BasePage) basePage: BasePage;


  constructor(private fm: <%= clsNameWithTrimLast(name) %>FeatureManager) {

  }

  ngOnInit(): void {

    this.basePage.enableInfiniteScroll = false;
    this.basePage.enableRefresher = false;
    this.basePage.FeatureManager = this.fm; //必須要有設定featureManager

  }

}
