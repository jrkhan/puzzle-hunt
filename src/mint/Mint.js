import { useEffect, useState } from "react"
import GetMint, {DoMint} from "./MintService"
import { ContainerSingle } from "../piece/Piece.js"
import { Card, CardHeader, Button, Grid, Container, Snackbar, Alert, Box } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { HasCollection } from "../queries/CollectionQuery"
import CreateCollection from "../transactions/CreateCollection"
import * as fcl from "@onflow/fcl"


function Mint({mintId}) {
    let [err, setErr] = useState(null)
    let [pieceData, setPieceData] = useState(null)
    let [piece, setPiece] = useState(<span></span>)
    let [checkingForPiece, setCheckingForPiece] = useState(true)
    let [claimFlowInProgress, setInProgress] = useState(false)
    let [waitForTxSnack, setWaitForTxSnack] = useState(false)
    let [newlyFoundPiece, setNewlyFoundPiece] = useState(false)
    let [isCreatingCollection, setCreatingCollection] = useState(false)
    let [isPreMint, setPreMint] = useState()
    let [txStatus, setTxStatus] = useState("awaiting approval");

    let ClaimFlow = async () => {
        setInProgress(true)
        await fcl.authenticate()
        let has = await HasCollection()
        if (!has) {
            // collection does not exist yet for the current user
            setCreatingCollection(true)
            let txId = await CreateCollection()
            setTxStatus("sending transaction")
            fcl.tx(txId).subscribe(status =>{
                console.log(status)
                let ss = status.statusString
                if (ss) {
                    setTxStatus(ss)
                }
            });
            await fcl.tx(txId).onceSealed();
            setCreatingCollection(false)
        }
        setPreMint(true)
        let val = await DoMint(mintId)
        setPreMint(false)
        setWaitForTxSnack(true)
        setTxStatus("PENDING")
        fcl.tx(val).subscribe(status =>{
            //console.log(status)
            let ss = status.statusString
            if (ss) {
                setTxStatus(ss)
            }
        });
        await fcl.tx(val).onceSealed()
        nav("/collection/puzzle/" + pieceData.puzzleID, {replace: true})
        setWaitForTxSnack(false)
        setInProgress(false)
    }

    let nav = useNavigate()
    let handleMintRequest = (event) => {
        event.preventDefault()
        ClaimFlow(mintId)
    }

    let handleErrClosed = (event) => {
        event.preventDefault()
        setErr(false)
    }
    let autoClaim = (event) => {
        event.preventDefault()
        setNewlyFoundPiece(false)
    }
    useEffect(() => {
        GetMint(mintId).then(p => {
            console.log(p)
            if (p.puzzleID > 0 && p.pieceID > 0)
            {
                setPieceData(p)
            }
            setCheckingForPiece(false)
        }).catch(setErr)

    }, [mintId])
    
    useEffect(() =>{
        if (pieceData && pieceData.puzzleID > 0 && pieceData.pieceID > 0) {
            setPiece(<Box pb={5}>
                <ContainerSingle pieceId={pieceData.pieceID} puzzleId={pieceData.puzzleID} />
                </Box>
            )
        }  
    }, [pieceData])

    return (
        <Card>
        {checkingForPiece && <CardHeader title="Checking for piece..." />}
        {!checkingForPiece && pieceData && <CardHeader title="You found a piece!" />}
        {!checkingForPiece && !pieceData && <CardHeader title="No piece at this address" />}
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
            {pieceData && <Button variant="contained" size="large" disabled={claimFlowInProgress} onClick={handleMintRequest}>Add to my Collection</Button>}
     
            </Grid>   
            
        </Grid> 
        <Snackbar open={newlyFoundPiece} autoHideDuration={10000} onClose={autoClaim}>
            <Alert severity="success" sx={{ width: '100%' }}>
                    You found a piece!
            </Alert>
        </Snackbar>
        
        <Snackbar open={isCreatingCollection}>
            <Alert severity="info" sx={{ width: '100%' }}>Bootstrapping your puzzle collection! <br />
            Status: {txStatus}</Alert>
        </Snackbar>
        <Snackbar open={isPreMint}>
            <Alert severity="info" sx={{ width: '100%' }}>Requesting a signed message to claim your piece!</Alert>
        </Snackbar>
        <Snackbar open={waitForTxSnack}>
            <Alert severity="info" sx={{ width: '100%' }}>
                    Waiting for minting transaction to be SEALED
                    Status: {txStatus}
            </Alert>
        </Snackbar>
        <Snackbar open={err} autoHideDuration={10000} onClose={handleErrClosed}>
            <Alert severity="info" sx={{ width: '100%' }}>
                    Error minting puzzle piece!
            </Alert>
        </Snackbar>
        </Card>
    )
}

export default Mint