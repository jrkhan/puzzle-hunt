
import { Button, Chip, Card, CardHeader } from "@mui/material"
import ExtensionIcon from '@mui/icons-material/Extension';
import {HasCollection, PieceIds} from './queries/CollectionQuery'
import { useEffect, useState } from "react";
import { Piece } from "./piece/Piece"

const CollectionStatus = () => {
    const [collectionStatus, setCollection] = useState("Checking collection status...")
    const [pieces, setPieces] = useState([])
    useEffect(()=>{
        HasCollection().then(res => {
            console.log(res)

            if (res) {
                PieceIds().then(res => {
                    if (res.length > 1) {
                        setCollection("Collection has " + res.length + " pieces")
                    }
                    else if (res.length === 1) {
                        setCollection("Collection has " + res.length + " piece")
                    }
                    else {
                        setCollection("No pieces in collection yet!")
                    }
                    let pc = []
                    for (const [index, value] of res.entries()) {
                        pc.push(<Piece key={index} id={value} />)
                    } 
                    setPieces(pc)
                })
            }
        })
    }, [])
    
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