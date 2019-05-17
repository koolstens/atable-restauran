import {Component} from "@angular/core";
import {NavController, PopoverController, ToastController} from "ionic-angular";
import {Storage} from '@ionic/storage';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import { OrderDetailsPage } from "../order-details/order-details";
import {SearchLocationPage} from "../search-location/search-location";
import { OrderProvider } from '../../services/order';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // search condition
  orders: any;
  order: any;
  descending: boolean = false;
  order1: number;
  column: string = 'user_name';

  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }

  constructor(private storage: Storage, public toastCtrl: ToastController, public orderProvider: OrderProvider, public nav: NavController, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    this.populateList();
  }

  populateList(){
    this.storage.get("resto_info").then(val =>{
      let restId = val.restaurant_id;
      this.orderProvider.pendingOrders(restId).subscribe((res: any) => {
        console.log(res);
        if(res.success == 1){
          this.orders = res.orders;
        }else{
          let toast = this.toastCtrl.create({
            showCloseButton: true,
           message: 'No pending orders found!',
            duration: 3000,
          });
          toast.present();
        }
      });
    })
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.populateList();
      event.complete();
    }, 2000);
  }

  sort(){
    this.descending = !this.descending;
    this.order1 = this.descending ? 1 : -1;
  }

  viewOrderDetails(order){
    if(order.order_rec_id !=0){
      this.orderProvider.orderDetails(order.order_rec_id).subscribe((res: any) => {
        console.log('Order Details: ', res.orders);
        if(res.success == 1){
          this.orders = res.orders;
          this.order = order;
          this.nav.push(OrderDetailsPage, {orders: this.orders, order: this.order});
        }else{
          let toast = this.toastCtrl.create({
            showCloseButton: true,
           message: 'No details found for this id!',
            duration: 3000,
          });
          toast.present();
        }
      });
    }
  }

  // go to result page
  doSearch() {
    this.nav.push(TripsPage);
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}

//
