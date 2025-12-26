
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";

import "../../css/lone.css"

function Lone() {
    return ( 
        <div className='container mx-auto'>
        <Card sx={{ maxWidth: 345 }} className='lonecard'>
      <CardActionArea>
        
        <CardContent>
            <h1 className='lonesambol'> <i class="fa-solid fa-shield"></i></h1>
           
          <Typography gutterBottom variant="h5" component="div">
            Insurance
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           Live your best life today, your tomorrow is secured with us
          </Typography>
        </CardContent>
        <CardActions >
        <Button size="small" color="primary" component={Link}
  to="/investment">
          Get Started &nbsp;<i class="fa-solid fa-arrow-right-long"></i>
        </Button>
      </CardActions>
      </CardActionArea>
    </Card>
    </div>
     );
}

export default Lone;