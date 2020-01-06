import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import {UserService} from './../user-service';
import {FormBuilder,FormGroup,FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  selectedValue: string;
  selectedCountry;
  countryList;
  contactForm  = this.fb.group({
    name:[''],
    email:[''],
    minimal :[''],
    disable:[''],
    disabledResult:[''],
    phone:[''],
    date: [''],
    multiple:['']
  })

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  disCountry = new FormControl();
  filteredFruits: Observable<string[]>;
  countries:Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private userService:UserService,
              private fb:FormBuilder) { }

  ngOnInit() {
    console.log(this.userService.getCountryList(),"ffff");
    this.countryList = this.userService.getCountryList();
    console.log(this.selectedCountry);

    this.countries = this.disCountry.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.countryList.slice()));
  

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.fruitCtrl.setValue(null);
    }
  }
  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  } 
  selected(event: MatAutocompleteSelectedEvent,auto?): void {
    if(auto==1){
      this.contactForm.value.disabledResult= event.option.viewValue;
    }
    else{
      this.fruits.push(event.option.viewValue);
      this.fruitInput.nativeElement.value = '';
      this.fruitCtrl.setValue(null);
      console.log(this.fruits,"fruits")
    }
   
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
  onSubmit(form){
    console.log(this.contactForm.value);
  }

}
