import { Component, OnInit } from '@angular/core';

@Component({
  selector: '<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.html'
})
export class <%= classify(name) %> implements OnInit {

  constructor() {}

  ngOnInit() {}
}
