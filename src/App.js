import GetLatestBlock from './GetLatestBlock';
import {SendTransaction, SendQuery, SignMessage } from './SendTransaction';
import Container from '@mui/material/Container';
import Nav from './Nav.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Mint from './mint/Mint'
import CollectionStatus from './Collection'
import { Grid, Paper } from '@mui/material';
import { Routes, Route, useParams } from "react-router-dom";
import { lazy, Suspense } from 'react';
import TestCanvas from './paper/TestPaper';

const Landing = lazy(() => import('./pages/Landing'));
const Help = lazy(() => import('./pages/Help'));

const darkTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: 'rgb(134, 22, 132)', //'#1976d2',
    },
    secondary: {
      main: 'rgb(220, 0, 78)',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Nunito'
    ],
    nav: {
      fontFamily: "Nunito",
      fontWeight: 300,
      color: "rgb(117, 117, 117)",
      letterSpacing: "0.0075em",
      verticalAlign: "middle",
      alignItems: "center",
      textAlign: "center"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
       <Nav />
      <Container>
        <Routes>
          <Route path="/" element={<Suspense><Landing /></Suspense>} />
          <Route path="piece/:pieceId" element={<Piece />} />
          <Route path="blockTest" element={<BlockTest />} />
          <Route path="paperTest" element={<PaperTest />} />
          <Route path="collection/puzzle/:puzzleId" element={<Collection />} />
          <Route path="mint/:mintId" element={<MintRoute />} />
          <Route path="help" element={<Suspense><Help /></Suspense>} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}
function PaperTest() {
  return (
    <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >

          <Grid item xs={12} width="1">
          <TestCanvas />
          </Grid>   
          
        </Grid> 
   
  )
}
const BlockTest = () => {
  return (
    <Paper>
      <GetLatestBlock />
      <SendTransaction />
      <SendQuery />
      <SignMessage />
    </Paper>
  )
}

const Piece = () => {
 let { pieceId } = useParams()
 return  <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >

          <Grid item xs={12} width="1">
            {pieceId}
          </Grid>   
          
        </Grid> 
}

const MintRoute = () => {
  let { mintId } = useParams()
  return  <Grid
           container
           spacing={0}
           direction="column"
           alignItems="center"
           justifyContent="center"
         >
 
           <Grid item xs={12} width="1">
           <Mint mintId={mintId} />
           </Grid>   
           
         </Grid> 
 }

const Collection = () => {
    let { puzzleId } = useParams()
    return <CollectionStatus puzzleId={puzzleId} />
}
export default App;
