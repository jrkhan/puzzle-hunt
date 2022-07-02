
import { Button, Chip, Card, CardHeader } from "@mui/material"
import ExtensionIcon from '@mui/icons-material/Extension';
import {HasCollection, PieceIds} from './queries/CollectionQuery'
import { useEffect, useState } from "react";
import { Piece } from "./piece/Piece"
import * as fcl from "@onflow/fcl"
import {PieceData} from './queries/PieceQuery'


async function process(puzzleId) {
    let res = await PieceIds()

    let pc = []
    for (const [key, value] of res.entries()) {
        let pd = await PieceData(null, value)
        if (pd.puzzleId === puzzleId) {
            console.log("yep " + pd.puzzleId + " matches " + puzzleId)
            pc.push(<Piece key={key} id={value} />)
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
    const [collectionStatus, setCollection] = useState("Checking collection status...")
    const [pieces, setPieces] = useState([])

    const [user, setUser] = useState({loggedIn: null})

    useEffect(() => fcl.currentUser.subscribe(setUser), [])

    useEffect(()=>{
        if (!user || !user.addr) {
            setCollection("Please login to view your collection")
            setPieces([])
            return
        }
        HasCollection().then(res => {
            console.log(res)
            if (res) {
                process(puzzleId).then(pieces=>{
                    setCollection(collectionMessage(pieces.length))
                    setPieces(pieces)
                })
            }
        })
    }, [user])
    
    return (
        <Card>
        <CardHeader title="Collection Status" />
        <Chip icon={<ExtensionIcon />} label={collectionStatus}></Chip>
        {collectionStatus === "Not found" &&
            <Button>Start Collection</Button>
        }
        <svg viewBox="0 0 1800 1200">
        {pieces}
        </svg>
        </Card>
    )
}

export default CollectionStatus