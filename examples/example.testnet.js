import SantimpaySdk from "../lib/index.js";

// production
const PRIVATE_KEY_IN_PEM = `-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEILJLgiQwO+r8DTojo/pqlfQezZd3sNeMAm3Vmvghky2toAoGCCqGSM49\nAwEHoUQDQgAER/WzlBX/lKVtGwM0re/M8EbQi0pC83/4QMn2ctCSVxrV6QRfqB+p\neqFCR9FAkc5O37c+CGEFlrMNtxy1YXv+BA==\n-----END EC PRIVATE KEY-----\n`

const GATEWAY_MERCHANT_ID = "9e2dab64-e2bb-4837-9b85-d855dd878d2b"

const client = new SantimpaySdk(GATEWAY_MERCHANT_ID, PRIVATE_KEY_IN_PEM, true);

// client side pages to redirect user to after payment is completed/failed
const successRedirectUrl = "https://santimpay.com";
const failureRedirectUrl = "https://santimpay.com";

// backend url to receive a status update (webhook)
// const notifyUrl = "https://santimpay.com";
const notifyUrl = "https://webhooktest.requestcatcher.com/test";

// custom ID used by merchant to identify the payment
const id = Math.floor(Math.random() * 1000000000).toString();

client.generatePaymentUrl(id, 1, "Payment for a coffee", successRedirectUrl, failureRedirectUrl, notifyUrl, "+251947407163").then(url => {
    // redirect user to url to process payment
    console.log("Payment URL: ", url);
    
    setTimeout(() => {

        console.log("\n\n*********************************")
        console.log("checking for transaction...")
        
        client.checkTransactionStatus(id).then(transaction => {
            console.log("Transaction: ", transaction);
        }).catch(error => {
            console.error(error)
        })
    }, 20_000)
}).catch(error => {
    console.error(error)
})

// client.directPayment(id, 1, "Payment for a coffee", notifyUrl, "+251947407163", "Telebirr").then(response => {
//     console.log(response)
//     client.checkTransactionStatus(id).then(transaction => {
//         console.log("Transaction: ", transaction);
//     }).catch(error => {
//         console.error(error)
//     })
// }).catch(error => {
//     console.error(error)
// })


// client.sendToCustomer(id, 1, "refund for coffee", "+251932118929" , "Telebirr").then(response => {
//     console.log(response);
//     client.checkTransactionStatus(id).then(transaction => {
//         console.log("Transaction: ", transaction);
//     }).catch(error => {
//         console.error(error)
//     })
   
// }).catch(error => {
//     console.error(error)
// })