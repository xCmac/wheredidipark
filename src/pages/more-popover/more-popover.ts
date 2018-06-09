import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-more-popover',
  templateUrl: 'more-popover.html',
})
export class MorePopoverPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private afAuth: AngularFireAuth,
              private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePopoverPage');
  }

  logout() {
    this.afAuth.auth.signOut()
    .then(() => {
      this.app.getActiveNavs()[0].setRoot('LoginPage');
    })
    .catch(e => {
      console.log("Error Signing out: ", e)
    });
  }

}
