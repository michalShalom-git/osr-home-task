import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { imagesWrap, titleWrap } from './HomePage.style';

function HomePage(props) {
    const nevigate = useNavigate();

    return (
            <div sx={{boxSizing:"border-box"}}> 
                <Box sx={titleWrap}>
                    <Typography variant={"h3"} >Welcome to OSR Global Bitcoin News Archive </Typography>
                    <Typography variant={"h6"} sx={{marginTop:"1em"}} >Please select a country to view its archive </Typography>
                </Box>
                <Box sx={imagesWrap}>
                    <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1200px-Flag_of_the_People%27s_Republic_of_China.svg.png"
                        alt="china"
                        onClick = {()=>nevigate({pathname:"/news",search:"?country=China"})}
                    />
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                        alt="usa"
                        onClick = {()=>nevigate({pathname:"/news",search:"?country=USA"})}
                    />
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1200px-Flag_of_Canada_%28Pantone%29.svg.png"
                        alt="canada"
                        onClick = {()=>nevigate({pathname:"/news",search:"?country=Canada"})}
                    />
                </Card>
                </Box>
            </div>
    );

}

export default HomePage;

