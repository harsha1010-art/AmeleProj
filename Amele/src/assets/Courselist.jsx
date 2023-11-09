import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export  function Courselist() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [adata, setdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    axios.get('http://localhost:3333/Course')
      .then(res => setdata(res.data))
      .catch(err => console.log(err));
  }, []);


  // Filter courses based on the search query
  const filteredCourses = adata.filter((course) => {
    const courseNameMatch = course.name.toLowerCase().includes(searchQuery.toLowerCase());
    const instructorMatch = course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return courseNameMatch || instructorMatch;
  });


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to={`/dash`}><MenuItem onClick={handleMenuClose}>Dashboard</MenuItem></Link>
    
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
     
     
     
    </Menu>
  );

  return (
    <><Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{marginTop:'-30px'}}>
        <Toolbar>


          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Course list
          </Typography>
          <Search sx={{ justifyContent: 'center', left:'800px'}}>
            <SearchIconWrapper>
              <SearchIcon sx={{ justifyContent: 'center' }} />
            </SearchIconWrapper>
            <StyledInputBase
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}

              inputProps={{ 'aria-label': 'search' }} />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>


            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box> 

   
    <div  style={{ display: 'flex', flexWrap: 'wrap' ,textDecoration:'none'}}>
    {
      filteredCourses.map((d)=>(
        <div key={d.id} style={{ paddingTop:'20px',flex: '0 0 33.3333%', maxWidth: '33.3333%' }}>
      
         <Link to={`/${d.id}`} key={d.id}><Card sx={{ maxWidth: 345 }} key={d.id} style={{textDecoration:'none'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={d.thumbnail}
          alt="green iguana"
        />
        <CardContent className='card'>
          <Typography gutterBottom variant="h5" component="div" sx={{textDecoration:'none'}}  underline="none">
            
           {d.name}
          </Typography>
          <Typography gutterBottom  variant="h6" component="div" style={{textDecoration:'none', fontFamily:'sans-serif'}}>
            
           Instructor: {d.instructor}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {d.description}
          </Typography>
        </CardContent>
      </CardActionArea>
     
    </Card></Link>
    </div>
      ))
    }
    </div>
    


    </>
  );
}