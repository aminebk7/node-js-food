const mongoose=require('mongoose'); /*hathya ttsama importation llbiblitheque*//*tzidou b cmd npm i mongoose bech t5dem server ttzed fi el packege.json*/


mongoose.connect('mongodb://127.0.0.1:27017/food')/*fonction connecte a une seul parametre el port mt3 el mongodb ou esm el base eli cht3mlha*/
.then(
()=>{
    console.log('connected');
}
)
.catch(
    (err)=>{
        console.log(err);
    }
);
module.exports= mongoose;/*n3eml export llfile bech najem naccdilha*/