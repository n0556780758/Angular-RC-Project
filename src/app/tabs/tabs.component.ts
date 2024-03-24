import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  activeItem: Item | null = null;
  activeTab: any;
  data = {} as Item[]
  tabs: any[] = []
  errorMessage!: string;
  textInput = ""
  isGridView = false

  constructor(private dataService: ApiService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataService.getData().subscribe({
      next: (response) => {
        this.data = response.results.reduce((acc: Item[], item: any) => {
          const newItem: Item = {
            title: item.Title,
            year: item.Year,
            imdbID: item.imdbID,
            type: item.Type,
            poster: item.Poster
          };
          acc.push(newItem);
          return acc;
        }, []);
        this.updateTabs()
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
  updateTabs() {
    this.activeTab = null
    this.tabs = [
      { name: 'movie', count: this.getCountByType('movie') },
      { name: 'series', count: this.getCountByType('series') },
      { name: 'game', count: this.getCountByType('game') }
    ];
  }

  getCountByType(type: string): number {
    return this.data.filter(item => item.type === type).length;
  }

  switchTab(tab: any) {
    this.activeTab = tab;
  }
  viewItemDetails(item: Item) {
    this.activeItem = item;
  }
  changeRoute() {
    this.activeItem = null;
  }
  toggleViewMode() {
    this.isGridView = !this.isGridView;
  }
}
