import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalMoviesComponent } from './local-movies.component';

describe('LocalMoviesComponent', () => {
  let component: LocalMoviesComponent;
  let fixture: ComponentFixture<LocalMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalMoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
