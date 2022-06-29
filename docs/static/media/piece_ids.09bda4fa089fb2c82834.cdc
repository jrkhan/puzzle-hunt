import FuzzlePieceV2 from 0xFuzzlePieceV2
import NonFungibleToken from 0xNonFungibleToken

// This scripts returns the pieces for the supplied address
pub fun main(address: Address): [UInt64] {   
    let account = getAccount(address) 
    let collection = account.getCapability(FuzzlePieceV2.CollectionPublicPath)!.borrow<&{NonFungibleToken.CollectionPublic}>()!
    return collection.getIDs()
}