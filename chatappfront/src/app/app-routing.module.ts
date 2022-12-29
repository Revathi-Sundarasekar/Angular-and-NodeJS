import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './shared/services/authgaurd/auth.gaurd.service';
import { ChatComponent } from './module/chat/chat.component';
import { LoginComponent } from './module/login/login.component';
import { MainComponent } from './module/main/main.component';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { ChartComponent } from './module/chart/chart.component';
import { ChatdesignComponent } from './module/chatdesign/chatdesign.component';
import { VideoAudioCallComponent } from './module/video-audio-call/video-audio-call.component';
const routes: Routes = [
  {path:'apps',component:MainComponent,canActivate:[AuthGaurdService],
  children:[
    {path:'chat',component:ChatComponent,canActivate:[AuthGaurdService]},
    {path:'video-audio-call',component:VideoAudioCallComponent,canActivate:[AuthGaurdService]},
    {path:'chart',component:VideoAudioCallComponent,canActivate:[AuthGaurdService]},
    {path:'dashboard',component:DashboardComponent,canActivate:[AuthGaurdService]},
    {path:'',redirectTo:'dashboard',pathMatch:"full"}
    
  ]},
  
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:"full"},
  { path: '**', redirectTo: 'apps' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
