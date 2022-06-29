// testing out the initial cloud runction

import * as fcl from "@onflow/fcl"
import { Buffer } from 'buffer';

const url = 'https://mint-fuzzle-piece-on-demand-ijlbsclomq-uc.a.run.app/'

async function signMessage(message) {
    let msg = Buffer.from(message).toString("hex")
    let res = await fcl.currentUser.signUserMessage(msg)
    let firstRes = res[0]
    let bdy = {
        signedMessage: {
            address: firstRes.addr,
            message: message,
            signatures: [firstRes.signature],
            keyIndices: [firstRes.keyId]
        }
    }
    return bdy
}

async function signIt(message) {

    let bdy = await signMessage(message)
    //fcl.AppUtils.verifyUserSignatures
    let verifyResponse = await fetch('https://mint-fuzzle-piece-on-demand-ijlbsclomq-uc.a.run.app/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bdy)
    })

    return await verifyResponse.text()
}

export {signIt, signMessage}