import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientsWalletComponent } from './edit-clients-wallet.component';

describe('EditClientsWalletComponent', () => {
  let component: EditClientsWalletComponent;
  let fixture: ComponentFixture<EditClientsWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClientsWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientsWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
