import collectionTransactionAddr from "./create_collection.cdc";
import * as fcl from "@onflow/fcl"

let collectionTx = ""

export default async function CreateCollection(whileWaiting) {
    if (!collectionTx) {
        collectionTx = await (await fetch(collectionTransactionAddr)).text()
    }
    try {
        const txId = await fcl.mutate({
        cadence: collectionTx,
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        limit: 50
        })
        if (whileWaiting) {
            whileWaiting()
        }
        return txId
    } catch (error) {
        console.error(error)
    }
}
  