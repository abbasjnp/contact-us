import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from './../user-service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Validators } from '@angular/forms'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  selectedValue: string;
  selectedCountry;
  sel = "oooooo";
  selectedDisableCountry = new FormControl('red');
  countryList;
  re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"
  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [
      Validators.required,
      Validators.pattern(this.re)
    ]],
    minimal: [''],
    disable: [''],
    disabledResult: [''],
    phone: ['', [Validators.required, Validators.pattern(this.mobNumberPattern)]],
    date: [''],
    multiple: ['']
  })
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  multiConCtrl = new FormControl();
  disCountry = new FormControl();
  filteredMulContries: Observable<string[]>;
  countries: Observable<string[]>;
  mulCountryList: string[] = ['India'];

  @ViewChild('countryInput') countryInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private datePipe: DatePipe) { }

  get email() { return this.contactForm.get('email'); }
  get name() { return this.contactForm.get('name'); }
  get phone() { return this.contactForm.get('phone'); }

  ngOnInit() {
    console.log(this.userService.getCountryList(), "ffff");
    this.countryList = this.userService.getCountryList();

    const toSelect = this.countryList.find(c => c == 'Alabama')
    this.contactForm.get('disable').setValue(toSelect);

    this.countries = this.disCountry.valueChanges.pipe(
      startWith(null),
      map((coun: string | null) => coun ? this._filter(coun) : this.countryList.slice()));

    this.filteredMulContries = this.multiConCtrl.valueChanges.pipe(
      startWith(null),
      map((coun: string | null) => coun ? this._filter(coun) : this.countryList.slice()));
  }
  add(event: MatChipInputEvent): void {

    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        this.mulCountryList.push(value.trim());
      }
      if (input) {
        input.value = '';
      }
      this.multiConCtrl.setValue(null);
    }
    console.log(this.mulCountryList);
  }
  remove(fruit: string): void {
    const index = this.mulCountryList.indexOf(fruit);

    if (index >= 0) {
      this.mulCountryList.splice(index, 1);
    }
    console.log(this.mulCountryList);
  }
  selected(event: MatAutocompleteSelectedEvent, auto?): void {
    if (auto == 1) {
      this.contactForm.value.disabledResult = event.option.viewValue;
    }
    else {
      this.mulCountryList.push(event.option.viewValue);
      this.countryInput.nativeElement.value = '';
      this.multiConCtrl.setValue(null);
      console.log(this.mulCountryList);

    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countryList.filter(coun => coun.toLowerCase().indexOf(filterValue) === 0);
  }
  onSubmit(form) {
    this.contactForm.value.date = this.datePipe.transform(this.contactForm.value.date, "dd-MM-yyyy");
    this.contactForm.value.multiple = this.mulCountryList;
    // console.log(ddMMyyyy);
    console.log(this.contactForm.value);
    let formData = {

    }
  }

}
