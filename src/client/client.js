import axios from 'axios'
import { clientConfig } from './config'

const client = null

export class Client {
    constructor (){
        const client = axios.create({
            baseURL: clientConfig.coreBankingUrl,
            timeout: clientConfig.timeOut,
            
        })
        const middlewareClient = axios.create({
            baseURL: clientConfig.middlewareUrl,
            timeout: clientConfig.timeOut,
            
        })
        this.client = client
        this.middlewareClient = middlewareClient
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

    async decodeReceipt(body) {
        console.log("Have we got here?", body)
        let result = null

        await this.middlewareClient.post("utils/decryptReceipt", {
            command: "DECRYPT_RECEIPT",
            details: {
                receipt_body: body
            }
        }).then(function(response) {
            if (response.status != 200) {
                throw new Error(response.data.details.message)
            } else {
                result = response.data.details.decoded_receipt
            }
        }).catch(function(error) {
            throw error
        })
        return result
    }    
}