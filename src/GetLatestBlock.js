import React, {useState} from 'react'
import * as fcl from '@onflow/fcl'
import Card from '@mui/material/Card';
import ReactHighlight from 'react-highlight';
import { Button } from '@mui/material';

const GetLatestBlock = () => {
    const [data, setData] = useState(null)

    const runGetLatestBlock = async (e) => {
        e.preventDefault()

        const response = await fcl.send([
            fcl.getBlock(),
        ])

        setData(await fcl.decode(response));
    }

    return (
        <Card>
            <Button color='primary' onClick={runGetLatestBlock}>
                Get Latest Block
            </Button>
            {data  && <ReactHighlight>{JSON.stringify(data, null, 2)}</ReactHighlight>}
        </Card>
    )
}



export default GetLatestBlock
