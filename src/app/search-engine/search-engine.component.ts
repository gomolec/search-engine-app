import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/search-engine/services/data.service'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent implements OnInit {
  suggestions: string[] = [];
  searchControl = new FormControl();
  filteredSuggestions!: Observable<string[]>; 

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => this.suggestions = data);
    this.filteredSuggestions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (value !== '') {
      return this.suggestions.filter(option => option.toLowerCase().includes(filterValue));
    } else {
      return [];
    }
    
  };

  onClick() {
    const url = "https://www.google.pl/search?q="
    window.open(url + this.searchControl.value, "_blank");
  }

}