import { useEffect, useState } from "react"
import GetMint, {DoMint} from "./MintService"
import { ContainerSingle } from "../piece/Piece.js"
import { Card, CardHeader, Button, Grid, Container, Snackbar, Alert } from "@mui/material"
import { useNavigate } from "react-router-dom";
import * as fcl from "@onflow/fcl"

function Mint({mintId}) {
    let [err, setErr] = useState(null)
    let [pieceData, setPieceData] = useState(null)
    let [piece, setPiece] = useState(<span></span>)
    let [mintTx, setMintTx] = useState(null)
    let [waitForTxSnack, setWaitForTxSnack] = useState(false)
    
    let nav = useNavigate()
    let handleMintRequest = (event) => {
        event.preventDefault()
        DoMint(mintId).then((val)=>{
            setMintTx(val)
            setWaitForTxSnack(true)
            fcl.tx(val).onceSealed().then(()=>{
                setWaitForTxSnack(false)
                nav("/collection", {replace: true})
            })
        })
    }

    let handleClosed = (event) => {
        event.preventDefault()
        setWaitForTxSnack(false)
    }
    let handleErrClosed = (event) => {
        event.preventDefault()
        setErr(false)
    }
    useEffect(() => {
        GetMint(mintId).then(p => {
            console.log(p)
            if (p.puzzleID > 0 && p.pieceID > 0)
            {
                setPieceData(p)
            }
            
        }).catch(setErr)

    }, [mintId])
    
    useEffect(() =>{
        if (pieceData && pieceData.puzzleID > 0 && pieceData.pieceID > 0) {
            setPiece(
                <ContainerSingle pieceId={pieceData.pieceID} puzzleId={pieceData.puzzleID} />
            )
        }  
    }, [pieceData])

    return (
        <Card>
        {pieceData && <CardHeader title="You found a piece!" />}
        {!pieceData && <CardHeader title="No piece at this address" />}
        <Grid
           container
           spacing={0}
           direction="column"
           alignItems="center"
           justifyContent="center"
         >
 
           <Grid item xs={12} width="1">
            <Container maxWidth="sm">
            {piece}
            
            </Container>
            {pieceData && <Button disabled={mintTx} onClick={handleMintRequest}>Claim</Button>}
            </Grid>   
            
        </Grid> 
        <Snackbar open={waitForTxSnack} autoHideDuration={10000} onClose={handleClosed}>
            <Alert severity="info" sx={{ width: '100%' }}>
                    Waiting for tx {mintTx} to be sealed!
            </Alert>
        </Snackbar>
        <Snackbar open={err} autoHideDuration={10000} onClose={handleErrClosed}>
            <Alert severity="info" sx={{ width: '100%' }}>
                    Waiting for tx {mintTx} to be sealed!
            </Alert>
        </Snackbar>
        </Card>
    )
}

export default Mint