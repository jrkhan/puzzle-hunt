import React, {useState, useEffect, useRef} from "react"
import { ImageFilter } from "@babylonjs/controls/dist/src/imageFilter";
import { Engine, EffectWrapper, Texture, AssetsManager, Scene } from "@babylonjs/core";


const swizzleShader = `
// Samplers
varying vec2 vUV;
uniform sampler2D textureSampler;

void main(void) 
{
    gl_FragColor = texture2D(textureSampler, vUV);

    // Swizzle channels
    float r = gl_FragColor.r;
    gl_FragColor.r = gl_FragColor.b;
    gl_FragColor.b = r;
}
`

const SwizzleImage = ({src}) => {
    const filterCanvas = useRef(null)
    let [imgLoadState, setImgLoadState] = useState()
    let [width, setWidth] = useState(512)
    let [height, setHeight] = useState(512)

    useEffect(() => {
        const canvas = filterCanvas.current
        const imageFilter = new ImageFilter(canvas);
        const engine = new Engine(canvas)
        engine.loadingUIBackgroundColor = "white";
        const scene = new Scene(engine)
        const assetsManager = new AssetsManager(scene);
        const imageReady = assetsManager.addImageTask("load image", src)
        setImgLoadState(imageReady.taskState)
        
        const customPP = new EffectWrapper({
            name: "Custom",
            engine: engine,
            fragmentShader: swizzleShader,
            samplerNames: ["textureSampler"]
        })
        
        imageReady.onSuccess = task => {
            setImgLoadState(imageReady.taskState)
            setWidth(task.image.width)
            setHeight(task.image.height)
        }
        assetsManager.onFinish = () => {
            let img = imageReady.image
            const tex = new Texture(img.src, engine)
            engine.runRenderLoop(() =>{
                imageFilter.render(tex, customPP)
            })
        }
        assetsManager.load();
    }, []);

    return (
        <span>
            <canvas width={width} height={height} ref={filterCanvas}></canvas>
        </span>
    )
}

const TestReactImage = () => {
    return (
        <SwizzleImage src={"logo512.png"}></SwizzleImage>
    )
}

export default SwizzleImage
export {TestReactImage}