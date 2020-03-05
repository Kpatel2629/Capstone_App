import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentBarcodePage } from './student-barcode.page';

describe('StudentBarcodePage', () => {
  let component: StudentBarcodePage;
  let fixture: ComponentFixture<StudentBarcodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentBarcodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentBarcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
