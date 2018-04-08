import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';

/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

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
              private storage: Storage) {
  //  this.user = navParams.get('user');
    this.storage.get('user').then(value=>{
           this.user=value;
        // console.log(this.user);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }

  saveUserInfo(): void {
    let url = "/saveUserInfo";
    this.httpClient.post(url, {user: this.user})
      .subscribe(
        res => {
          let status = res['status'];
          let alert = this.alertCtrl.create({
            title: '出了一点问题',
            subTitle: '',
            buttons: [
              '确认'
            ]
          });
          if (status === 'usernameAndNickExist') {
            alert.setSubTitle('用户名和昵称都被占用了')
            alert.present();
          } else if (status === 'usernameExist') {
            alert.setSubTitle('用户名被占用了')
            alert.present();
          } else if (status === 'nickExist') {
            alert.setSubTitle('昵称都被占用了')
            alert.present();
          } else if (status === 'err') {
            alert.setSubTitle('服务器错误');
          } else if (status === 'ok') {
            this.storage.set('user',this.user);       
            this.navCtrl.push('UserPage');
          }
        },
        err => {
          console.error(err);
        }
      );
  }

}
