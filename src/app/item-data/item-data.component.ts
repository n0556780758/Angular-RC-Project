import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Item } from '../item.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-data',
  templateUrl: './item-data.component.html',
  styleUrls: ['./item-data.component.css']
})
export class ItemDataComponent {
  @Input() item!: Item;
  @Input() isGridView!: boolean;
  @Output() titleChanged = new EventEmitter<Item>();
  @Output() viewDetails = new EventEmitter<Item>();
  editTitle = false;
  title: FormControl = new FormControl();
  @ViewChild('titleInput') titleInput!: ElementRef;

  ngAfterViewInit() {
    this.title.setValue(this.item.title)
  }
  handleImageError(event: any) {
    event.target.style.visibility = 'hidden';
  }

  changeTitle() {
    this.editTitle = true;
    setTimeout(() => {
      this.titleInput.nativeElement.focus();
    });
  }
  save() {
    this.editTitle = false;
    if (this.title.value != this.item.title) {
      this.item.title = this.title.value
      this.titleChanged.emit(this.item);
    }
  }
  viewItemDetails() {
    // Emit event to navigate to item details page
    this.viewDetails.emit(this.item);
  }
}
