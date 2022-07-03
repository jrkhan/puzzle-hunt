import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import AccountCircle from '@mui/icons-material/AccountCircle';
import { MenuItem, Menu, Avatar, Divider, ListItemIcon } from "@mui/material";
import Logout from '@mui/icons-material/Logout';

const SignInOutButton = ({ user: { loggedIn } }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    fcl.unauthenticate()
  };
  const signInOrShowMenu = async (event) => {
    
    event.preventDefault()
    
    if (loggedIn) {
      // show menu
      setAnchorEl(event.currentTarget);
      
    } else {
      fcl.authenticate()
    }
  }

  return (
    <React.Fragment>
    <MenuItem onClick={signInOrShowMenu}> 
     {loggedIn? <AccountCircle /> : "Sign In"}
    </MenuItem>
    <Menu
    anchorEl={anchorEl}
    id="account-menu"
    open={open}
    onClose={handleClose}
    onClick={handleClose}
    PaperProps={{
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    }}
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  >
    <MenuItem>
      <Avatar /> Profile
    </MenuItem>
    <MenuItem>
      <Avatar /> My account
    </MenuItem>
    <Divider />
    <MenuItem onClick={handleLogout}>
      <ListItemIcon>
        <Logout fontSize="small" />
      </ListItemIcon>
      Logout
    </MenuItem>
  </Menu>
</React.Fragment>
  )
}

const CurrentUser = () => {
  const [user, setUser] = useState({})

  useEffect(() =>
    fcl
      .currentUser()
      .subscribe(user => setUser({...user}))
  , [])

  return (
      <SignInOutButton user={user} />
  )
}

export default CurrentUser
