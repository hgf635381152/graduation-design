const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StoreSchema = new Schema({
    storeId: {
        type: Number
    },
    storename: {
        type: String
    },
    area: {
        type: String
    },
    address: {
        type: String
    },
    dishsort: {
        type: String
    },
    img: {
        type: String
    },
    average: {
        type: Number
    },
    score: {
        type: Number
    },
    tele: {
        type: String
    }
}, { collection: 'store', versionKey: false });

module.exports = mongoose.model('store', StoreSchema);
