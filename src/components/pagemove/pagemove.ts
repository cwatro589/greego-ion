import { Component } from '@angular/core';

/**
 * Generated class for the PagemoveComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'pagemove',
  templateUrl: 'pagemove.html'
})
export class PagemoveComponent {

  text: string;

  constructor() {
    console.log('Hello PagemoveComponent Component');
    this.text = 'Hello World';
  }

}
