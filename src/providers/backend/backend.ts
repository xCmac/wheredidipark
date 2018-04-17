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
    // console.log("Query: ", query.getWhereClause());
    this.floorDataStore.find(query).then(data => {
      if(data) {
        console.log("Got data: ", data);
      } else {
        console.log("No Data");;
        let floor: Floor = new Floor(newFloor)
        this.floorDataStore.save(floor);
      }
    })
    .catch(error => {
      console.log("Error updating: ", error);
    })
  }

}