import {Injectable} from '@angular/core';
import {country_list} from  '../../assets/data/country-list'

@Injectable({
    providedIn:'root'
})

export class UserService{
    //  constructor(){
    //      console.log(country_list,"list");
    //  }
    public getCountryList(){
        return country_list;
    }
}