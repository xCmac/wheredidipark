import { Component, Input } from '@angular/core';
import { Car } from '../../models/car';
import { FloorProvider } from '../../providers/floor/floor';
import { COLORS } from '../../theme/colors';

@Component({
  selector: 'car',
  templateUrl: 'car.html'
})
export class CarComponent {
  theCar: Car;
  carColor: string;
  isOpen: boolean;
  colors = COLORS;

  @Input('car') set car(car: Car) {
    this.theCar = car;
    this.carColor = this.getCarColor();
    this.isOpen = false;
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
      return this.colors.darkGrey;
    } 

    switch(this.theCar.color) {
      case "red": {
        return this.colors.red;
      }
      case "orange": {
        return this.colors.orange;
      }
      case "yellow": {
        return this.colors.yellow;
      }
      case "green": {
        return this.colors.green;
      }
      case "blue": {
        return this.colors.blue;
      }
    }
  }

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }

}
