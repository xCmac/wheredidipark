import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import Backendless from 'backendless';

@IonicPage()
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {
  loginOrRegister: string = "login";

  email: string = "t@t.com";
  password: string = "password";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticationPage');
  }

  login() {
    Backendless.UserService.login(this.email, this.password)
    .then(data => {
      console.log(data)
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
    Backendless.UserService.register(user)
    .then(data => {
      console.log("data");
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
