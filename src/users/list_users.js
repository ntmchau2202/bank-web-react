import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { FaCheckCircle, FaMinusCircle } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa'

import { Link, Outlet } from 'react-router-dom';
import './../styles/tables.css'
import { Client } from '../client/client';
import { useEffect, useState } from 'react';
// import { listCustomer } from '../data/data';

export var listCustomer = []

const Users = () => {
    let [list, setListCustomer] = useState([])
    useEffect(() => {
        const client = new Client()
        client.getAllCustomer().then(result => {
            setListCustomer(result)
        }).catch(err => (console.log(err)))
    }, [])
    listCustomer = []
    listCustomer = listCustomer.concat(list)
    console.log("Here we have our customer list:", listCustomer)
    return (
        <main>
            <header>
                <h1> <FaUser color="#0047ab"/> Users</h1>
                <p>List of all users of the bank</p>
            </header>

            <div>
                {__tableUsers(listCustomer)}
                {<Outlet/>}
            </div>
        </main>
    )
}

const __tableUsers = (listCustomer) => {
    // fetch data
    // we will have some test here first
    return (
        <Table>
            <Thead>
                <Tr>
                <Th key="customer_id" >CustomerID</Th>
                <Th key="customer_name">Customer Name</Th>
                <Th key="active_status">Active status</Th>
                <Th key="action">Quick action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {__render(listCustomer)}
            </Tbody>
        </Table>
      );
}

function __render(customerObject) {
    console.log("Rendering in customer")
    var result = []
    console.log(customerObject)
    customerObject.forEach(element => {
        console.log("here we have an element", element.customer_id, element.active_status)
        let row =  
        <Tr key={element.customer_id}>
            <Td>{element.customer_id}</Td>
            <Td>
                {<Link to={`${element.customer_id}`}>{element.customer_name}</Link>}
            </Td>
            <Td>{element.active_status === true ? <FaCheckCircle color='green'/> : <FaMinusCircle color='red'/>}</Td>
            <Td><button class='button'>{element.active_status === true ? 'Deactivate account' : 'Activate account'}</button></Td>
        </Tr>
      result.push(row)
    });
    return result
}

export const __sampleCustomerObject = [
    {
        customer_name: "Customer 1",
        customer_id: "1",
        active_status: 0,
        savings_accounts: ["1234", "2468"],
    },
    {
        customer_name: "Customer 2",
        customer_id: "2",
        active_status: 1,
        savings_accounts: ["2345", "3579"],
    },
]

export const __sampleSavingsAccount = [
    {
        savings_id: "1234",
        amount: "100000",
        product_type: "online",
        savings_period: "6",
        interest_amount: "6.8",
        savings_status: "1",
    },
    {
        savings_id: "2345",
        amount: "100000",
        product_type: "online",
        savings_period: "6",
        interest_amount: "6.8",
        savings_status: "2",
    },
    {
        savings_id: "2468",
        amount: "100000",
        product_type: "online",
        savings_period: "6",
        interest_amount: "6.8",
        savings_status: "3",
    },
    {
        savings_id: "3579",
        amount: "100000",
        product_type: "normal",
        savings_period: "6",
        interest_amount: "6.8",
        savings_status: "4",
    }
]

export default Users