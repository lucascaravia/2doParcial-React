const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    products: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
    }],
    customer: {
        name: String,
        email: String
    }  
})

module.exports = mongoose.model('Order', orderSchema);