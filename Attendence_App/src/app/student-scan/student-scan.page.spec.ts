import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentScanPage } from './student-scan.page';

describe('StudentScanPage', () => {
  let component: StudentScanPage;
  let fixture: ComponentFixture<StudentScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentScanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
