const express=require('express');
const router=express.Router();
const product=require('../module/product');
const multer=require('multer');/*tsobha b cmd 9ble mttktbha t3mel npm i multer*/
let filename = '';
const mystorage = multer.diskStorage(
    {
        destination: './upload',/*win t7eb tsajel tsawer*/
        filename:( req , file , cb )=>{
            let date = Date.now();/*nsami taswira besm el date eli sar fih luplode*/
            //53453535345.jpg
            // image/png
            // [ 'image', 'png' ]
            let fl = date + '.' + file.mimetype.split('/')[1];
            cb(null, fl);
            filename = fl;
        } 
    }
);

const upload = multer({ storage: mystorage })

// ajout avec upload

router.post('/addproduct',upload.any('image'),(req,res)=>{/*on 4 request on utliser post bech nb3th de donner kima nji n3mel lajout ou aye request a deux parametre  */
   let  data=req.body;
     let prod= new product(data);
    prod.image=filename;
    prod.save().then(
       
        (saved)=>{
             filename='';
            res.status(200).send('saved');/*status 200 m3neha el code mt sucses*/
        }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);/*400 bade requeste*/
            }
        );
});
router.post('/ajouterproduct',upload.any('image'),(req,res)=>{/*on 4 request on utliser post bech nb3th de donner kima nji n3mel lajout ou aye request a deux parametre  */
    let  data=req.body;
      let prod= new product(data);
     
     prod.save().then(
        
         (saved)=>{
           
             res.status(200).send('saved');/*status 200 m3neha el code mt sucses*/
         }
         )
         .catch(
             (err)=>{
                 res.status(400).send(err);/*400 bade requeste*/
             }
         );
 });
 

router.get('/getallprod',(req,res)=>{/*on utliser get pour lire se qui est dans la base njib biha les donner */
    product.find().then(
      (products)=>{
          res.status(200).send(products);
      }
    ).catch(
      (err)=>{
          res.status(400).send(err)
      }
    )
  
    
  });

  router.get('/getprodbyid/:id',(req,res)=>{
   let myid= req.params.id ;

    product.findOne({ _id: myid })
    .then(
     (product)=>{
        res.status(200).send(product);
     }
    )
    .catch(
        (err)=>{
            res.status(400).send(err)
        }
    )
})

router.put('/updateprod/:id',(req,res)=>{ /*nst3mel el put ki chn3mal update*/
   let id = req.params.id;/*hethye ta9ra biha lid*/
   
   let newdata =req.body;/*hetshya fi les elemnt de upadate*/
    product.findOneAndUpdate({_id: id}, newdata)
     .then(
         (updated)=>{
             res.status(200).send(updated)
         }
     )
     .catch(
         (err)=>{
             res.status(400).send(err)
         }
     )
 
 
 
 });/*update withe file*/
 router.put('/updateprode/:id',upload.any('image'),(req,res)=>{ /*nst3mel el put ki chn3mal update*/
    let id = req.params.id;/*hethye ta9ra biha lid*/
      let newdata =req.body;/*hetshya fi les elemnt de upadate*/
      if (req.file) {
        newdata.image = filename; // Assurez-vous que votre modèle de produit a un champ pour le chemin du fichier
      }
      product.findOneAndUpdate({_id: id}, newdata, { new: true })
      .then(
          (saved)=>{
              res.status(200).send(saved)
          }
      )
      .catch(
          (err)=>{
              res.status(400).send(err)
          }
      )
  
  
  
  });

 router.delete('/deleteprod/:id',(req,res)=>{ /*nst3mel el delete ki hnfasa5*/
   let id=req.params.id
    product.findOneAndDelete({_id:id})
    .then(
    (deleteduser)=>{
        res.status(200).send(deleteduser)
    }
    ).catch(
        (err)=>{
            res.status(400).send(err)
        }
    )
});




module.exports=router;