import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductComponent } from './list.component';

describe('ListProductComponent', () => {
  let component: ListProductComponent;
  let fixture: ComponentFixture<ListProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
