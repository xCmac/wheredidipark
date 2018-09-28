import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewcarPage } from './newcar';

@NgModule({
  declarations: [
    NewcarPage,
  ],
  imports: [
    IonicPageModule.forChild(NewcarPage),
  ],
})
export class NewcarPageModule {}
