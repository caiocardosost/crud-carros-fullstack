import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Marcalist } from './marcalist';

describe('Marcalist', () => {
  let component: Marcalist;
  let fixture: ComponentFixture<Marcalist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Marcalist],
    }).compileComponents();

    fixture = TestBed.createComponent(Marcalist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
