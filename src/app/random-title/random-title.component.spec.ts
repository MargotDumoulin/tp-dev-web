import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomTitleComponent } from './random-title.component';

describe('RandomTitleComponent', () => {
  let component: RandomTitleComponent;
  let fixture: ComponentFixture<RandomTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
