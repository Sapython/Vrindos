import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessCodesPage } from './access-codes.page';

describe('AccessCodesPage', () => {
  let component: AccessCodesPage;
  let fixture: ComponentFixture<AccessCodesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccessCodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
