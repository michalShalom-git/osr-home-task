const router = require('express').Router();
let News = require('../models/news.model');
const NodeCache = require("node-cache");
const dateUtils = require("../helpers/dateUtils");
const inMemoryCache = new NodeCache();
const axios = require('axios');

router.route('/:country').get(async (req, res) => {
    const country = req.params.country;

    let articles = inMemoryCache.get(country);
    if(articles === undefined){
        articles = await News.find().where({country}); // check if country exist in db
    }
    if(!articles?.length)
    {        
        try {
            const date = new Date();
            const currentDate = dateUtils.formatDateToString(date);
            date.setDate(date.getDate() - 30);
            const aMonthAgo = dateUtils.formatDateToString(date);
            
            const API_KEY = process.env.API_KEY;
            const response = await axios.get(`https://newsapi.org/v2/everything?q=bitcoin+${country}&from=${aMonthAgo}&to=${currentDate}&sortBy=popularity&apiKey=${API_KEY}`);
            articles = response.data.articles;
        } catch (error) {
            console.error(error);
        }
        articles = articles.map((article)=>{
            article.country  = country;
            return article;
        });
        const success = inMemoryCache.set( country, articles, 600);
        console.log("success " + success);
        News.insertMany(articles);
    };
    res.send(articles);
        
    });

    router.route("/").delete(async (req, res, next) => {
        const toDelete = await News.deleteMany({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
        })
        
    });
    


module.exports = router;