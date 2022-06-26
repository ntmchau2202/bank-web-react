import { FaReceipt } from "react-icons/fa"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import { Link, Outlet } from 'react-router-dom';
import './../styles/tables.css'
import { Client } from "../client/client";
import { useState, useEffect } from "react";

export var listAllReceipt = []

const Receipts = () => {
    const parseReceiptsList = (savingsAccountList) => {
        let receiptList = []
        savingsAccountList.forEach(savingsAccount => {
            console.log("Consider an object:", savingsAccount)
            if ('open_ipfs_receipt_hash' in savingsAccount) {
                var receipt = {}
                receipt['type'] = 'create'
                receipt['hash'] = savingsAccount.creation_confirmed
                receipt['receipt_hash'] = savingsAccount.open_ipfs_receipt_hash
                receipt['time_created'] = savingsAccount.open_time
                receipt['savingsaccount_id'] = savingsAccount.savingsaccount_id
                receiptList.push(receipt)
            }

            if ('settle_ipfs_receipt_hash' in  savingsAccount) {
                var receipt = {}
                receipt['type'] = 'settle'
                receipt['hash'] = savingsAccount.settle_confirmed
                receipt['receipt_hash'] = savingsAccount.settle_ipfs_receipt_hash
                receipt['time_created'] = savingsAccount.settle_time
                receipt['savingsaccount_id'] = savingsAccount.savingsaccount_id
                receiptList.push(receipt)
            }
        })
        return receiptList
    }

    let [list, setListReceipt] = useState([])
    useEffect(() => {
        const client = new Client()
        client.getAllSavingsAccount().then(result => {
            // parsing receipts
            let receiptList = parseReceiptsList(result)
            setListReceipt(receiptList)
        }).catch(err => (console.log(err)))
    }, [])
    listAllReceipt = []
    listAllReceipt = listAllReceipt.concat(list)
    console.log("Here we have our receipt list:", listAllReceipt)
    return (
        <main>
            <header>
                <h1> <FaReceipt color="#0047ab"/> Receipt</h1>
                <p>Get all receipt stored on IPFS and decode them</p>
            </header>
            <div>
                {__tableReceipt()}
                {<Outlet/>}
            </div>
        </main>
    )
}

const __tableReceipt = () => {
    // fetch data
    // we will have some test here first
    return (
        <Table>
            <Thead>
                <Tr>
                <Th key="receipt-hash">Receipt hash</Th>
                <Th key="receipt-creation-time">Creation time</Th>
                <Th key="receipt-type">Transaction</Th>
                <Th key="receipt-owner-account">Savings account ID</Th>
                </Tr>
            </Thead>
            <Tbody>
                {__render(listAllReceipt)}
            </Tbody>
        </Table>
      );
}

function __render(receiptObject) {
    var result = []
    receiptObject.forEach(element => {
        let row =  
        <Tr key={element.receipt_hash}>
            <Td>
                {<Link to={`${element.receipt_hash}`}>{element.receipt_hash}</Link>}
            </Td>
            <Td>{element.time_created}</Td>
            <Td>{element.type === "create" ? "CREATE" : element.transaction === "update" ? "UPDATE" : "SETTLE"}</Td>
            <Td>{<Link to={`/savings/${element.savingsaccount_id}`}> {element.savingsaccount_id}</Link> }</Td>
        </Tr>
      result.push(row)
    });
    return result
}

export default Receipts
