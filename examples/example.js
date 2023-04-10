import SantimpaySdk from "../src/index.js";

// production
const PRIVATE_KEY_IN_PEM = `-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIPDaoRtwp0oX6X8FTRLDeoHfBFqrePqR2kCjQ68RWPjNoAoGCCqGSM49\nAwEHoUQDQgAEhLUSwugz8HplU8X+xUrJIrv6dRGfZ6VhjVxoUZLp+5kg8za/l8ft\nDyMIPiowQvVRp8EN4fII3gd9RGchfdocFA==\n-----END EC PRIVATE KEY-----\n`

const GATEWAY_MERCHANT_ID = "9e2dab64-e2bb-4837-9b85-d855dd878d2b"

const client = new SantimpaySdk(GATEWAY_MERCHANT_ID, PRIVATE_KEY_IN_PEM);

// client side pages to redirect user to after payment is completed/failed
const successRedirectUrl = "https://santimpay.com";
const failureRedirectUrl = "https://santimpay.com";

// backend url to receive a status update (webhook)
const notifyUrl = "https://santimpay.com";

// custom ID used by merchant to identify the payment
const id = Math.floor(Math.random() * 1000000000).toString();

client.generatePaymentUrl(id, 1, "Payment for a coffee", successRedirectUrl, failureRedirectUrl, notifyUrl).then(url => {
    // redirect user to url to process payment
    console.log("Payment URL: ", url);
}).catch(error => {
    console.error(error)
})
