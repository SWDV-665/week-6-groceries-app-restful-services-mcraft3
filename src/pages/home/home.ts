import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// Go up one extra level (add extra ../) to get app folder and back down to providers folder
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Class variable for angular template of title of home.html page
  title = "Grocery";

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public dataService: GroceriesServiceProvider,
    public inputDialogService: InputDialogServiceProvider,
    public socialSharing: SocialSharing
    ) {

  }

  // Get and initialize items in dataService.
  loadItems() {
    return this.dataService.getItems();
  }

  // remove item with object and it's index as parameters.
  removeItem(item, index) {
    console.log("Removing item - ", item, "index: ", index);
    // Display ionic toast component message alert to confirm item being removed.
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + 'index: ' + index + " ...",
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
    // Remove one object at given index.
    this.dataService.removeItem(index);
  }

  // share item with object and it's index as parameters.
  shareItem(item, index) {
    console.log("Sharing item - ", item, "index: ", index);
    // Display ionic toast component message alert to confirm item being shared.
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + 'index: ' + index + " ...",
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
    // Share one object at given index.
    // this.dataService.removeItem(index);

    // Check if sharing via email is supported
    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries App";
    this.socialSharing.share(message, subject).then(() => {
      // Sharing possible
      console.log('Shared Successfully!');
    }).catch((error) => {
      // Sharing is not possible
      console.error('Error while sharing ', error);
    });
  }

  // Edit item with object and it's index as parameters.
  editItem(item, index) {
    console.log("Edit item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }

  // Add items using alertController.
  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }

}
