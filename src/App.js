import HomePage from './HomePage/HomePage';
import { Routes, Route } from 'react-router-dom';
import News from './News/News';
import Box from '@mui/material/Box';


const App = () => {
  return (
    <>
      <Box sx={{height:"100%", background:"linear-gradient(#91a5b4, #fff)",paddingTop:"6em",boxSizing:"border-box"}}> 
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<News />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;