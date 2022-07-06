import styled from "styled-components";


const InPuzzlePiece = styled.image`
    display: inline;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    width:${props => props.width}px;
    height:${props => props.height}px;
    position: relative;
    filter: drop-shadow(4px 4px 3px grey)
`

const TurtlePiece = ({puzzleId, pieceId}) => {
    let offset = 0
    const vals = Puzzles[puzzleId-1][pieceId - 1 + offset]
    let imgIndex = parseInt(pieceId) + offset
    let bgimage = imageRoot[puzzleId-1] + "piece-" + imgIndex + ".png"
    let fallbackSrc = backupRoot[puzzleId-1] + "piece-" + imgIndex + ".png"
    let left = vals[0]
    let top = vals[1]
    let translate = "translate(" + left + " " + top + ")"
    const handleImgErr = (e) => {
        e.preventDefault()
        e.target.setAttribute('href', fallbackSrc); 
    }

    return <InPuzzlePiece transform={translate}
        href={bgimage}
        left={vals[0]}
        onError={handleImgErr}
        top={vals[1]}
        width={vals[2]}
        height={vals[3]}
        ></InPuzzlePiece>
}

const SinglePiece = styled.div`
background-image: url(${props => imageRoot[props.puzzleIndex] + "piece-" + props.imgIndex + ".png"}), url(${props => backupRoot[props.puzzleIndex] + "piece-" + props.imgIndex + ".png"});
position: relative;
width: ${props => props.width}px;
height: ${props => props.height}px;
filter: drop-shadow(6px 6px 4px grey)
`

const TurtlePieceSingle = ({puzzleId, pieceId}) => {
    let offset = 0
    const vals = Puzzles[puzzleId-1][pieceId - 1 + offset]
    let imgIndex = parseInt(pieceId) + offset

    return <SinglePiece imgIndex={imgIndex} puzzleIndex={puzzleId-1} width={vals[2]} height={vals[3]}></SinglePiece>
}

const imageRoot = [
    "https://bafybeido6xzdcaua7lduxu45uews3du6qljtqn63wojbvgqkbiebo37p4u.ipfs.nftstorage.link/",
    "https://bafybeibqtypgzsxlsh32qjqslsb6yfkijquwtqyae4pbxdo7vhqzdcnrbm.ipfs.nftstorage.link/",
]

const backupRoot = [
    "https://ipfs.io/ipfs/bafybeido6xzdcaua7lduxu45uews3du6qljtqn63wojbvgqkbiebo37p4u/",
    "https://ipfs.io/ipfs/bafybeibqtypgzsxlsh32qjqslsb6yfkijquwtqyae4pbxdo7vhqzdcnrbm/",
]

const Puzzles = [[
    [0,0,658,678],
    [344,0,809,682],
    [947,0,555,635],
    [1264,0,536,571],
    [0,519,509,681],
    [306,575,654,625],
    [712,386,842,814],
    [1103,387,697,813],
],
[
    [0,0,487,489],
    [418,0,533,544],
    [862,0,478,516],
    [1254,0,546,500],
    [0,333,468,590],
    [468,415,436,499],
    [793, 360, 550, 630],
    [1197,382,603,623],
    [0, 813, 472, 654],
    [330, 790, 695, 620],
    [786,908,575,545],
    [1239,882,561,720],
    [0, 1366, 500, 623],
    [421, 1328, 489, 661],
    [835, 1381, 506, 608],
    [1217, 1475, 583, 514],
]]

export {Puzzles, TurtlePiece, TurtlePieceSingle}