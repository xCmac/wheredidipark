import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators';
import { Floor } from '../../models/floor';


@Injectable()
export class FloorProvider {
  floorsCollection: AngularFirestoreCollection<number>;
  public floor: Observable<Floor[]>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {

  }

  public setReferences() {
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
  }

  private async docExists() {
    return this.afs.doc(`floors/${this.afAuth.auth.currentUser.email}`).valueChanges().pipe(first()).toPromise()
  }

  async updateFloor(level: number) {
    if (!level) return;

    const doc = await this.docExists()
    console.log(doc);

    if(doc) {
      this.afs.doc<Floor>(`floors/${this.afAuth.auth.currentUser.email}`).update({
        currentFloor: level,
        lastUpdate: Date.now()
      });
    } else {
      this.afs.doc<Floor>(`floors/${this.afAuth.auth.currentUser.email}`).set({
        userId: this.afAuth.auth.currentUser.uid,
        currentFloor: level,
        lastUpdate: Date.now()
      });
    }
  }

}
