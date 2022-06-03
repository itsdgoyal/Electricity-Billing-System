const router = require('express').Router()
const formdata = require('../models/form')

router.get('/',(req,res)=>{
    res.render('form.ejs')
})



router.post('/',async(req,res)=>{
    const cid = req.body.cid
    const name = req.body.name 
    const address = req.body.address 
    const unit = req.body.unit
    let amount = 0
    if(unit <= 0){
        amount = 0
    }
    // 1-100 unit*50
    else if(unit <= 100){
        amount = unit*50
    }
    //1-200 unit*200
    else if(unit <= 200){
        amount = unit*200
    }
    //1-300 unit*350
    else if(unit <= 300){
        amount = unit*350
    }else if(unit >300){
        amount = unit*325
    }
    const data = new formdata({cid:cid,name:name,address:address,unit:unit,amount:amount})
    await data.save()
    //console.log(req.body)
    console.log(data)
    res.redirect(`/amountpage?id=${data._id}`)

})
router.get('/amountpage',async(req,res)=>{
    
    const id = req.query.id
    //console.log(id)
    const amount = await formdata.findById(id)
    console.log(amount)
    res.render('amountpage.ejs',{amount:amount})
})

router.get('/database',async(req,res)=>{
    const data = await formdata.find()
    res.render('database.ejs',{data:data})
})

router.get('/database/:id',async(req,res)=>{
    const id = req.params.id
    //console.log(id)
    await formdata.findByIdAndDelete(id)
    res.redirect('/database')  
})



module.exports = router