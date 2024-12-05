import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaxComponent } from './update-tax.component';

describe('UpdateTaxComponent', () => {
  let component: UpdateTaxComponent;
  let fixture: ComponentFixture<UpdateTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTaxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
