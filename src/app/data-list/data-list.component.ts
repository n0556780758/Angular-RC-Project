import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Item } from '../item.model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.css'
})
export class DataListComponent {
  @Input() activeTab: any;
  @Input() isGridView = false;
  @Input() data = {} as Item[];
  @Output() dataChanged = new EventEmitter<Item[]>();
  @Output() viewDetails = new EventEmitter<Item>();
  @Output() viewModeChanged = new EventEmitter<boolean>();

  dataFilter: Item[] = [];
  errorMessage!: string;
  textInput = ""
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.dataFilter = this.data;
      this.sortOrder = 'asc'
      this.sortData()
    }
    if (changes['activeTab'] && changes['activeTab'].currentValue) {
      this.dataFilter = this.data.filter(x => x.type == this.activeTab.name)
    }
  }
  search() {
    this.dataFilter = this.dataFilter.filter(x =>
      x.title.toLowerCase().includes(this.textInput.toLowerCase()) || x.year.toLowerCase().includes(this.textInput.toLowerCase()))
  }
  refresh() {
    this.textInput = ""
    this.dataChanged.emit()
  }
  clear() {
    this.textInput = ""
    if (this.activeTab)
      this.dataFilter = this.data.filter(x => x.type == this.activeTab.name)
    else
      this.dataFilter = this.data
  }

  sort() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortData();
  }

  sortData() {
    if (this.sortOrder === 'asc')
      this.dataFilter.sort((a, b) => a.title.localeCompare(b.title));
    else
      this.dataFilter.sort((a, b) => b.title.localeCompare(a.title));
  }
  changeTitle(item: Item) {
    const index = this.data.findIndex(i => i.imdbID === item.imdbID);
    if (index !== -1) {
      this.data[index].title = item.title;
      this.apiService.updateItem(item);
    }
  }
  navigateToItemDetails(item: Item) {
    console.log("Navigate to item details page");
    this.router.navigate(['/item', item.imdbID]);
    this.viewDetails.emit(item);
  }

}