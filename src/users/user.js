import { useParams } from "react-router"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { __sampleCustomerObject, __sampleSavingsAccount } from "./list_users"
import { __renderSavingsAccount, __tableSavingsAccount } from "../savings/list_savings";
import { FaCheckCircle, FaMinusCircle } from 'react-icons/fa';

import "../styles/tables.css"
import { listCustomer } from "./list_users";
import { Client } from "../client/client";
import { useEffect, useRef, useState } from "react";
const Customer = () => {
    let params = useParams()
    let [customer, setCustomer] = useState(null)

    useEffect(() => {
        __findCustomer(params.id).then(result => {
            if (result !== null) {
                setCustomer(result)
            }
        })
    }, [])

    if (customer != null) {
        return (
            __renderCustomer(customer)
        )
    } else {
        return (
            <div>
                <header>
                    <h1>Customer not found :(</h1>
                </header>
            </div>
        )
    }
}

async function __findCustomer(id) {
    let targetCustomer = null
    const iterate = (id, list) => {
        list.forEach(customer => {
            if (customer.customer_id === id) {
                targetCustomer = customer
                return
            }  
        })
        return targetCustomer
    }

    if (listCustomer.length === 0) {
        const client = new Client() 
        targetCustomer = await client.getAllCustomer().then(result => {
            targetCustomer = iterate(id, result)
            return targetCustomer
        }).catch(err => console.log(err))
    } else {
        targetCustomer = iterate(id, listCustomer)
    }
    return targetCustomer
}

function __renderCustomer(customer) {
    // get all savings account of customers
    let listSavingsAccountOfCustomer = []
    customer.bank_accounts.forEach(bankAccount => {
        console.log(bankAccount)
        bankAccount.savings_accounts.forEach(savingsAccount => {
            listSavingsAccountOfCustomer.push(savingsAccount)
        })
    })
    console.log("Before we going on:", listSavingsAccountOfCustomer)
    return (
        <main>
            <header>
                <h1> Customer {customer.customer_id} information </h1>
                <p>
                    <ul>
                        <li> Customer name: {customer.customer_name} </li>
                        <li> Customer id: {customer.customer_id} </li>
                        <li> Active status: {customer.active_status === true ? 'Active' : 'Deactivated' }
                        {customer.active_status === true ? <FaCheckCircle color="green"/> : <FaMinusCircle color="red"/>} </li>
                    </ul>
                </p>
            </header>
            <div class='button-action-row'>
                <button>Edit</button>
                <button>New savings account</button>
                <button>{customer.active_status === true ? 'Deactivate account' : 'Activate account'}</button>
            </div>
            <div>
                {__tableSavingsAccount(listSavingsAccountOfCustomer)}
            </div>
        </main>
    )
}

export default Customer