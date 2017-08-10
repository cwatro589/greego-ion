import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagesentPage } from './messagesent';

@NgModule({
  declarations: [
    MessagesentPage,
  ],
  imports: [
    IonicPageModule.forChild(MessagesentPage),
  ],
})
export class MessagesentPageModule {}
