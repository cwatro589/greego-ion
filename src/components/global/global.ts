import { Component } from '@angular/core';

/**
 * Generated class for the GlobalComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'global',
  templateUrl: 'global.html'
})
export class GlobalComponent {

  text: string;

  constructor() {
    console.log('Hello GlobalComponent Component');
    this.text = 'Hello World';
  }

}
