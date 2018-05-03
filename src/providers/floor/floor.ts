import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators';
import { Floor } from '../../models/floor';


@Injectable()
export class FloorProvider {
  floorsCollection: AngularFirestoreCollection<number>;
  floor: Observable<Floor[]>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.floorsCollection = this.afs.collection<number>(`floors`);
    this.floor = this.afs.collection('floors', ref => {
      return ref.where('userId', "==", this.afAuth.auth.currentUser.uid);
    }).snapshotChanges().map(changes => {
      return changes.map(action => {
        if(action.type === "modified") {
          //modified
        }

        if(action.type === "removed") {
          //removed
        }

        return {
          id: action.payload.doc.id,
          userId: action.payload.doc.get('userId'),
          currentFloor: action.payload.doc.get('currentFloor'),
          lastUpdate: action.payload.doc.get('lastUpdate')
        }
      });
    });


    this.floor = this.floorsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Floor;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });
  }

  private async docExists() {
    return this.afs.doc(`floors/${this.afAuth.auth.currentUser.uid}`).valueChanges().pipe(first()).toPromise()
  }

  async updateFloor(level: number) {
    if (!level) return;

    const doc = await this.docExists()
    console.log(doc);

    if(doc) {
      console.log("Updating doc...");
      this.afs.doc<Floor>(`floors/${this.afAuth.auth.currentUser.uid}`).update({
        currentFloor: level,
        lastUpdate: Date.now()
      });
    } else {
      console.log("Creating new doc...");
      this.afs.doc<Floor>(`floors/${this.afAuth.auth.currentUser.uid}`).set({
        userId: this.afAuth.auth.currentUser.uid,
        currentFloor: level,
        lastUpdate: Date.now()
      });
    }
  }

}
