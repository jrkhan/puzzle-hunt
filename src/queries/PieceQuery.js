import pieceQuery from "./piece_metadata.cdc";
import pieceQueryAll from "./piece_metadata_all.cdc";
import * as fcl from "@onflow/fcl"

let pq = ""
async function PieceData(address, id) {
    if (!pq) {
        pq = await (await fetch(pieceQuery)).text()
    }
    if (!address) {
        let user = await fcl.currentUser.snapshot()
        address = user.addr
    }
    //console.log(address)
    //console.log(id)
    const res = await fcl.query({
        cadence: pq,
        args: (arg, t) => [
            arg(address, t.Address),
            arg(id.toString(), t.UInt64)
          ],
    })
    return res
}

let pqAll = ""
async function PieceDataAll(address, ids) {
    if (!pqAll) {
        pqAll = await (await fetch(pieceQueryAll)).text()
    }
    if (!address) {
        let user = await fcl.currentUser.snapshot()
        address = user.addr
    }

    const res = await fcl.query({
        cadence: pqAll,
        args: (arg, t) => [
            arg(address, t.Address),
            arg(ids, t.Array(t.UInt64))
          ],
    })
    return res
}

export {PieceData, PieceDataAll}