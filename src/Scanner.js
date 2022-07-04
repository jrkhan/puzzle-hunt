import {Html5Qrcode} from "html5-qrcode"
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Scanner() {
    let nav = useNavigate()
    let cb = useCallback(function navToDest(dest) {
        nav(dest, {replace: true})
    }, [nav])
    
    
    useEffect(() => {

        let qrCodeSuccessCallback = (decodedText, decodedResult) => {
            if (decodedText.startsWith("https://puzzlealley.com")) {
                let path = decodedText.replace("https://puzzlealley.com", "")
                cb(path)
            }
        };
        const html5QrCode = new Html5Qrcode("reader");
        html5QrCode.start({ facingMode: "environment" }, {fps: 10}, qrCodeSuccessCallback);
    }, [cb])
   

    return <div id="reader" width="100%"></div>
}
