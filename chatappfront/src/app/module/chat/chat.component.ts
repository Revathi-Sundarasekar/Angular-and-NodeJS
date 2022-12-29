import { Conditional } from '@angular/compiler';
import { Component, ElementRef, HostListener, OnInit, ViewChild, AfterContentChecked  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Emoji } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { io, Socket } from "socket.io-client";
import { ApiurlService } from 'src/app/shared/services/apiurl/apiurl.service';
import { LoginService } from 'src/app/shared/services/authenticate/login.service';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
declare var bootstrap: any;


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private socket: Socket;

  username: string = this.login.getUserDetails().data.Name
  avatar: string = this.login.getUserDetails().data.Name.charAt(0)
  Users: any[] = [];
  Messagedata: any[] = [];
  requsetlist: any[] = [];
  uploadedFiles: any[] = [];
  typing: boolean = false;
  usernametitle: any;
  checkonline: any;
  checkwidth : any
  toggled: boolean = false;
  Message : String;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('Message') messageform: NgForm;

  constructor(private apiurl: ApiurlService, public login: LoginService, private chat: ChatService) { }
  API_URL: any = this.apiurl.setapiurl();

  ngOnInit(): void {

    var socketInit = false;
    if (!socketInit) {
      this.socket = io(`${this.API_URL}`, {
        transports: ['websocket'],
      });
      socketInit = true;
      this.socket.on('connect', () => {
        console.log("connect");
        this.socket.emit("join-user", this.login.getUserDetails().data.Email);
        this.socket.on("users", async (data) => {
          var dd: any = await this.getrequest();
          this.requsetlist = dd.Requests;
          var obj = dd.Accepted.flat().map((p: any) => Object.assign(p, { status: "Online" }));
          this.getchatcount();
          this.Users = obj;
          const found = this.Users.map((f: any) => data.users.findIndex((e: any) => e.username == f.Email));
          for (var i = 0; i < found.length; i++) {
            if (found[i] == -1) {

              this.Users[i] = { ...this.Users[i], ...{ status: "Offline" } };
            }

          }
          this.Users.sort((a, b) => a.count > b.count ? -1 : 1);


        })
        this.socket.on('user disconnected', (data) => {

          var status = this.Users.findIndex(d => d.Email == data);
          this.Users[status] = { ...this.Users[status], ...{ status: "Offline" } }

        })


      });

      this.socket.on('connect_error', () => {
        console.log("connect_error")
      })
      this.socket.on('connect_failed', () => {
        console.log("connect_failed")
      })

      this.socket.on('reconnect', () => {
        console.log("reconnect")
        this.socket.emit("join-user", this.login.getUserDetails().data.Email)

      });
    }
    else {
      console.log("reconnect else")
      this.socket.connect();
    }
    this.privatemessage();

    this.checkwidth = document.body.clientWidth;
    this.scrollheight = this.checkwidth >992? "calc(100vh - 174px)" : "calc(100vh - 127px)";
  }


  scrollheight: any
  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    this.checkwidth = event.target.innerWidth;
    this.scrollheight = this.checkwidth >992? "calc(100vh - 174px)" : "calc(100vh - 127px)";
  }

  async messagesend(e: any, usernametitle: any) {
    var obj = { ...e.value, ...{ Email: usernametitle } }

    this.chat.chatsave(obj).then(data => {
      this.Messagedata.push(data);
      this.toggled = false;
      e.reset();

      var height : any = document.getElementsByClassName('p-virtualscroller-list')[0];
      var scroll = height.scrollHeight;
      height.scrollTo(0,scroll+781)

     /* var height : any = document.getElementsByClassName('p-virtualscroller-list')[0];
      var scroll = height.scrollHeight;
        if(height.scrollTop != scroll-781){
          height.scrollTo(0,scroll);
          this.refreshContent;
        }
        else{
          clearInterval(this.refreshContent)
        } */
    });

  }

  disconnectSocket() {
    this.socket.disconnect()
  }

  privatemessage() {

    this.socket.on("private message", (data) => {

      if (data.from == this.usernametitle) {
        this.Messagedata.push(data);

        (async () => {
          // create and show the notification
          const showNotification = () => {
            // create a new notification
            const notification = new Notification('JavaScript Notification API', {
              body: 'This is a JavaScript Notification API demo',
              icon: './img/js.png'
            });

            // close the notification after 10 seconds
            setTimeout(() => {
              notification.close();
            }, 10 * 1000);

            // navigate to a URL when clicked
            notification.addEventListener('click', () => {

              window.open('https://www.javascripttutorial.net/web-apis/javascript-notification/', '_blank');
            });
          }

          // show an error message
          const showError = () => {
            const error: any = document.querySelector('.error');
            error.style.display = 'block';
            error.textContent = 'You blocked the notifications';
          }

          // check notification permission
          let granted = false;

          if (Notification.permission === 'granted') {
            granted = true;
          } else if (Notification.permission !== 'denied') {
            let permission = await Notification.requestPermission();
            granted = permission === 'granted' ? true : false;
          }

          // show notification or error
          granted ? showNotification() : showError();
        })();
      }
      this.getchatcount();
    })

  }

  refreshContent : any

  async getmessage(e: any, mform: any) {
    if (mform != undefined) {
      mform.resetForm();
    }
    this.usernametitle = e.Email;
    this.checkonline = e.status;
    e.count = null
    this.chat.getchat(e.Email).then((data: any) => {
      this.Messagedata = [...data];
    });

    if (window.innerWidth < 768) {
      document.getElementById('profile-panel')?.classList.add('d-none')
    }

   /* this.refreshContent = setInterval(() => {
      var height : any = document.getElementsByClassName('p-virtualscroller-list');
      height[0] != undefined? this.scrollToBottom() : false;
    }, 100); */
  }


  scrollToBottom(){

    var height : any = document.getElementsByClassName('p-virtualscroller-list')[0];
    var diff = height.scrollHeight-height.scrollTop;

    console.log(height.scrollHeight, height.scrollTop,height.scrollHeight-height.scrollTop)

    var scroll = height.scrollHeight;

      if(height.scrollTop != scroll){
        height.scrollTo(0,scroll);
        this.refreshContent;
      }
      else{
        clearInterval(this.refreshContent)
      }



   /* var totalheight : any = document.getElementById('message');
    if(totalheight != null){
      var scroll = totalheight.scrollHeight;
      totalheight.scrollTo(0,scroll)
      clearInterval(this.refreshContent)
    }*/

  }

  ngOnDestroy() {
    this.socket.disconnect();

  }

  backtoprofile(){
    this.usernametitle = null
    document.getElementById('profile-panel')?.classList.remove("d-none")
  }

  async getchatcount() {
    this.chat.getchatcount().then((data: any) => {
      for (var i = 0; i < data.length; i++) {
        var findex = this.Users.findIndex(a => a.Email == data[i].From)
        this.Users[findex].count = data[i].n
      }
      this.Users.sort((a, b) => a.count > b.count ? -1 : 1);
    });
  }

  sendrequest(e: any, click: any) {
    click.click()
    if (e.value.Email.trim() == this.login.getUserDetails().data.Email) {
      alert("Self request not allowed")
    }
    else {
      this.chat.sendrequest(e.value).then((data: any) => {

        if (data['msg'] == "Already sent") {
          alert("Already request send! or Already in your chatlist")
        }
        else {
          e.reset();
          alert("Successfully request send")
        }
      });
    }
  }

  async getrequest() {
    return await this.chat.getrequest().then((data: any) => data);
  }
  //accept or reject request
  actionrequest(email: any, e: any) {
    this.chat.actionrequest(email, e).then((data: any) => {
    });
  }

  searchdata: any;
  filterdata: any;
  somethingChanged(e: any) {
    var expr = new RegExp(e, "gi");
    var data = this.Users.filter((elem: any) => expr.test(elem['Email']));
    this.filterdata = data;
  }

  onUpload(event: any, receiver: any, uploadedFiles: any) {

    console.log(event.files[0].objectURL.changingThisBreaksApplicationSecurity)
    const toDataURL = (url: RequestInfo | URL) => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      }))

    toDataURL(event.files[0].objectURL.changingThisBreaksApplicationSecurity).then(dataUrl => {
      var obj: any = { ...{}, ...{ Email: receiver, Message: dataUrl, Messagetype: "image" } };
      this.chat.chatsave(obj).then((data: any) => {
        this.Messagedata.push(data);

        let myModalEl = document.getElementById('fileupload');
        let modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
        uploadedFiles.files = [];
      });
    })

  }

  addEmoji(selected: Emoji, Message : any) {
    var emojidata =  Message.value+(selected.emoji as any).native;
    this.Message = emojidata;
  }

  @HostListener('wheel', ['$event']) onScroll(){

    if(document.getElementsByClassName('p-virtualscroller-list')[0] != undefined){

      var usernametitle = this.usernametitle;
      var count = this.Users.filter((res : any)=> res.Email == usernametitle)[0].count;
      var currentheight : any = document.getElementsByClassName('p-virtualscroller-list')[0]?.scrollTop
      var totalheight : any = document.getElementsByClassName('p-virtualscroller-list')[0]?.scrollHeight
      var difference = totalheight - currentheight;

      if(count != null && currentheight+difference == totalheight){
        this.chat.updatecount(usernametitle).then((data: any) => {
          console.log(data)
          if(data.message == "update successfully"){
            console.log(data.message)
            this.Users.filter((res : any)=> {res.Email == usernametitle ? res.count = null : false})
          }
        });
      }
    }
    else{
       false;
    }
  }


}
