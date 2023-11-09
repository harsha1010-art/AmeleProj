import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar } from '@mui/material';

export function Coursedtls() {
  const { id } = useParams();
  const [coursedata, setcoursedata] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3333/Course/${id}`)
      .then((res) => setcoursedata(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const prerequisites = coursedata.prerequisites || [];

  

  return (
    <div className="hed">
      <h1 className="heding">Course Details</h1>
      <div className="maincourse" style={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 945, minHeight: 600,  }}>
          <Typography gutterBottom variant="h3" component="div" style={{ padding: '20px' }}>
            {coursedata.name}
          </Typography>
          <CardMedia component="img" alt="Course Thumbnail" height="350" image={coursedata.thumbnail} />
          <CardContent>
           
            
            <CardActions style={{display:'flex',justifyContent:'space-between'}}>
             
              <Button size="large" ><Avatar src="/broken-image.jpg"  sx={{ width: 30, height: 30,marginRight:'10px'  }}/>{coursedata.instructor}</Button>
              <Button size="large" style={{backgroundColor:'none'}}>{coursedata.status}</Button>
            </CardActions>
            <Typography variant="body2" color="text.secondary">
              {coursedata.description}
            </Typography>
          </CardContent>
          {prerequisites.map((pre,i)=>(
            <CardActions key={i}>
            <Typography>
           Prerequisites: {pre}

            </Typography>
          </CardActions>
          
          ))}
            <CardActions style={{display:'flex',}}>
             
             <Button size="large" >{coursedata.duration}</Button>
             <Button size="large" style={{backgroundColor:'none'}}>{coursedata.location}</Button>
           </CardActions>
          
        </Card>
      </div>
      
    </div>
  );
}
