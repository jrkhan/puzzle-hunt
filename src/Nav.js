
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import User from './User';
import { useState } from 'react';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar } from '@mui/material';
import { Extension, Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';




const Nav = () => {
  let [mainNavOpen, setMainNavOpen] = useState(false)

  const toggleDrawer = () => {
    setMainNavOpen(!mainNavOpen)
  };

  const mainNav = <Box 
    sx={{ width: 250 }}
    role="presentation">
            <Toolbar><Typography>Puzzle Alley</Typography></Toolbar>
            <Divider />
            <List>
              <ListItem disablePadding component={Link} to="/">
                <ListItemButton>
                  <ListItemIcon ><Home /></ListItemIcon>
                  <ListItemText><Typography variant="nav">Home</Typography></ListItemText>
                </ListItemButton>
              
              </ListItem>
              <ListItem disablePadding component={Link} to="/collection/puzzle/2">
                <ListItemButton>
                  <ListItemIcon>
                    <Extension />
                  </ListItemIcon>
                  <ListItemText><Typography variant="nav">Collection</Typography></ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
  


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
            <SwipeableDrawer
              anchor="left"
              variant="temporary"
              open={mainNavOpen}
              onOpen={toggleDrawer}
              onClose={toggleDrawer}
              sx={{
                display: { boxSizing: 'border-box' },
              }}
              >

              {mainNav}
            </SwipeableDrawer>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Puzzle Alley
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: 'flex' } }}>
            
          <User />
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

export default Nav;