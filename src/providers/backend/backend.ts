import { Injectable } from '@angular/core';
import Backendless from 'backendless';
import { Floor } from '../../models/floor';

@Injectable()
export class BackendProvider {
  public user: Backendless.User;
  private floorDataStore: Backendless.DataStore = Backendless.Persistence.of(Floor);

  constructor() {
    console.log('Hello BackendProvider Provider');
  }

  updateFloor(newFloor: number) {
    const query: Backendless.DataQueryBuilder = Backendless.DataQueryBuilder
                                                  .create()
                                                  .setWhereClause(`ownerId='${this.user.objectId}'`);
    this.floorDataStore.find(query).then(data => {
      let floors: Array<Floor> = data as Array<Floor>
      if (floors.length > 0) {
        console.log("Have data: ", floors);
        let floor: Floor = new Floor(newFloor, floors[0].created, floors[0].objectId, floors[0].ownerId);
        this.floorDataStore.save(floor);
      } else {
        console.log("No data, creating one");
        let floor: Floor = new Floor(newFloor);
        this.floorDataStore.save(floor);
      }
    })
    .catch(error => {
      console.log("Error updating: ", error);
    })
  }
}