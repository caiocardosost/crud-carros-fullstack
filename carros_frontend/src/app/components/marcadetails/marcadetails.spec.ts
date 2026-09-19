import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Marcadetails } from './marcadetails';

describe('Marcadetails', () => {
  let component: Marcadetails;
  let fixture: ComponentFixture<Marcadetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Marcadetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Marcadetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
