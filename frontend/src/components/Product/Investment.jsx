import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";

import "../../css/investement.css"

function Investment() {
    return ( 
        <div className='container '>
        <Card sx={{ maxWidth: 345 }} className='card'>
      <CardActionArea>
        
        <CardContent>
            <h1 className='sambol'> <i class="fa-solid fa-arrow-trend-up"></i></h1>
           
          <Typography gutterBottom variant="h5" component="div">
            Investements
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Grow your Wealth With our Curated Mutual Funds
            And Fixed Deposite Schemes
            
          </Typography>
        </CardContent>
        <CardActions >
        <Button size="small" color="primary" component={Link}
  to="/investment">
          Start Investing &nbsp;<i class="fa-solid fa-arrow-right-long"></i>
        </Button>
      </CardActions>
      </CardActionArea>
    </Card>
    </div>
     );
}

export default Investment;