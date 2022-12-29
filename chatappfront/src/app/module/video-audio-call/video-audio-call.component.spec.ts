import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAudioCallComponent } from './video-audio-call.component';

describe('VideoAudioCallComponent', () => {
  let component: VideoAudioCallComponent;
  let fixture: ComponentFixture<VideoAudioCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoAudioCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoAudioCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
