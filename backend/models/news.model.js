const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    country: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: Date,
        required: true,
    },
    urlToImage: {
        type: String,
        required: false,
    }
})
const News = mongoose.model('News4', newsSchema);

module.exports = News; 