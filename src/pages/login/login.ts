import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User, UserInfo } from '@firebase/auth-types';

import { CarProvider } from '../../providers/car/car';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  isLogin: boolean = true;

  email: string;
  password: string;

  user: User;
  loginForm: FormGroup;
  registerForm: FormGroup;

  usersCollection: AngularFirestoreCollection<UserInfo>

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private toastCtrl: ToastController,
    private carProvider: CarProvider) {
    
    this.usersCollection = this.afs.collection('users/');
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.user = user;
        this.carProvider.setReferences();
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    if(this.user) {
      this.navCtrl.setRoot('HomePage');
    }
  }

  async login() {
    try {
      this.user = await this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password);
      if (this.user) {
        this.navCtrl.setRoot('HomePage');
        this.carProvider.setReferences();
      }
    } catch (e) {
      this.presentToast(e);
    }

  }

  async register() {
    try {
      this.user = await this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
      if (this.user) {
        console.log(this.user)
        this.usersCollection.add({ email: this.email, 
                                    uid: this.user.uid, 
                                    displayName: this.user.displayName,
                                    phoneNumber: this.user.phoneNumber, 
                                    photoURL: this.user.photoURL, 
                                    providerId: this.user.providerId
                                  });
        this.carProvider.setReferences();
        this.navCtrl.setRoot('HomePage');
      }
    } catch (e) {
      this.presentToast(e);
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

  isvalidForLogin(): boolean {
    return this.loginForm.valid;
    
  }

  isValidForRegistration(): boolean {
    return this.registerForm.valid;
  }

  toggleLoginOrRegister() {
    this.isLogin = !this.isLogin;
  }
}
