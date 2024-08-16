const mongoose=require('mongoose');
const Product = mongoose.model('Product' ,{
name:{
    type: String
},
discription:{
    type:String

},
price:{
    type:String
},
image:{
    type:String,
    required: false
}



}



)
module.exports=Product;