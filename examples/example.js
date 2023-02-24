const santimpaySdk = require("../index.js");

const SANTIMPAY_GATEWAY_TOKEN = "";

// you must keep this key private
const PRIVATE_KEY_IN_PEM = `-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIBTX9Mw89X65SGZqOaE ... \n-----END EC PRIVATE KEY-----\n`

const GATEWAY_MERCHANT_ID = "f660f84e-7395-417b-91ff-542026c38326"

const client = new santimpaySdk(GATEWAY_MERCHANT_ID, SANTIMPAY_GATEWAY_TOKEN, PRIVATE_KEY_IN_PEM);

// client side pages to redirect user to after payment is completed/failed
const successRedirectUrl = "https://santimpay.com";
const failureRedirectUrl = "https://santimpay.com";

// backend url to receive a status update (webhook)
const notifyUrl = "https://santimpay.com";

// custom ID used by merchant to identify the payment
const id = "1";

client.generatePaymentUrl(id, 1, "Payment for a coffee", successRedirectUrl, failureRedirectUrl, notifyUrl).then(url => {
    // redirect user to url to process payment
    console.log("Payment URL: ", url);
}).catch(error => {
    console.error(error)
})