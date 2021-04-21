const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StoreSchema = new Schema({
    storeName: {
        type: String
    }
}, { collection: 'store', versionKey: false });

module.exports = mongoose.model('store', StoreSchema);
