import { useEffect, useState } from "react"
import { Table, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { Client } from "../client/client"
import { useParams } from "react-router"

const ipfsPublicNode = "https://gateway.moralisipfs.com/ipfs/"

const Receipt = () => {
    let params = useParams()
    let receiptID = params.id 
    let [receipt, setReceipt] = useState("")
    let [receiptBody, setReceiptBody] = useState("")

    useEffect(() => {
        // download from IPFS
        __fetchFromIPFS(receiptID).then(result => {
            setReceipt(result)
            const client = new Client()
            client.decodeReceipt(result.receipt).then(decodeResult => {
                setReceiptBody(decodeResult)
            })
        })
    }, [])

    console.log("responseBody:", receiptBody)
    // show to the screen
    if (receiptBody.length != 0) {
        return __renderReceipt(receiptID, receipt, receiptBody)
    } else {
        return __renderReceipt(receiptID, receipt, "error decoding receipt")
    }

}

async function __fetchFromIPFS(ipfsHash) {
    const url = ipfsPublicNode + ipfsHash
    console.log("url:", url)
    const response = await fetch(url).then(result => {return result.json()})
    console.log("response:", response)
    return response
}

function __renderReceipt(receiptHash, originalReceipt, decodedReceipt) {
    let displayString = ""
    console.log("received type:", typeof(decodedReceipt))
    if (typeof(decodedReceipt) == "object") {
        displayString = decodedReceipt.message
        console.log("display string:", displayString)
    } else {
        displayString = decodedReceipt
    }
    
    return (
        <main>
            <header>
            <h1> Receipt information </h1>
            </header>
            <div>
                <Table>
                    <Tbody>
                        <Tr>
                            <Th>Receipt hash</Th>
                            <Td>{receiptHash}</Td>
                        </Tr>
                        <Tr>
                            <Th>Customer signature</Th>
                            <Td>{originalReceipt.customer_signature}</Td>
                        </Tr>
                        <Tr>
                            <Th>Details</Th>
                            <Td><pr>{displayString}</pr></Td>
                        </Tr>
                        <Tr>
                            <Th>Receipt link</Th>
                            <Td>{ipfsPublicNode + receiptHash}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </div>
        </main>
    )
}

export default Receipt