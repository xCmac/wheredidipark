import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@firebase/auth-types';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginOrRegister: string = 'login';
  name: string;
  email: string;
  password: string;

  user: User;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticationPage');
  }

  async login() {
    this.user = await this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password);
    if(this.user) {
      this.navCtrl.setRoot('TabsPage');
    }
  }

  async register() {
    this.user = await this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
    if(this.user) {
      this.navCtrl.setRoot('TabsPage');
    }
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
    return true;
  }

}
