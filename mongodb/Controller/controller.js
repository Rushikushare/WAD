const express =require('express')
const router=express.Router();

const db=require('../Model/db')

router.get('/',async(req,res)=>{
     const data=await db.find()
     res.json(data)
 })

router.post('/:name',async(req,res)=>{
    const newdata=new db({
        name:req.params.name})
        await newdata.save()
})
router.put('/:name', async (req, res) => {
    try {
        const updatedData = await db.findByIdAndUpdate(req.params.name, req.body, { new: true });
        res.json(updatedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.patch('/:name', async (req, res) => {
    try {
        const updatedData = await db.findByIdAndUpdate(req.params.name, req.body, { new: true });
        res.json(updatedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})


router.put('/update',async(req,res)=>{

}
)




module.exports=router