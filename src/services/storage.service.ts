import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Cart } from "../models/cart";
import { LocalUser } from "../models/local_user";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        return usr!=null?JSON.parse(usr):null;
    }

    setLocalUser(obj : LocalUser) {
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else{
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
    
    getCart() : Cart {
        let usr = localStorage.getItem(STORAGE_KEYS.cart);
        return usr!=null?JSON.parse(usr):null;
    }

    setCart(obj : Cart) {
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
        else{
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        }
    } 

}