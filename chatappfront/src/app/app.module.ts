import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PickerModule } from '@ctrl/ngx-emoji-mart'

//primeng
import {FileUploadModule} from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

//components
import { ChatComponent } from './module/chat/chat.component';
import { LoginComponent } from './module/login/login.component';
import { OrderbyPipe } from './shared/pipes/orderby.pipe';
import { MainComponent } from './module/main/main.component';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { ChartComponent } from './module/chart/chart.component';
import { ChatdesignComponent } from './module/chatdesign/chatdesign.component';
import { VideoAudioCallComponent } from './module/video-audio-call/video-audio-call.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    OrderbyPipe,
    MainComponent,
    DashboardComponent,
    ChartComponent,
    ChatdesignComponent,
    VideoAudioCallComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    AvatarModule,
    AvatarGroupModule,
    PickerModule,
    VirtualScrollerModule
  ],
  providers: [ChatComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
