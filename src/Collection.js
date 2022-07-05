
import { Button, Chip, Card, CardHeader, ListItem, ListItemIcon, ListItemButton, ListItemText, Typography } from "@mui/material"
import ExtensionIcon from '@mui/icons-material/Extension';
import {HasCollection, PieceIds} from './queries/CollectionQuery'
import { Fragment, useEffect, useState } from "react";
import { Piece } from "./piece/Piece"
import * as fcl from "@onflow/fcl"

import {PieceData, PieceDataAll} from './queries/PieceQuery'
import LookupViewbox from "./puzzle/Viewbox";
import {MobileView} from 'react-device-detect';
import { CameraAltRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

async function process(targetPuzzleId) {
    let allData = await PieceDataAll(null, await PieceIds())
    let pc = []
    for (let {id, puzzleId, pieceId} of allData) {
        if (puzzleId === targetPuzzleId) {
            pc.push(<Piece key={id} puzzleId={puzzleId} pieceId={pieceId} />)
        }
    }
    return pc
}

function collectionMessage(np) {
    if (np > 1) {
        return "Collection has " + np + " pieces"
    }
    else if (np === 1) {
        return "Collection has " + np + " piece"
    }
    else {
        return "No pieces in collection yet!"
    }
}

const CollectionStatus = ({puzzleId}) => {
    const [collectionStatus, setCollection] = useState("Checking loging status...")
    const [pieces, setPieces] = useState([])

    const [user, setUser] = useState({loggedIn: null})

    useEffect(() => fcl.currentUser.subscribe(setUser), [])

    useEffect(()=>{
        if (!user || !user.addr) {
            setCollection("Please login to view your collection")
            setPieces([])
            return
        }
        setCollection("Checking collection status...")
        HasCollection().then(res => {
            setCollection("Retreiving collection...")
            if (res) {
                process(puzzleId).then(pieces=>{
                    setCollection(collectionMessage(pieces.length))
                    setPieces(pieces)
                })
            }
        })
    }, [user, puzzleId])
    
    return (
        <Fragment>
        <Card>
        <CardHeader title="Collection Status" />
        <Chip icon={<ExtensionIcon />} label={collectionStatus}></Chip>
        {collectionStatus === "Not found" &&
            <Button>Start Collection</Button>
        }
        <svg viewBox={LookupViewbox(puzzleId)}>
        {pieces}
        </svg>
        </Card>
        <MobileView>
        <Card>
        <ListItem disablePadding component={Link} to="/scanner">
        <ListItemButton>
            <ListItemIcon>
            <CameraAltRounded />
            </ListItemIcon>
            <ListItemText><Typography variant="nav">Scan a new code!</Typography></ListItemText>
        </ListItemButton>
        </ListItem>
        </Card>
        </MobileView>
        </Fragment>
    )
}

export default CollectionStatus