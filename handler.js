const model = require('./models')

exports.addProduct = async (req, res, next) => {
    try {
        const data = await model.create(req.body)
        if (data) {
            res.status(200).json({ "message": "successful" })
        }
        else {
            let err = new Error("Some Error")
            err.statusCode = 406
            throw err
        }
    } catch (err) {
        next(err)
    }
}

exports.fetchDatas = async (req, res, next) => {
    try {
        const fetchProfit = await model.aggregate([{ $project: { _id: 0 } },
        { $group: { _id: "Profit", profit: { $sum: "$totalProfit" } } }
        ])
        totalProfit = fetchProfit[0].profit
        const fetchRevenue = await model.aggregate([{ $project: { _id: 0 } },
        { $group: { _id: "Revenue", revenue: { $sum: "$totalRevenue" } } }])
        totalRevenue = fetchRevenue[0].revenue
        const fetchCustomers = await model.aggregate([{ $project: { _id: 0 } },
        { $group: { _id: "NewCustomers", newCustomer: { $sum: "$newCustomers" } } }
        ])
        totalNewCustomer = fetchCustomers[0].newCustomer
        customerSatisfaction = 90
        const fetchTopProduct = await model.aggregate([{
            $project:
                { topProducts: { $objectToArray: "$topProduct" } }
        },
        { $unwind: "$topProducts" },
        { $group: { _id: "$topProducts.k", product_sold: { $sum: "$topProducts.v" } } },
        { $project: { _id: 0, name: "$_id", y: "$product_sold" } }
        ])
        const fetchbyCat = await model.aggregate([{
            $project:
                { salesByCategory: { $objectToArray: "$salesByCategory" } }
        },
        { $unwind: "$salesByCategory" },
        { $group: { _id: "$salesByCategory.k", sales_by_cat: { $sum: "$salesByCategory.v" } } },
        { $project: { _id: 0, name: "$_id", y: "$sales_by_cat" } }])
        const fetchSales = await model.find({}, { _id: 0, sales: 1 })
        const fetchProp = await model.find({}, { _id: 0, totalProfit: 1 })
        let salesArray = []
        let profArray = []
        fetchSales.map(x => salesArray.push(x.sales))
        fetchProp.map(x => profArray.push(x.totalProfit))
        const responseToSend = {
            profit: totalProfit,
            revenue: totalRevenue,
            newCust: totalNewCustomer,
            customerSat: customerSatisfaction,
            topProd: fetchTopProduct,
            salesCat: fetchbyCat,
            saleArray: salesArray,
            profitArray: profArray,
            dateArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
        if (responseToSend) {
            res.status(200).json(responseToSend)
        }
        else {
            let err = new Error("Some Error")
            err.statusCode = 406
            throw err
        }
    } catch (err) {
        next(err)
    }
}
exports.getDataByDay = async (req, res, next) => {
    try {
        const dayData1 = await model.find({ date: req.params.day })
        dayData = dayData1[0]
        customerSatisfaction = req.params.day * 10
        salesArray = []
        profArray = []
        salesArray.push(dayData.sales)
        profArray.push(dayData.totalProfit)
        const responseToSend = {
            profit: dayData.totalProfit,
            revenue: dayData.totalRevenue,
            newCust: dayData.newCustomers,
            customerSat: customerSatisfaction,
            saleArray: salesArray,
            profitArray: profArray,
            dateArray: [req.params.day],
            product: dayData.topProduct
        }
        if (responseToSend) {
            res.status(200).json(responseToSend)
        }
        else {
            let err = new Error("Some Error")
            err.statusCode = 406
            throw err
        }

    } catch (err) {
        next(err)
    }
}
exports.getDataForPie = async (req, res, next) => {
    try {
        const saleCate = await model.aggregate([
            {$match:{date: req.params.day*1}},
            {$project:
                { _id:0,salesByCategory: { $objectToArray: "$salesByCategory" } }
        },
        { $unwind: "$salesByCategory" },
        { $group: { _id: "$salesByCategory.k", sales_by_cat: { $sum: "$salesByCategory.v" } } },
        { $project: { _id: 0, name: "$_id", y: "$sales_by_cat" } }
    ])
    const fetchTopProduct = await model.aggregate([{$match:{date: req.params.day*1}},
    {$project:{ topProducts: { $objectToArray: "$topProduct" } }},
    { $unwind: "$topProducts" },
    { $group: { _id: "$topProducts.k", product_sold: { $sum: "$topProducts.v" } } },
    { $project: { _id: 0, name: "$_id", y: "$product_sold" } }
    ])
        const responseToSend = {
            dateArray: [req.params.day],
            salesCat:saleCate,
            topProd: fetchTopProduct,
        }
        if (responseToSend) {
            res.status(200).json(responseToSend)
        }
        else {
            let err = new Error("Some Error")
            err.statusCode = 406
            throw err
        }

    } catch (err) {
        next(err)
    }
}

exports.getTableData =async (req, res, next) => {
    try {
        const responseToSend = await model.find()
        if (responseToSend) {
            res.status(200).json(responseToSend)
        }
        else {
            let err = new Error("Some Error")
            err.statusCode = 406
            throw err
        }

    } catch (err) {
        next(err)
    }
}

