const express = require('express')
const router = express.Router()
const Bill = require('../models/bill')
const billController = require('../controllers/billController')

router.post('/', async (req,res)=>{
    let daysExpire = await billController.calculateDays(req.body.dueDate, req.body.paymentDate);
    let valueToAdjust = await billController.calculateValue(daysExpire, req.body.value);

    const bill = new Bill({
        name: req.body.name,
        value: req.body.value,
        dueDate: req.body.dueDate,
        paymentDate: req.body.paymentDate,
        adjustedValue: valueToAdjust,
        expiredDays: daysExpire
    })

    try {
        const newBill = await bill.save()
        res.status(201).json({message: "New bill inserted"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/', async (req,res)=>{
    try{
        const bills = await Bill.find({}, {name:1,value:1,adjustedValue:1,expiredDays:1,paymentDate:1})
        res.json(bills)
    }catch (error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router