import FuzzlePieceV2 from 0xFuzzlePieceV2
import NonFungibleToken from 0xNonFungibleToken

// This scripts returns the number of FuzzlePieces currently in existence.
pub fun main(address: Address, ids: [UInt64]): [&AnyResource{FuzzlePieceV2.FuzzlePiecePublic}] {   
    let account = getAccount(address) 
    let collection = account.getCapability(FuzzlePieceV2.CollectionPublicPath)!.borrow<&{FuzzlePieceV2.FuzzlePieceCollectionPublic}>()!
    let publicPieceInfoArray: [&AnyResource{FuzzlePieceV2.FuzzlePiecePublic}] = []
    for id in ids {
        publicPieceInfoArray.append(collection.borrowFuzzlePiece(id: id)!)
    }

    return publicPieceInfoArray
}