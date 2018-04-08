import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homePage = 'HomePage';
  findPage = 'FindPage';
  catPage = 'CatPage';
  cartPage = 'CartPage';
  userPage = 'UserPage';

  constructor(private storage: Storage) {
    // SQLite
    // 从 storage 中提取信息 user
    // this.storage.clear(); // 清除 storage 的所有键值
    this.storage.get('user').then(value => {
      // user 存在，显示 UserPage
      // user 不存在 this.userPage = 'SignInPage';
      if(!value) {
        this.userPage = 'SignInPage';
      }
    });
  }
}
