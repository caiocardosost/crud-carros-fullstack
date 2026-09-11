import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Carrodetails } from './carrodetails';

describe('Carrodetails', () => {
  let component: Carrodetails;
  let fixture: ComponentFixture<Carrodetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carrodetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Carrodetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
