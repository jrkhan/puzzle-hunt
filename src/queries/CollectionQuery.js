import hasCollectionQueryAddress from "./has_collection.cdc";
import pieceIdsQueryAddress from "./piece_ids.cdc";
import * as fcl from "@onflow/fcl"

let hasCollectionQuery = ""
let pieceIdsQuery = ""
async function CollectionQuery(q, address) {
    if (!address) {
        let user = await fcl.currentUser.snapshot()
        address = user.addr
    }
    const res = await fcl.query({
        cadence: q,
        args: (arg, t) => [
            arg(address, t.Address),
          ],
    })
    return res
}

async function HasCollection(address) { 
    if (!hasCollectionQuery) {
        hasCollectionQuery = await (await fetch(hasCollectionQueryAddress)).text()
    }
    return CollectionQuery(hasCollectionQuery, address)
}

async function PieceIds(address) { 
    if (!pieceIdsQuery) {
        pieceIdsQuery = await (await fetch(pieceIdsQueryAddress)).text()
    }
    return CollectionQuery(pieceIdsQuery, address)
}

export {HasCollection, PieceIds}