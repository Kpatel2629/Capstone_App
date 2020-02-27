import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassListPage } from './class-list.page';

describe('ClassListPage', () => {
  let component: ClassListPage;
  let fixture: ComponentFixture<ClassListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
