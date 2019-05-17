import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { UserProvider } from '../../services/user';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  restaurant: any;
  email: string;
  password: string;

  constructor(public nav: NavController,
     public forgotCtrl: AlertController, 
     private UserProvider: UserProvider,
     public menu: MenuController, 
     public toastCtrl: ToastController,
     public storage: Storage) {
    this.menu.swipeEnable(false);
    this.storage.get("IS_AUTHENTICATED").then(val =>{
      if(val == 1){
        this.nav.setRoot(HomePage);
      }
    })
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    if(this.email !='' && this.password !=''){
    this.UserProvider.login(this.email, this.password).subscribe((res: any) => {
      //this.weather = weather.current_observation;
      if(res.success == 1){
        this.storage.set("resto_info", res.resto_info);
        this.storage.set("IS_AUTHENTICATED", 1);
        this.nav.setRoot(HomePage);
      }else{
        let toast = this.toastCtrl.create({
          showCloseButton: true,
          message: 'Login Failed. Please verify!',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      
      console.log(res);
    });
  }else{
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      message: 'Please provide email and password!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  }
  

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
