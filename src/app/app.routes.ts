import { Routes } from '@angular/router';
import { ItemDataComponent } from './item-data/item-data.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: '**', component: AppComponent },
    { path: 'item/:id', component: ItemDataComponent },
];
