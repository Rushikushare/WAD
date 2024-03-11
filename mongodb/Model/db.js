const mongoose=require('mongoose')

const dbschema=new mongoose.Schema({
    name:{type:String},
    dept:{type:String}
})

module.exports=mongoose.model('db',dbschema)