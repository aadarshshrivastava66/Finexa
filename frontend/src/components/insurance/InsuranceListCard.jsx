import react from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../../css/insuranceListCard.css'

function InsuranceListCard({title,image,desc}){
    return(
        <div className='insuranceList-card mt-5'>
            <div className='row'>
            <div className='col'>
                <h1 className='fs-4'>{title}</h1>
                <p className='text-muted'>{desc}</p>
            <Link to={"/insurace"} style={{textDecoration:"none"}}>Explore More <i class="fa-solid fa-arrow-right-long"></i></Link>
            </div>
            <div className='col'>
                <img src={image} alt={title}/>
            </div>
            </div>
            
        </div>
    )
}

export default InsuranceListCard;