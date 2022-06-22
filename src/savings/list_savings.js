import { __sampleSavingsAccount } from "../users/list_users";

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { FaPiggyBank } from 'react-icons/fa';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import './../styles/tables.css'

export var allSavingsAccount = []
export var currentSelectedCutsomerSavingsAccount = []

const SavingsAccounts = () => {
    return (
        <main>
            <header>
                <h1> <FaPiggyBank color="#0047ab"/> Savings accounts</h1>
                <p>List of all savings account created on the bank</p>
            </header>

            <div>
                {__tableAllSavingsAccount(null)}
                {<Outlet/>}
            </div>
        </main>
    )
}

function __tableAllSavingsAccount() {
    return (
        <Table>
            <Thead>
                <Tr>
                <Th>Savings account ID</Th>
                <Th>Savings amount</Th>
                <Th>Product type</Th>
                <Th>Savings period</Th>
                <Th>Interest amount</Th>
                <Th>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                {__renderAllSavingsAccount()}
            </Tbody>
        </Table>
      );
}

export function __tableSavingsAccount(savingsAccount) {
    console.log("What's our component?", savingsAccount)
    currentSelectedCutsomerSavingsAccount = []
    currentSelectedCutsomerSavingsAccount = currentSelectedCutsomerSavingsAccount.concat(savingsAccount)
    return (
        <Table>
            <Thead>
                <Tr>
                <Th>Savings account ID</Th>
                <Th>Savings amount</Th>
                <Th>Product type</Th>
                <Th>Savings period</Th>
                <Th>Interest amount</Th>
                <Th>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                {__renderSavingsAccount(currentSelectedCutsomerSavingsAccount)}
            </Tbody>
        </Table>
      );
}

export function __renderSavingsAccount(listSavingsAccount) {
    let listAccount = []
    listSavingsAccount.forEach(account => {
                let row =  
                    <Tr>
                        <Td>
                            <Link to={`/savings/${account.savingsaccount_id}`}>{account.savingsaccount_id}</Link>
                        </Td>
                        <Td>{account.savings_amount}</Td>
                        <Td>{account.product_type}</Td>
                        <Td>{account.savings_period}</Td>
                        <Td>{account.interest_rate}</Td>
                        <Td>{account.confirm_status}</Td>
                    </Tr>
                listAccount.push(row)
    });
    return listAccount
}

function __renderAllSavingsAccount() {
    let listAccount = []
    __sampleSavingsAccount.forEach(account => {
        let row =  
            <Tr>
                <Td>{<Link to={`/savings/${account.savings_id}`}>{account.savings_id}</Link>}</Td>
                <Td>{account.amount}</Td>
                <Td>{account.product_type}</Td>
                <Td>{account.savings_period}</Td>
                <Td>{account.interest_amount}</Td>
                <Td>{account.savings_status}</Td>
            </Tr>
        listAccount.push(row)
    })
    return listAccount
}

export default SavingsAccounts