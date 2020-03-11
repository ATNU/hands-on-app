import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageResultComponent } from './page-result.component';

describe('PageResultComponent', () => {
  let component: PageResultComponent;
  let fixture: ComponentFixture<PageResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
