import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Car } from '../../models/car';

@Injectable()
export class FloorProvider {
  carsCollection: AngularFirestoreCollection<Car>;
  public cars: Observable<Car[]>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  public setReferences() {
    this.carsCollection = this.afs.collection<Car>(`cars`);
    this.cars = this.afs.collection('cars', ref => {
      return ref.where('ownerId', "==", this.afAuth.auth.currentUser.uid);
    }).snapshotChanges().map(changes => {
      return changes.map(action => {
        if(action.type === "modified") {
          //modified
        }

        if(action.type === "removed") {
          //removed
        }

        return {
          documentId: action.payload.doc.id,
          ownerId: action.payload.doc.get('ownerId'),
          currentFloor: action.payload.doc.get('currentFloor'),
          lastUpdate: action.payload.doc.get('lastUpdate'),
          name: action.payload.doc.get('name')
        }
      });
    });
  }

  async updateCar(car: Car) {
    if (!car) return;

    car.lastUpdate = Date.now();

    if(!car.documentId) {
      await this.carsCollection.add(car);
      console.log("adding");
    } else {
      console.log("updating");
      await this.afs.doc<Car>(`cars/${car.documentId}`).update({
        currentFloor: car.currentFloor
      });
    }
  }

}
