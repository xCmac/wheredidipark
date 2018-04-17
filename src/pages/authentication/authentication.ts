import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import Backendless from 'backendless';
import { BackendProvider } from '../../providers/backend/backend';

@IonicPage()
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {
  loginOrRegister: string = "login";

  email: string = "t@t.com";
  password: string = "password";
  username: string = "t";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private backendProvider: BackendProvider,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticationPage');
  }

  login() {
    Backendless.UserService.login(this.email, this.password)
    .then(user => {
      this.backendProvider.user = user
      console.log(user)
      this.navCtrl.setRoot('TabsPage');
    })
    .catch(error => {
      this.presentToast(error);
    });
  }

  register() {
    let user: Backendless.User = new Backendless.User;
    user.email = this.email;
    user.password = this.password;
    user.username = this.username;
    Backendless.UserService.register(user)
    .then(user => {
      this.backendProvider.user = user
      console.log(user);
    })
    .catch(error => {
      this.presentToast(error);
    });
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.present();
  }

  isValid(): boolean {
    return this.email.length > 0 && this.password.length > 0;
  }

}
