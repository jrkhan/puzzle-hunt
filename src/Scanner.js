import { Card } from "@mui/material";
import {Html5Qrcode} from "html5-qrcode"
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Scanner() {
    let nav = useNavigate()
    let cb = useCallback(function navToDest(dest) {
        nav(dest, {replace: true})
    }, [nav])
    
    
    useEffect(() => {

        const html5QrCode = new Html5Qrcode("reader");
        let qrCodeSuccessCallback = (decodedText, decodedResult) => {
            if (decodedText.startsWith("https://puzzlealley.com")) {
                let path = decodedText.replace("https://puzzlealley.com/#", "")
                html5QrCode.stop().then(()=>{
                    cb(path)
                })
            }
        };
        
        html5QrCode.start({ facingMode: "environment" }, {fps: 10}, qrCodeSuccessCallback);
        return () => {
            if (html5QrCode.isScanning) {
                html5QrCode.stop()
            }
        }
    }, [cb])
   

    return <Card><div id="reader" width="100%"></div>
    
    <img alt="cat-qr-hunter" src="https://storage.googleapis.com/flow-puzzle-hunt/see-a-piece.png" />
    </Card>
}
