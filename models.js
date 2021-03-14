const mongoose = require('mongoose');

const dashBoardSchema = new mongoose.Schema({
    month: {
        type: String,
        required: [true, "Needed"]
    },
    date: {
        type: Number,
        required: [true, "Needed"]
    },
    totalRevenue: {
        type: Number,
        required: [true, "Needed"]
    },
    totalProfit: {
        type: Number,
        required: [true, "Needed"]
    },
    newCustomers: {
        type: Number,
        required: [true, "Needed"]
    },
    topProduct: {
        fridge: {
            type: Number,
            required: [true, "Needed"]
        },
        iphone: {
            type: Number,
            required: [true, "Needed"]
        },
        samsung: {
            type: Number,
            required: [true, "Needed"]
        },
        homeTheater: {
            type: Number,
            required: [true, "Needed"]
        },
        tv: {
            type: Number,
            required: [true, "Needed"]
        }
    },
    salesByCategory: {
        mobile: {
            type: Number,
            required: [true, "Needed"]
        },
        electronics: {
            type: Number,
            required: [true, "Needed"]
        },
        homeAppliances: {
            type: Number,
            required: [true, "Needed"]
        }
    },
    sales: {
        type: Number,
        required: [true, "Needed"]
    }
})

model = new mongoose.model("Dashboard", dashBoardSchema)

module.exports = model;