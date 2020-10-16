import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ProductService } from '../../services/domain/product.service';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartservice: CartService,
    public productService: ProductService) {
  }

  ionViewDidLoad() {
    let cart = this.cartservice.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls(){
    for(let i = 0; i<this.items.length; i++){
      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.product.id)
        .subscribe(response => {
          item.product.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.product.id}.jpg`;
        },
        error => {});
    }
  }

}
