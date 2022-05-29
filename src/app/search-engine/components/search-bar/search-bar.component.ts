import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() btnClick = new EventEmitter();
  options: string[] = [];
  myControl = new FormControl();
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(this.options.filter(option => option.toLowerCase().includes(filterValue)));
    if (value !== '') {
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    } else {
      return [];
    }
    
  };
  filteredOptions!: Observable<string[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => this.options = data);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  onClick() {
    const url = "https://www.google.pl/search?q="
    //this.btnClick.emit();
    window.open(url + this.myControl.value, "_blank");
  }

}
