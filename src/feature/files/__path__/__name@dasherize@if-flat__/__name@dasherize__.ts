import { Component, OnInit } from '@angular/core';
import { FeatureManager } from './feature-manager';

@Component({
  selector: '<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.html'
})
export class <%= classify(name) %> implements OnInit {

  constructor(private fm: FeatureManager) {}

  ngOnInit() {}
}
