const express=require("express");
const { default: mongoose } = require("mongoose");
const mmongoose=require("mongoose")
const app=express();
const ShortUrl=require("./models/shortUrl")

mongoose.connect("mongodb://localhost/urlShortner",{useNewUrlParser:true})

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

app.get("/",async function(req,res){
   const shorturls=  await ShortUrl.find()
    res.render('index',{shorturls:shorturls});
})



app.post("/shortUrls",async function(req,res){
await ShortUrl.create({full:req.body.fullUrl})

res.redirect("/");
})


app.get('/:shorturl',async function(req,res){
   const shortUrl= await ShortUrl.findOne({short:req.params.shorturl})
   if(shortUrl==null)
   return res.sendStatus(404)
   
   shortUrl.clicks++
   shortUrl.save()
// console.log(shortUrl.full)
   res.redirect(shortUrl.full)
   
})






app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000");
}
)