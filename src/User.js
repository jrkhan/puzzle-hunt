import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import AccountCircle from '@mui/icons-material/AccountCircle';
import { MenuItem } from "@mui/material";

const SignInOutButton = ({ user: { loggedIn } }) => {
  const signInOrOut = async (event) => {
    event.preventDefault()

    if (loggedIn) {
      fcl.unauthenticate()
    } else {
      fcl.authenticate()
    }
  }

  return (
    <MenuItem onClick={signInOrOut}> 
     {loggedIn? <AccountCircle /> : "Sign In"}
    </MenuItem>
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
