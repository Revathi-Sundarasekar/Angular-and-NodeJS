import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiurlService } from 'src/app/shared/services/apiurl/apiurl.service';
import { LoginService } from 'src/app/shared/services/authenticate/login.service';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public chart: any;

  constructor(private apiurl:ApiurlService,public login:LoginService,private chat:ChatService) { }
  API_URL:any=this.apiurl.setapiurl();
  ngOnInit(): void {
    this.createChart();
  }
 async actionrequest(){
    return await this.chat.getfullchat().then((data:any)=>data);
  }
  

    async createChart(){
      var data:any=await this.actionrequest();

  var text=data.filter((user:any) => user.Messagetype=="text")
  var image=data.filter((user:any) => user.Messagetype=="image")
  var imnull=data.filter((user:any) => user.Messagetype==null)

  
      this.chart = new Chart("MyChart", {
        type: 'line', //this denotes tha type of chart
  
        data: {// values on X-Axis
          labels:data.map((user:any) => user.Messagetype), 
           datasets: [
            {
              label: "Text",
              data: text.map((user:any) => user.n),
              backgroundColor: 'blue'
            },
            {
              label: "Image",
              data: image.map((user:any) => user.n),
              backgroundColor: 'limegreen'
            }  ,
            {
              label: "null",
              data: imnull.map((user:any) => user.n),
              backgroundColor: 'red'
            }  
          ]
        },
        options: {
          aspectRatio:3.5
        }
        
      });
    }
  
}
