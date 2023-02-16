import { useEffect, useState } from "react";
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useSearchParams } from "react-router-dom/dist";
import {formatDate} from '../helpers/dateUtils';
import { titleWrap, authorWrap } from "./News.style";


function News(){ 
    const [articles,setArticles] = useState([]); 
    const [searchParams] = useSearchParams();
    const country  = searchParams.get("country");


    useEffect(() => {
        async function fetchArticals() {
            let response = await axios.get(`http://localhost:4001/news/${country}`);
            const _articles = formatDate(response.data);
            setArticles(_articles);
        }
        fetchArticals()
    }, [])

    return (
        <>
            <Typography variant="h2" component="div" sx={titleWrap}>{country} Bitcoin News Archive</Typography>
                {articles && articles.map((article) => {
                    return(
                    <>    
                        <Card sx={{ width: '90%', hight: 150, margin:'1%' }} key={"key-"+article._id}>
                            <CardContent sx={{display:'flex',flexDirection:"row"}}>  
                            <CardMedia
                                component="img"
                                sx={{height:"100px",width:"100px",marginRight:"16px"}}
                                image={article.urlToImage}
                                alt="article-picture"
                            />
                                <Box sx={{display:"flex", flexDirection:"column"}}>
                                    <Typography variant="h5" component="div">
                                        {article.title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {article.content}
                                    </Typography>
                                </Box>
                                <Box sx={authorWrap}>
                                    <Typography variant="body2" component="div">
                                    {article.author&&<>  by {article.author}</>}
                                    </Typography>
                                    <Typography variant="body2">
                                        {article.publishedAt}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </>
                    )
                })                
                }
        </>
    );
};

export default News;