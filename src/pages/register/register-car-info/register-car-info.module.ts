import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterCarInfoPage } from './register-car-info';

@NgModule({
  declarations: [
    RegisterCarInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterCarInfoPage),
  ],
})
export class RegisterCarInfoPageModule {}
