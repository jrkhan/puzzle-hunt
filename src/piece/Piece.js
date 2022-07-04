import {PieceData} from '../queries/PieceQuery'
import { useEffect, useState } from "react";
import { TurtlePiece, TurtlePieceSingle } from './TurtlePuzzle'
import styled from "styled-components";


const Container = styled.g`
    zoom: 0.25;
`
const SingleContainer = styled.div`
    zoom: .5;
    margin-left: auto;
    margin-right: auto;
`

function Piece(props) {
    let [puzzleId, setPuzzleId] = useState()
    let [pieceId, setPieceId] = useState()
    let addr = props.addr
    let id = props.id
    useEffect(() =>{
        PieceData(addr, id).then(res => {
            setPuzzleId(res.puzzleId)
            setPieceId(res.pieceId)
        })
    }, [addr, id])
    
    return <Container>
        {puzzleId && <TurtlePiece puzzleId={puzzleId} pieceId={pieceId}></TurtlePiece>}
   </Container>
}

function ContainerSingle({puzzleId, pieceId}) {    
    return  <SingleContainer>
        <TurtlePieceSingle puzzleId={puzzleId} pieceId={pieceId}></TurtlePieceSingle>
        </SingleContainer>
}

export {Piece, ContainerSingle}