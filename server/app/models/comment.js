const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StoreSchema = new Schema({
    storeId: {
        type: Number
    },
    userId: {
        type: Number,
    },
    username: {
        type: String
    },
    score: {
        type: Number
    },
    time: {
        type: String
    },
    text: {
        type: String
    }
}, { collection: 'comment', versionKey: false });

module.exports = mongoose.model('comment', StoreSchema);