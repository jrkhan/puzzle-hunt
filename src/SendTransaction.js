import React, {useState} from "react"
import * as fcl from "@onflow/fcl"
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import {Code} from "./ReactHighlightShim";
import {signIt} from './functions/ConfirmMessage'

const bootstrapCollection = `\
import NonFungibleToken from 0xNonFungibleToken
import FuzzlePieceV2 from 0xFuzzlePieceV2
import MetadataViews from 0xMetadataViews

transaction {
    prepare(signer: AuthAccount) {
        // if the account doesn't already have a collection
        if signer.borrow<&FuzzlePieceV2.Collection>(from: FuzzlePieceV2.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- FuzzlePieceV2.createEmptyCollection()
            
            // save it to the account
            signer.save(<-collection, to: FuzzlePieceV2.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&FuzzlePieceV2.Collection{NonFungibleToken.CollectionPublic, FuzzlePieceV2.FuzzlePieceCollectionPublic, MetadataViews.ResolverCollection}>(FuzzlePieceV2.CollectionPublicPath, target: FuzzlePieceV2.CollectionStoragePath)
        }
    }
}
`

const simpleQuery = `\
pub fun main(): String {
    log("hello!")
    return "world"
}
`

const SendTransaction = () => {
  const [status, setStatus] = useState("Not started") 

  const sendTransaction = async (event) => {
    event.preventDefault()
    
    setStatus( "Resolving...")
    try {
      const txId = await fcl.mutate({
        cadence: bootstrapCollection,
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        limit: 50
      })
      setStatus(`Transaction (${txId}) sent, waiting for confirmation`)
      const res = await fcl.tx(txId).onceSealed();

      setStatus(`Transaction (${txId}) is Sealed`)

      console.log(res)
    } catch (error) {
      console.error(error)
      setStatus("Transaction failed")
    }
  }

  return (
    <Card>
      <CardHeader title="Send transaction" />

      <Code>{bootstrapCollection}</Code>

      <Button onClick={sendTransaction}>
        Bootstrap Collection
      </Button>

      <Code>{"Status: " + status}</Code>
    </Card>
  )
}

const SendQuery = () => {
    const [response, setResponse] = useState("Not started")
  
    const sendQuery = async (event) => {
      event.preventDefault()
      
      setResponse("Resolving...")

      
      try {
        
        const res = await fcl.query({
            cadence: simpleQuery
        })
        
        setResponse(res)
          
      } catch (error) {
        console.error(error)
        setResponse("Transaction failed")
      }
    }
  
    return (
      <Card>
        <CardHeader title="Example Query"></CardHeader>
  
        <Code>{simpleQuery}</Code>
  
        <Button onClick={sendQuery}>
          Send Query
        </Button>
  
        <Code>{response}</Code>
      </Card>
    )
  }

const SignMessage = () => {
  let [message, setMessage] = useState("")
  let [result, setResult] = useState() 

  const sendMessage = async (event) => {
    event.preventDefault()
    let res = await signIt(message)
    setResult(res)
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }

  return (
    <Card>
      <CardHeader title="Send Message" />
      
      <TextField value={message} onChange={handleMessageChange} />
      <Button onClick={sendMessage}>
        Sign Message
      </Button>
      Result:
      <Code>{result}</Code>
    </Card>
  )
}

export default SendTransaction
export {SendQuery, SendTransaction, SignMessage}