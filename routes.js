const express = require('express');
const handler = require('./handler')

const router = express.Router()

router.route('/product').post(handler.addProduct)
router.route('/product').get(handler.fetchDatas)
router.route('/product/:day').get(handler.getDataByDay)
router.route('/pie/:day').get(handler.getDataForPie)
router.route('/table').get(handler.getTableData)
router.all("*",(req,res,next)=>{
    res.status(200).json({'Message':'Please give valid path'})
})


module.exports = router