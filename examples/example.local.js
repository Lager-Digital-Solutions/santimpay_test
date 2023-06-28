import SantimpaySdk from "../lib/index.js";

// production
// const SANTIMPAY_GATEWAY_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IisyNTE5MTAxMDEwMTAiLCJ3YWxsZXRJZCI6ImNkYjQ1OWE4LTU4ZTQtNDU3Mi1iODkxLWUwM2NmMzMyOWY1MyIsInVzZXJJZCI6ImNjMDY2OTM3LWQxMTItNGIwYy04MzgzLTcyMDExZjBlZDE5NiIsImRldmljZUlkIjoic2FtcG1tazIiLCJleHAiOjE2ODU4MDA3NDB9.TuR57fyo17DNnyyMi5E6yL_LElDLjuAroYhfb3C9tCg";

// production
const PRIVATE_KEY_IN_PEM = `-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIDtbPYEcVx+D3rbiK3Bl77iFOBDtFAZKB09A0TdaqISWoAoGCCqGSM49\nAwEHoUQDQgAEIKI1+0Phc2hncFxgT/nTLONyJiMLeXMCCRBiJ8om2iz6Ox1Qubf1\nGk0sIu0TKZFoGra36jRTmRV3Se/ysh8rfw==\n-----END EC PRIVATE KEY-----\n`

const GATEWAY_MERCHANT_ID = "f660f84e-7395-417b-91ff-542026c38326"

const client = new SantimpaySdk(GATEWAY_MERCHANT_ID, PRIVATE_KEY_IN_PEM, true);

// client side pages to redirect user to after payment is completed/failed
const successRedirectUrl = "https://santimpay.com";
const failureRedirectUrl = "https://santimpay.com";
const cancelRedirectUrl = "https://google.com";
// const cancelRedirectUrl = ''

// backend url to receive a status update (webhook)
const notifyUrl = "https://webhooktest.requestcatcher.com/test";

// custom ID used by merchant to identify the payment
const id = Math.floor(Math.random() * 1000000000).toString();

client.generatePaymentUrl(id, 1000, "Payment for a coffee", successRedirectUrl, failureRedirectUrl, notifyUrl,'', cancelRedirectUrl).then(url => {
    // redirect user to url to process payment
    console.log("Payment URL: ", url);

    client.checkTransactionStatus(id).then(transaction => {
        console.log("Transaction: ", transaction);
    }).catch(error => {
        console.error(error)
    })
}).catch(error => {
    console.error(error)
})

// client.directPayment(id, 10, "Payment for a coffee", notifyUrl, "+251901234567", "CBE Birr").then(response => {
//     console.log(response)
//     client.checkTransactionStatus(id).then(transaction => {
//         console.log("Transaction: ", transaction);
//     }).catch(error => {
//         console.error(error)
//     })
// }).catch(error => {
//     console.error(error)
// })
