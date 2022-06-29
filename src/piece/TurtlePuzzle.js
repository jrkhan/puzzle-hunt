import styled from "styled-components";


const TurtlePiece = ({puzzleId, pieceId}) => {
    let offset = 0
    const vals = Puzzles[puzzleId-1][pieceId - 1 + offset]
    let imgIndex = parseInt(pieceId) + offset
    let src = imageRoot + "/piece-" + imgIndex + ".png"
    let left = vals[0]
    let top = vals[1]
    let translate = "translate(" + left + " " + top + ")"
    const TP = styled.image`
        background-image: url(${src});
        display: inline;
        left: ${vals[0]}px;
        top: ${vals[1]}px;
        width:${vals[2]}px;
        height:${vals[3]}px;
        position: relative;
        filter: drop-shadow(16px 16px 10px black)
    `
    return <TP href={src} transform={translate}></TP>
}

const SinglePiece = styled.div`
background-image: url(${props => imageRoot + "/piece-" + props.imgIndex + ".png"});
position: relative;
width: ${props => props.width}px;
height: ${props => props.height}px;
filter: drop-shadow(16px 16px 10px black)
`

const TurtlePieceSingle = ({puzzleId, pieceId}) => {
    let offset = 0
    const vals = Puzzles[puzzleId-1][pieceId - 1 + offset]
    let imgIndex = parseInt(pieceId) + offset

    return <SinglePiece imgIndex={imgIndex} width={vals[2]} height={vals[3]}></SinglePiece>
}

const imageRoot = "https://ipfs.io/ipfs/bafybeido6xzdcaua7lduxu45uews3du6qljtqn63wojbvgqkbiebo37p4u/"

const Puzzles = [[
    [0,0,658,678],
    [344,0,809,682],
    [947,0,555,635],
    [1264,0,536,571],
    [0,519,509,681],
    [306,575,654,625],
    [712,386,842,814],
    [1103,387,697,813],
]]

export {Puzzles, TurtlePiece, TurtlePieceSingle}