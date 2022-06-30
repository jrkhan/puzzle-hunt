import FuzzlePieceV2 from 0xFuzzlePieceV2
import NonFungibleToken from 0xNonFungibleToken


// This scripts returns true if the user has a collection at the expected path
pub fun main(address: Address): Bool {   
    let account = getAccount(address) 
    let capability = account.getCapability<&{NonFungibleToken.CollectionPublic}>(FuzzlePieceV2.CollectionPublicPath) 
    return capability.borrow() != nil
}