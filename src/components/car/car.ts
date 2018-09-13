import { Component, Input } from '@angular/core';
import { Car } from '../../models/car';
import { FloorProvider } from '../../providers/floor/floor';

@Component({
  selector: 'car',
  templateUrl: 'car.html'
})
export class CarComponent {
  
  theCar: Car;
  carColor: string;

  @Input('car') set car(car: Car) {
    this.theCar = car;
    this.carColor = this.getCarColor();
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

  getCarColor() {
    if (!this.theCar.color) {
      return "#FFFFFF";
    } 

    switch(this.theCar.color) {
      case "red": {
        return "#F69876";
      }
    }
  }

}
