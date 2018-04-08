import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController
} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  user = {
    email: '',
    password: null,
    username:null,
    mobile:null,
    nick:null,
    gender:null,
    dob:null,
    avatar:'default.png'
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private httpClient: HttpClient,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signUp(): void {
    let url = '/signUp';
    this.httpClient.post(url, {user: this.user})
      .subscribe(
        res => {
          let status = res['status'];
          if (status === 'exist') {
            this.alertCtrl.create({
              title: '还差一点儿',
              subTitle: '这个邮箱已经被用过了',
              buttons: [
                '确认'
              ]
            }).present();
          }
          if (status === 'ok') {
            this.toastCtrl.create({
              message: '注册成功',
              duration: 1000
            }).present();
            this.user['id']=res['id'];
            this.storage.set('user', this.user);
            this.navCtrl.push('UserPage');
          }
          if (status === 'err'){
            this.toastCtrl.create({
              message: '服务器错误',
              duration: 1500
            }).present();
          }
        },
        err => {
          console.error(err);
        }
      );
  }
}
