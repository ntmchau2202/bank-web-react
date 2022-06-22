import { FaReceipt } from "react-icons/fa"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import { Link, Outlet } from 'react-router-dom';
import './../styles/tables.css'

const Receipts = () => {
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
                <Th>Receipt hash</Th>
                <Th>Creation time</Th>
                <Th>Transaction</Th>
                <Th>Account</Th>
                </Tr>
            </Thead>
            <Tbody>
                {__render(__sampleReceiptObject)}
            </Tbody>
        </Table>
      );
}

function __render(receiptObject) {
    var result = []
    receiptObject.forEach(element => {
        let row =  
        <Tr>
            <Td>
                {<Link to={`${element.receipt_hash}`}>{element.receipt_hash}</Link>}
            </Td>
            <Td>{element.day_created}</Td>
            <Td>{element.transaction === "c" ? "CREATE" : element.transaction === "u" ? "UPDATE" : "SETTLE"}</Td>
            <Td>{<Link to={`savings/${element.savings_account}`}> {element.savings_account}</Link> }</Td>
        </Tr>
      result.push(row)
    });
    return result
}

export const __sampleReceiptObject = [
    {
        receipt_hash: "abcdef",
        day_created: "01/02/2000",
        transaction: "c",
        savings_account: "1234",
    },
    {
        receipt_hash: "123456",
        day_created: "01/03/2000",
        transaction: "s",
        savings_account: "2468"
    },
]

export default Receipts
