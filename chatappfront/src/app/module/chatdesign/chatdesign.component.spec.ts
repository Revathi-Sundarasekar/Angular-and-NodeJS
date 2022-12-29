import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatdesignComponent } from './chatdesign.component';

describe('ChatdesignComponent', () => {
  let component: ChatdesignComponent;
  let fixture: ComponentFixture<ChatdesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatdesignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
