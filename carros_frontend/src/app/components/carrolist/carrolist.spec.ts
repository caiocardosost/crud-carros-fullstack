import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Carrolist } from './carrolist';

describe('Carrolist', () => {
  let component: Carrolist;
  let fixture: ComponentFixture<Carrolist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carrolist],
    }).compileComponents();

    fixture = TestBed.createComponent(Carrolist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
