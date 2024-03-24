import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDataComponent } from './item-data.component';

describe('ItemDataComponent', () => {
  let component: ItemDataComponent;
  let fixture: ComponentFixture<ItemDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
