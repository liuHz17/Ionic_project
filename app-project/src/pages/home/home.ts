import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
/** 
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  products;
  page:number=1;
  hasMoreData:boolean=true;//解决数据库加载完还会输出页数问题

  constructor(public navCtrl: NavController, public navParams: NavParams ,private httpClient:HttpClient) {
    
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');发出http请求商品表的前20条数据
    let url='/products/1';
    this.httpClient.get(url)
    .subscribe(
      res=>{
        console.log(res);
        this.products=res;
      },
      err=>{
        console.log(err)
      }
    )
  }
//当前页面滚动到底部即触发
  loadMoreData(event): void {
    let url=`/products/${++this.page}`;
    console.log(this.page);//数据库加载完还会输出页数
    this.httpClient.get(url)
    .subscribe(
      res=>{
        let length=res['length'];
        if(length<20||length===0){
          this.hasMoreData=false;
        }else{
          this.products=this.products.concat(res);
        }
        // console.log(res);
        event.complete();//通知组件加载完成
      },
      err=>{      
        console.log(err);
      }
    )
  }
}
