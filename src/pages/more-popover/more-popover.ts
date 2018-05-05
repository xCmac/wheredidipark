import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-more-popover',
  templateUrl: 'more-popover.html',
})
export class MorePopoverPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePopoverPage');
  }

  logout() {
    this.afAuth.auth.signOut()
    .then(() => {
      this.navCtrl.setRoot('LoginPage');
    })
    .catch(e => {
      console.log("Error Signing out: ", e)
    });
  }

}
