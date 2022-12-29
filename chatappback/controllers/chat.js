var model = require("../models/allmodels");
const savechat = async (req, res, next) => {

  var objdata={...req.body,...{Email:req.user.data.Email,from:req.user.data.Email,to:req.body.Email}}
  try {
    var user = new model["chat"](objdata);
    var result = await user.save();
    var io = req.app.get('chatsocketio');
    io.to(req.body.Email).emit("private message", result);
    res.send(result);
  } catch (err) {
    console.log("err" + err);
    res.status(500).send(err);
  }
};
const getchats=async (req, res, next) => {

    try{
     
      var users=await model['chat'].find({
        from: {
          $in: [req.user.data.Email, req.query.id],
        },
        to: {
          $in: [req.user.data.Email, req.query.id],
        },
      });
      var updatecount = await model['chat'].updateMany({from: req.query.id,to: req.user.data.Email},{"view":"1"});
      res.send(users);
    } catch (err) {
      res.send(500).send(err);
    }
  };

  const updateCount = async (req, res,next) =>{
    try{
      var updatecount = await model['chat'].updateMany({from: req.query.id,to: req.user.data.Email},{"view":"1"});
      if(updatecount['modifiedCount'] == 1){
        res.send({message : "update successfully"});
      }else{
        res.send({message : "error"});
      }
      
    } catch (err) {
      res.send(500).send(err);
    }
  }

  const getchatscount=async (req, res, next) => {

    try{
     
      var users=await model['chat'].aggregate([
        { $match: {to:req.user.data.Email,"view":"0"} },
        
        { $group: { 
            _id: {'from':'$from'}, 
            "From":{$first:'$from'},
            n: { $sum: 1 }
         } }
     ])

      res.send(users)
      } catch (err) {
          res.send(500).send(err);
      }
  };

  const sendrequest = async (req, res, next) => {
    try {
      var checkalready = await model['user'].findOne({
        Email: req.body.Email,
        'Accepted.Email': req.user.data.Email
      })
      if (checkalready) {
        send = {
          msg: "Already sent"
        }
      } else {
        var check = await model['user'].findOne({
          Email: req.body.Email,
          'Requests.Email': req.user.data.Email
        })
        var send;
        if (check == null) {
          send = await model['user'].updateOne({
            Email: req.body.Email
          }, {
            $push: {
              Requests: {
                Email: req.user.data.Email
              }
            }
          })
        } else {
          send = {
            msg: "Already sent"
          }
        }
      }
      res.send(send)
    } catch (err) {
      res.send(500).send(err);
    }
  };
  const getrequest = async (req, res, next) => {
    try {
      var send = await model['user'].findOne({
        Email: req.user.data.Email
      }, {
        Email: 1,
        Requests: 1,
        Accepted: 1
      }).lean();
      res.send(send)
    } catch (err) {
      res.send(500).send(err);
    }

  }

const actionrequest = async (req, res, next) => {
    console.log(req.body)
      try{
      if(req.body.action=='Accepted'){
        var send=await model['user'].findOne({Email:req.user.data.Email}).lean();
        
        var update=await model['user'].updateOne({Email: req.body.Email},{$push:{Accepted:{Email:req.user.data.Email}}});
        var update1=await model['user'].updateOne({Email: req.user.data.Email},{$push:{Accepted:{Email:req.body.Email}}});
        var deletev=await model['user'].updateOne({Email: req.body.Email},{$pull:{Requests:{Email:req.user.data.Email}}});
        var update1=await model['user'].updateOne({Email: req.user.data.Email},{$pull:{Requests:{Email:req.body.Email}}});

      }
      else{
        var deletev=await model['user'].updateOne({Email: req.body.Email},{$pull:{Requests:{Email:req.user.data.Email}}});
        var deletev1=await model['user'].updateOne({Email: req.user.data.Email},{$pull:{Requests:{Email:req.body.Email}}});
      }
      }
    catch (err) {
     res.send(500).send(err);
     }    
};

const getfullchat= async (req, res, next) => {
  
  try{
     
    var users=await model['chat'].aggregate([
      
      
      { $group: { 
          _id: { Messagetype:'$Messagetype'}, 
          Messagetype:{$first:'$Messagetype'},
    
          n: { $sum: 1 }
       } },
      
   ])

    res.send(users)
    } catch (err) {
        res.send(500).send(err);
    }
  }
const uploadfile = async (req, res, next) => {
console.log(req)
}

module.exports = { savechat,getchats,updateCount,getchatscount,sendrequest,getrequest,actionrequest,uploadfile,getfullchat};
