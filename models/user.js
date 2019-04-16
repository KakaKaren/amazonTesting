const mongoose =  require("mongoose");
const bcrypt = require("bcrypt-node.js");
const Schema = mongoose.Schema;


const UserSchema = new Schema
({
       email: {type:String,unique:true,lowercase:true},
       password: String,

       profile:
       {
           name: {type: String,default:""},
           picture:{type:String,default:""}
       },
       address:String,
       history:
       [{
           date:Date,
           paid:{type:Number,default:0},
        //   item:{type:Schema,Types,ObjectId,ref:""}
       }]
});





UserSchema.pre("save",function(next){
  const pepa = this;
  if(!pepa.isModified("password"))return next();
  bcrypt.genSalt(10,function(err,salt){
    if (err) return next(err);
    bcrypt.hash(pepa.password,salt,null,function(err,hash){
        if(err)return next(err);
        pepa.password = hash;
        next();
    });
  });  
});


UserSchema.pre("save",function(next)
{
    var pepa = this;
    pepa.name = "Karen";
})



UserSchema.methods.comparePassword = function(password)
{
    return bcrypt.compareSync(password,this.password);
};


module.exports = mongoose.model("pepa",UserSchema);