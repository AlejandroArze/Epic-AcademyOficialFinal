import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAcademyComponent } from './home-academy.component';

describe('HomeAcademyComponent', () => {
  let component: HomeAcademyComponent;
  let fixture: ComponentFixture<HomeAcademyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAcademyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
