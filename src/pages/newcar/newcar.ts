import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from '../../models/car';
import { CarProvider } from '../../providers/car/car';

@IonicPage()
@Component({
  selector: 'page-newcar',
  templateUrl: 'newcar.html',
})
export class NewcarPage {
  carName: string;
  currentFloor: number;
  newCarForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public viewCtrl: ViewController, 
              public navParams: NavParams, 
              private afAuth: AngularFireAuth,
              private formBuilder: FormBuilder, 
              private carProvider: CarProvider) {
  }

  ngOnInit() {
    this.newCarForm = this.formBuilder.group({
      carName: ['', Validators.compose([Validators.required])],
      currentFloor: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"),])]
    });
  }

  addCar() {
    let newCar: Car = {
      currentFloor: this.currentFloor,
      name: this.carName,
      ownerId: this.afAuth.auth.currentUser.uid
    };

    this.carProvider.updateCar(newCar).then(() => {
      this.viewCtrl.dismiss();
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  isNewCarFormValid(): boolean {
    return this.newCarForm.valid;
  }

}
