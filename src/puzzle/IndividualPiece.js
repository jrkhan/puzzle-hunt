import { Error } from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"
import GetPiece from "./PieceService"
import BuildPiece from './CutoutPiece'
import { Paper } from "@mui/material"

function PuzzleTable({pieceId}) {
    let [err, setErr] = useState(null)
    let [piece, setPiece] = useState(null)

    GetPiece(pieceId).then(p => {
        setPiece(p)
    }).catch(setErr)

    return (
        <span>
        {piece && 
            
            <BuildPiece 
                x={piece.x} 
                y={piece.y}  
                cols="8" 
                rows="8" />
        }
        {
            err && <span><Error />{err}</span>
        }
        </span>
    )
}

export default PuzzleTable