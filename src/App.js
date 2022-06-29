import GetLatestBlock from './GetLatestBlock';
import {SendTransaction, SendQuery, SignMessage } from './SendTransaction';
import Container from '@mui/material/Container';
import Nav from './Nav.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Puzzle from './puzzle/IndividualPiece'
import Mint from './mint/Mint'
import CollectionStatus from './Collection'
import { Grid, Paper } from '@mui/material';
import { Routes, Route, useParams } from "react-router-dom";
import TestCanvas from './paper/TestPaper';

const darkTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: 'rgb(220, 0, 78)',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
       <Nav />
      <Container>
        <Routes>
          <Route path="/" element={<BlockTest />} />
          <Route path="piece/:pieceId" element={<Piece />} />
          <Route path="blockTest" element={<BlockTest />} />
          <Route path="paperTest" element={<PaperTest />} />
          <Route path="collection" element={<Collection />} />
          <Route path="mint/:mintId" element={<MintRoute />} />
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
            <Puzzle pieceId={pieceId} />
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
    return <CollectionStatus />
}
export default App;
