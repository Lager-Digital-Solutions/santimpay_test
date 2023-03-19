const santimpaySdk = require("../index.js");

// production
const PRIVATE_KEY_IN_PEM = `-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIOfG/zOSMvsezq+VUoA5jD+I2nzgGGA73wxUQ5MUjggGoAoGCCqGSM49\nAwEHoUQDQgAEXn6Wx8sAuKVigZtwmEjIVNeQJsTgO19vTnm/FiTgmZOFhuHHmajY\niOgU8o1R5k8weV6bS5m2nmRlLSc/7FWPfg==\n-----END EC PRIVATE KEY-----\n`

const GATEWAY_MERCHANT_ID = "9e2dab64-e2bb-4837-9b85-d855dd878d2b"

const client = new santimpaySdk(GATEWAY_MERCHANT_ID, PRIVATE_KEY_IN_PEM);

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
