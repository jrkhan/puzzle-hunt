
import { Engine, EffectWrapper, Texture, AssetsManager, Scene, Mesh, MeshBuilder, Vector4, StandardMaterial, DirectionalLight, Camera, Vector3, ArcRotateCamera, HemisphericLight, Color4, serializeAsColorCurves, Vector2 } from "@babylonjs/core";
import Container from '@mui/material/Container';
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useTheme } from '@mui/material/styles';
// Styled component named StyledButton
const StyledCanvas = styled.canvas`
  outline: none;
  width: 100%;
  height: 100%;
`;

export default function Render({x, y, cols, rows}) {
    let canvasRef = useRef()
    const theme = useTheme();
    useEffect(()=> {
        let canvas = canvasRef.current
        ToCanvas({
            background: theme.background,
            canvas: canvas,
            x: x,
            y: y, 
            cols: cols,
            rows: rows
        })
    }, [])
    
    return (
        <StyledCanvas ref={canvasRef}></StyledCanvas>
    )
}

function ToCanvas({canvas, background, x, y, cols, rows}) {
    let engine = new Engine(canvas)
    engine.loadingUIBackgroundColor = background
    let scene = new Scene(engine)
    scene.clearColor = new Color4(1, 1, 1, 1)
    const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
    light.intensity = 2;
    const camera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 3, Vector3.Zero());
    camera.attachControl(canvas, true);

    const assetsManager = new AssetsManager(scene);
    const puzTask = assetsManager.addImageTask("puzzle", '../puzzle.png');
   
    assetsManager.onFinish = () => {
        let piece = SinglePiecePlane(puzTask.image, x, y, cols, rows)
        scene.addMesh(piece)
        let now = performance.now()
        let startTime = now
        
        engine.runRenderLoop(() => {
            let now = performance.now()
            const delta = (now-startTime)/1000
            piece.rotation.y = 0 + .25 * Math.sin(delta);
            scene.render()
        })
    }
    assetsManager.load()   
}

function SinglePiecePlane(puzzleImage, x, y, cols, rows) {
    let {size} = buildPosCalc(puzzleImage, cols, rows)
    let totalWidth = puzzleImage.width,
        totalHeight = puzzleImage.height,
        colWidth = totalWidth/cols,
        rowHeight = totalHeight/rows;

        //for now just use a grid 
    let startX = x * colWidth/totalWidth,
        endX = (x + 1) * colWidth/totalWidth,
        startY = y * rowHeight/totalHeight,
        endY = (y + 1) * rowHeight/totalHeight;


    let uvs = new Vector4(
        startX, 
        startY,
        endX,
        endY);

    // image to be included in the scene
    let plane = new MeshBuilder.CreatePlane("piece", 
        {width: size.x, 
        height: size.y,
        backUVs: uvs,
        frontUVs: uvs, 
        sideOrientation: Mesh.DOUBLESIDE})

    var mat = new StandardMaterial("piece-"+x+"-"+y);
    mat.diffuseTexture = new Texture(puzzleImage.src); 
    plane.material = mat
    return plane
}

function buildPosCalc(img, cols, rows) {
    let totalWidth = img.width,
    totalHeight = img.height,
    colWidth = totalWidth/cols,
    rowHeight = totalHeight/rows,
    xMul = colWidth/50,
    yMul = rowHeight/50;
    return {
        size: new Vector2(xMul, yMul),
        posCalc: (x, y) => {
            return new Vector3(
                (x-cols/2) * xMul, 
                (y-rows/2) * yMul, 
            0)
        }
    }
}