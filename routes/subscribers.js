const express = require('express')
const Subscriber = require('../models/subscriber')
const ash = require("express-async-handler")



const router = express.Router()

//signup

router.post("/signup" , ash(async (req , res)=>{
    const { username , email , password} = req.body;
}))




//create subscriber

router.post(('/'), ash(async (req, res) =>{
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedChannel: req.body.subscribedChannel
    })
    try{
       const newSubscriber = await subscriber.save()
       res.status(201).json(newSubscriber)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
}))

//Get subscriber middleware

async function getSubscriber(req, res, next){
    try{
       const subscriber = await Subscriber.findById(req.params.id)
       if (subscriber == null){
          return res.status(404).json({message:'Cant find subscriber'})
       }

       res.subscriber = subscriber; 
    }
    catch(err){
        res.status('500').json({message: err.message})
    }
    

next()
}

//get all subcribers route

router.get('/', async (req, res) =>{
    try{
        const subs = await Subscriber.find()
        res.json(subs)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

// Get subscriber route
router.get('/:id',getSubscriber, ash(async (req, res) =>{
    try{
        console.log(res.subscriber.name)
        res.send(res.subscriber.name)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}))




// Patch route
router.patch('/:id', getSubscriber, ash(async (req, res) => {
    console.log(req.body.name)
    if (req.body.name != null){
        res.subscriber.name = req.body.name

    }
    console.log(req.body.subscribedChannel)

    if (req.body.subscribedChannel != null){
        res.subscriber.subscribedChannel = req.body.subscribedChannel
        }

    try{
        const updatedSubs = await res.subscriber.save()
        res.json(updatedSubs)

    }
    catch(err){
        res.status(400).json({message: err.message})
    }
}))

//delete route
router.delete('/:id', getSubscriber, ash(async (req, res) => {
    try{
        console.log(res.subscriber)
        await res.subscriber.remove()
        res.json({message: "Deleted Subscriber"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}))

module.exports = router