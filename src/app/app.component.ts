import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { Item } from './item.model';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-test-rc';
  data = {} as Item[]
  tabs: any[] = []
  movieCount: number = 0;
  seriesCount: number = 0;
  gameCount: number = 0;
  errorMessage!: string;
  textInput = ""
  constructor(private dataService: ApiService) { }

  ngOnInit() {
    // this.loadData();
  }

  loadData() {
    this.dataService.getData().subscribe({
      next: (response) => {
        // this.data.key = response.totalResults;
        this.data = response.results.reduce((acc: Item[], item: any) => {
          // const key = index;
          // const existingEntry = acc.find(entry => entry.key === key);
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
        // this.dataFilter = this.data
        console.log(this.data, 'I in app😀😀😎😋');
        this.updateTabs()
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
  updateTabs() {
    // Logic to update tabs based on data
    // For example, you can count items by type and create tabs
    this.tabs = [
      { name: 'Movies', count: this.getCountByType('movie') },
      { name: 'Series', count: this.getCountByType('series') },
      { name: 'Games', count: this.getCountByType('game') }
    ];
  }

  getCountByType(type: string): number {
    return this.data.filter(item => item.type === type).length;
  }

  onTabChanged(tab: any) {
    // Logic to update displayed items based on the selected tab
    // For example, filter items by type and display them
  }
}
