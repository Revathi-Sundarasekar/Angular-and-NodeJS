var mongoose = require('mongoose');
var con = require('../db/db');
var moment = require('moment');
const Schema = mongoose.Schema;

let Usersschema=new Schema({
    Name:String,
    Email:String,
    Password:String,
    Requests:Array,
    Accepted:Array
 }); 

 let chatschema=new Schema({
    Email:String,
    Message:String,
    from:String,
    to:String,
    Messagetype:{type:String,default:"text"},
    view:{type:String,default:"0"},
    Date:{type:String,default:()=>moment().format("YYYY-MM-DD HH:mm:ss A")}
 }); 
 
var users = con.model("chatusers", Usersschema);
//users.watch().on("change", (data) => console.log(new Date(), data));
var chat = con.model("chatmasters", chatschema);
module.exports ={users:users,chat:chat};