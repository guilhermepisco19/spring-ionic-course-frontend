import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { CartItem } from '../../models/cart-item';
import { ClientDTO } from '../../models/client.dto';
import { RequestDTO } from '../../models/request.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClientService } from '../../services/domain/client.service';
import { RequestService } from '../../services/domain/request.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  request: RequestDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;
  codrequest: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clientService: ClientService,
    public requestService: RequestService) {

    this.request = this.navParams.get('request');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clientService.findById(this.request.client.id)
      .subscribe(response => {
        this.client = response as ClientDTO;
        this.address = this.findAddress(this.request.deliveryAddress.id, response['addresses']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  private findAddress(id : string, list: AddressDTO[]) : AddressDTO{
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('CategoriesPage');
  }

  checkout() {
    this.requestService.insert(this.request)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        this.codrequest = this.extractId(response.headers.get('location'));
      },
      error => {
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      })
  }

  private extractId(location: string) : string {
    let position = location.lastIndexOf("/");
    return location.substring(position + 1, location.length);
  }
}
