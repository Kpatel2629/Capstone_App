import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarcodePagePage } from './barcode-page.page';

describe('BarcodePagePage', () => {
  let component: BarcodePagePage;
  let fixture: ComponentFixture<BarcodePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodePagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarcodePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
