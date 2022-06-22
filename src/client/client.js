import axios from 'axios'
import { clientConfig } from './config'

const client = null

export class Client {
    constructor (){
        const client = axios.create({
            baseURL: clientConfig.coreBankingUrl,
            timeout: clientConfig.timeOut,
            
        })
        this.client = client
    }

    getCustomerInfo(customerID) {
        
    }

    async getAllCustomer() {
        console.log("Im invoked!")
        let listCustomer = null
        await this.client.get("query", {
            params: {
                topic: "users"
            }
        }).then(function(response) {
            if (response.status != 200) {
                throw new Error(response.data.details.message)
            } else {
                listCustomer = response.data.details.listcustomers
                // return response.data.details.listcustomers
            }
        }).catch(function(error) {
            throw error
        })
        return listCustomer
    }

    getSavingsAccountInfo(savingsAccountID) {

    }

    async getAllSavingsAccount() {
        let listSavingsAccount = null
        await this.client.get("query", {
            params: {
                topic: "savingsaccounts"
            }
        }).then(function(response) {
            if (response.status != 200) {
                throw new Error(response.data.details.message)
            } else {
                listSavingsAccount = response.data.details.savingsaccounts
            }
        }).catch(function(error) {
            throw error
        })
        return listSavingsAccount
    }    
}