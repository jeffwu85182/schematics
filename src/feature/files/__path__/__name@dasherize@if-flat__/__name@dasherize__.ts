import { Component, OnInit } from '@angular/core';

@Component({
  selector: '<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.html',
  styleUrls: ['./<%= dasherize(name) %>.scss']
})
export class <%= classify(name) %> implements OnInit {

  constructor() {}

  ngOnInit() {}
}
