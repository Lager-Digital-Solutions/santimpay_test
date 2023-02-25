const santimpaySdk = require("../index.js");

// production
const SANTIMPAY_GATEWAY_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IisyNTE5MTAxMDEwMTAiLCJ3YWxsZXRJZCI6IjJkY2I0MzE0LTg0MTAtNDQ1YS05YjVlLTczNWE5YjE0OTZkZCIsInVzZXJJZCI6IjZkMjhhZmFiLTkzOWUtNGZjMC04Mzg1LTA4M2I2Zjc1ZTQwYSIsImRldmljZUlkIjoic2FtcG1tazIiLCJleHAiOjE2ODUwNzg2Mjd9.tJkcBi5FiSv9HDS1QLj0SsRxvvVbRFDaYHiVyx6no7w";

// production
const PRIVATE_KEY_IN_PEM = `-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIBTX9Mw89X65SGZqOaE2eiRDCr90VkbBL++e0hDrDnvKoAoGCCqGSM49\nAwEHoUQDQgAEoMvfW6zCKosfoISA8vn8i+2j82EOS930d06tEU/y/Z+XQL5ImXIw\ntojCO2748aCqOfP4iK8MvBuWhKvr+9JlHA==\n-----END EC PRIVATE KEY-----\n`

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
