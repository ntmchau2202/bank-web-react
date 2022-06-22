import { __sampleSavingsAccount } from "../users/list_users"
import { Table, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { useParams } from "react-router"

import { currentSelectedCutsomerSavingsAccount, allSavingsAccount } from "./list_savings"
import { useEffect, useState } from "react"
import { Client } from "../client/client"

const Savings = () => {
    let params = useParams()

    let [account, setSavingsAccount] = useState(null)

    useEffect(() => {
        __findSavingsAccount(params.id).then(result => {
            if (result !== null) {
                setSavingsAccount(result)
            }
        })
    }, [])

    if (account != null) {
        return (
            __renderSavingsAccount(account)
        )
    } else {
        return (
            <div>
                <header>
                    <h1>Savings account not found :(</h1>
                </header>
            </div>
        )
    }
}

async function __findSavingsAccount(savingsAccountID) {
    let targetAccount = null
    const iterate = (id, list) => {
        list.forEach(account => {
            if(account.savingsaccount_id === id) {
                targetAccount = account
                return 
            }
        })
        return targetAccount
    }

    if (allSavingsAccount.length == 0) {
        const client = new Client()
        targetAccount = await client.getAllSavingsAccount().then(result => {
            targetAccount = iterate(savingsAccountID, result)
            console.log("Here:", targetAccount)
            return targetAccount
        }).catch(err => console.log(err))
    } else {
        targetAccount = iterate(savingsAccountID, allSavingsAccount)
    }
    console.log("Finally?", targetAccount)
    return targetAccount
}

function __renderSavingsAccount(savingsAccount){
    return (
        <main>
            <header>
                <h1> Savings account {savingsAccount.savingsaccount_id} information </h1>
            </header>
            <div>
                <Table>
                    <Tbody>
                        <Tr>
                        {/* <Th>Savings account ID</Th>
                        <Th>Savings amount</Th>
                        <Th>Product type</Th>
                        <Th>Savings period</Th>
                        <Th>Interest amount</Th>
                        <Th>Status</Th> */}
                            <Th>Savings account ID</Th>
                            <Td>{savingsAccount.savingsaccount_id}</Td>
                        </Tr>
                        <Tr>
                            <Th>Savings amount</Th>
                            <Td>{savingsAccount.savings_amount}</Td>
                        </Tr>
                        <Tr>
                            <Th>Product type</Th>
                            <Td>{savingsAccount.product_type}</Td>
                        </Tr>
                        <Tr>
                            <Th>Savings period</Th>
                            <Td>{savingsAccount.savings_period}</Td>
                        </Tr>
                        <Tr>
                            <Th>Interest amount</Th>
                            <Td>{savingsAccount.interest_rate}</Td>
                        </Tr>
                        <Tr>
                            <Th>Savings status</Th>
                            <Td>{savingsAccount.confirm_status}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </div>
        </main>
    )
}

export default Savings