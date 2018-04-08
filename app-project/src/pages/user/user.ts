import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage) {
  }

  ionViewDidLoad() { // ionic 视图加载完成
    this.init();
  }

  init(): void {
    this.storage.get('user').then(value => {
      if (value) {
        this.user = value;
      }
    });
  }

  signOut():void {
    this.storage.clear();
    this.navCtrl.push('SignInPage');
  }

  toUserInfoPage():void {
    this.navCtrl.push('UserInfoPage');
  }
}
