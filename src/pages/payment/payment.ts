import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestDTO } from '../../models/request.dto';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  request : RequestDTO;

  parcels : number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.request = this.navParams.get('request');

      console.log(this.request);

      this.formGroup = this.formBuilder.group({
        parcelsNumber: [1, Validators.required],
        "@type": ["paymentWithCard", Validators.required]
      })
  }

  nextPage() {
    this.request.payment = this.formGroup.value;
    console.log(this.request);
  }
}
