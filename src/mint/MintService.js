
import {signMessage} from '../functions/ConfirmMessage'

async function GetMint(id) {

    let res = await fetch('https://redirect-ijlbsclomq-uc.a.run.app', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({guid: id})
    })
    return JSON.parse(await res.text()) 
}

async function DoMint(id) {
    // build a request that should trigger minting
    let signed = await signMessage(id)
    let res = await fetch(process.env.REACT_APP_MINT_ENDPOINT, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signed)
    })

    return res.text()
}

export default GetMint
export {DoMint}