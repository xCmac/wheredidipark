import { NgModule } from '@angular/core';
import { CarComponent } from './car/car';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common/';

@NgModule({
	declarations: [CarComponent],
	imports: [
		IonicModule,
		CommonModule
	],
	exports: [CarComponent]
})
export class ComponentsModule {}
