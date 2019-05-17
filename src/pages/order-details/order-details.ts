import { Component } from '@angular/core';
import { IonicPage, ToastController, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../services/order';

/**
 * Generated class for the OrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {

  public orders: any;
  public orderRec: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public orderProvider: OrderProvider,
    public toastCtrl: ToastController) {
    this.orders = this.navParams.data.orders;
    this.orderRec = this.navParams.data.order;
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad OrderDetailsPage');
    //this.orderRec = this.navParams.data.order;
  }

  accept(order){
    alert(order.order_rec_id);
    this.orderProvider.updateOrder(order.order_rec_id, 1).subscribe((res: any) => {
      if(res.success == 1){
        let toast = this.toastCtrl.create({
          showCloseButton: true,
          message: 'Order successfully updated',
          duration: 3000,
          position: 'Bottom'
        });
        toast.present();
      }else{
        let toast = this.toastCtrl.create({
          showCloseButton: true,
          message: 'Failed to update the order',
          duration: 3000,
          position: 'Bottom'
        });
        toast.present();
      }
      console.log(res);
    });
  } 
  
  reject(order){
    alert(order.order_rec_id);
    this.orderProvider.updateOrder(order.order_rec_id, 2).subscribe((res: any) => {
      if(res.success == 1){
        let toast = this.toastCtrl.create({
          showCloseButton: true,
          message: 'Order successfully rejected',
          duration: 3000,
          position: 'Bottom'
        });
        toast.present();
      }else{
        let toast = this.toastCtrl.create({
          showCloseButton: true,
          message: 'Failed to reject the order',
          duration: 3000,
          position: 'Bottom'
        });
        toast.present();
      }
      console.log(res);
    });
  } 

}
