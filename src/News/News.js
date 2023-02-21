import { useEffect, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useSearchParams } from 'react-router-dom/dist';
import { formatDate } from '../helpers/dateUtils';
import { titleWrap, authorWrap, imagesWrap, pageWrap, syncButton, articlesList, backButton } from './News.style';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

function News() {
	const [articles, setArticles] = useState([]);
	const [searchParams] = useSearchParams();
	const country = searchParams.get('country');

	useEffect(() => {
		fetchArticals();
	}, [country]);

	async function fetchArticals() {
		let response = await axios.get(`http://localhost:4001/news/${country}`);
		const _articles = formatDate(response.data);
		setArticles(_articles);
	}

	function handleClick() {
		console.log('Button clicked!');
		fetchArticals();
	}

	return (
		<>
			<Box sx={pageWrap}>
				<IconButton sx={syncButton} onClick={handleClick}>
					<Box
						component="img"
						sx={{
							height: '50px',
							width: '50px'
						}}
						src="/sync.png"
						alt="refresh"
					/>
				</IconButton>
				<Typography variant="h2" component="div" sx={titleWrap}>
					{country} Bitcoin News Archive
				</Typography>
				<Box sx={articlesList}>
					{articles &&
						articles.map((article) => {
							return (
								<>
									<Card
										sx={{
											margin: '16px'
										}}
										key={'key-' + article._id}
									>
										<CardContent
											sx={{
												display: 'flex',
												flexDirection: 'row'
											}}
										>
											<CardMedia component="img" sx={imagesWrap} image={article.urlToImage} alt="article-picture" />
											<Box
												sx={{
													display: 'flex',
													flexDirection: 'column'
												}}
											>
												<Typography variant="h5" component="div">
													{article.title}
												</Typography>
												<Typography variant="body2">{article.content}</Typography>
											</Box>
											<Box sx={authorWrap}>
												<Typography variant="body2" component="div">
													{article.author && <> by {article.author}</>}
												</Typography>
												<Typography variant="body2">{article.publishedAt}</Typography>
											</Box>
										</CardContent>
									</Card>
								</>
							);
						})}
				</Box>
				<Button sx={backButton} variant="outlined" href="./" size="large">
					Back
				</Button>
			</Box>
		</>
	);
}

export default News;
