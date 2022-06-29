import collectionTransaction from "./create_collection.cdc";

export default function CreateCollection() {
    try {
        const txId = await fcl.mutate({
        cadence: collectionTransaction,
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        limit: 50
        })
        const res = await fcl.tx(txId).onceSealed();
        console.log(res)
        return res
    } catch (error) {
        console.error(error)
    }
}
  