import {Html5Qrcode} from "html5-qrcode"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Scanner() {
    let [cameraId, setCameraId] = useState()
    let nav = useNavigate()
    Html5Qrcode.getCameras().then(devices => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
            devices.forEach(({id: id, label: label}) => {
                if (label == "environment") {
                    setCameraId(id)
                    return
                }
            })
            setCameraId(devices[0].id)
          // .. use this to start scanning.
        }
      }).catch(err => {
        // handle err
      });

    useEffect(() => {
        if (!cameraId) {
            return
        }
        const html5QrCode = new Html5Qrcode("reader");
        html5QrCode.start(
        cameraId, 
        {
            fps: 10,    // Optional, frame per seconds for qr code scanning
            //qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
        },
        (decodedText, decodedResult) => {
            if (decodedText.startsWith("https://puzzlealley.com")) {
                let path = decodedText.replace("https://puzzlealley.com", "")
                nav(path, {replace: true})
            }
        },
        (errorMessage) => {
            // parse error, ignore it.
        })
        .catch((err) => {
        // Start failed, handle it.
        });
    }, [cameraId])
   

    return <div id="reader" width="600px"></div>
}
