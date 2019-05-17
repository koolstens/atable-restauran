import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import { Storage } from "@ionic/storage";
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { isCordovaAvailable } from '../common/is-cordova-available';
import { oneSignalAppId, sender_id } from '../services/config';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public storage: Storage,
    public oneSignal: OneSignal
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Commandes en attente', component: HomePage, icon: 'home'},
      {title: 'Commandes en acceptées', component: HomePage, icon: 'restaurant'},
      {title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();


      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);

      //Notification
      if (isCordovaAvailable()){
				this.oneSignal.startInit(oneSignalAppId, sender_id);
				this.oneSignal.
					inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
				this.oneSignal.handleNotificationReceived().
					subscribe(data => this.onPushReceived(data.payload));
				this.oneSignal.handleNotificationOpened().
					subscribe(data => this.onPushOpened(data.notification.payload));
				this.oneSignal.endInit();
			}
    });
  }

  private onPushReceived(payload: OSNotificationPayload) {
		alert('Push recevied:' + payload.body);
	}

	private onPushOpened(payload: OSNotificationPayload) {
		alert('Push opened: ' + payload.body);
	}

  

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.storage.remove("resto_info");
    this.storage.remove("IS_AUTHENTICATED");
    this.nav.setRoot(LoginPage);
  }

}
