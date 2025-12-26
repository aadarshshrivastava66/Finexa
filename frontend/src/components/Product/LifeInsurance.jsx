import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";

import "../../css/investement.css"

function LifeInSueance() {
    return ( 
        <div className='container '>
        <Card sx={{ maxWidth: 345 }} className='card'>
      <CardActionArea>
        
        <CardContent>
            <h1 className='sambol'> <i class="fa-solid fa-dollar-sign"></i></h1>
           
          <Typography gutterBottom variant="h5" component="div">
            Loans
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           Personal, Bussiness ,Home Loans with Minimum Documentations and Low-Interest Rates
          </Typography>
        </CardContent>
        <CardActions >
        <Button size="small" color="primary" component={Link}
  to="/investment">
          Apply Now &nbsp;<i class="fa-solid fa-arrow-right-long"></i>
        </Button>
      </CardActions>
      </CardActionArea>
    </Card>
    </div>
     );
}

export default LifeInSueance;