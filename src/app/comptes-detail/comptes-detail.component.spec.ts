import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptesDetailComponent } from './comptes-detail.component';

describe('ComptesDetailComponent', () => {
  let component: ComptesDetailComponent;
  let fixture: ComponentFixture<ComptesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComptesDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComptesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
