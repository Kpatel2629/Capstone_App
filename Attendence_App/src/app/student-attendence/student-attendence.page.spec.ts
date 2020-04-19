import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentAttendencePage } from './student-attendence.page';

describe('StudentAttendencePage', () => {
  let component: StudentAttendencePage;
  let fixture: ComponentFixture<StudentAttendencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAttendencePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentAttendencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
