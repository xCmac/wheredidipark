import { Injectable } from '@angular/core';
import Backendless from 'backendless';
import { Floor } from '../../models/floor';

@Injectable()
export class BackendProvider {
  private floorDataStore: Backendless.DataStore = Backendless.Persistence.of(Floor);

  constructor() {
    console.log('Hello BackendProvider Provider');
  }

  updateFloor(newFloor: number) {
    this.floorDataStore.findFirst().then(data => {

    })
    .catch(error => {
      console.log("Error updating: ", error);
    })
    let floor: Floor = new Floor(newFloor)
    this.floorDataStore.save(floor);
  }

}