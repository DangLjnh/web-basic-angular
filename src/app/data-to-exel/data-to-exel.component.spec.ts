import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataToExelComponent } from './data-to-exel.component';

describe('DataToExelComponent', () => {
  let component: DataToExelComponent;
  let fixture: ComponentFixture<DataToExelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataToExelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataToExelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
