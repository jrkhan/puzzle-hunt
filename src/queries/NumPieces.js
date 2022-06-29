import collectionQuery from "./has_collection.cdc";
import * as fcl from "@onflow/fcl"

let cq = ""
async function HasCollection(address) {
    if (!cq) {
        cq = await (await fetch(collectionQuery)).text()
    }
    if (!address) {
        let user = await fcl.currentUser.snapshot()
        address = user.addr
    }
    
    const res = await fcl.query({
        cadence: cq,
        args: (arg, t) => [
            arg(address, t.Address),
          ],
    })
    return res
}

export {HasCollection}