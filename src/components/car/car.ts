import { Component, Input } from '@angular/core';
import { Car } from '../../models/car';
import { FloorProvider } from '../../providers/floor/floor';

@Component({
  selector: 'car',
  templateUrl: 'car.html'
})
export class CarComponent {
  
  theCar: Car;

  @Input('car') set car(car: Car) {
    this.theCar = car;
  }

  constructor(private floorProvider: FloorProvider) {
  }

  increase() {
    this.theCar.currentFloor++;
    this.floorProvider.updateCar(this.theCar);
  }

  decrease() {
    this.theCar.currentFloor--;
    this.floorProvider.updateCar(this.theCar);
  }

}
