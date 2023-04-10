import axios from "axios"
import { signES256 } from "./utils/cryptography.js"

import { PRODUCTION_BASE_URL, TEST_BASE_URL } from "./utils/constants.js"

export class SantimpaySdk {
  constructor(merchantId, privateKey, testBed = false) {
    this.privateKey = privateKey;
    this.merchantId = merchantId;

    this.baseUrl = PRODUCTION_BASE_URL;

    if (testBed == true) {
      this.baseUrl = TEST_BASE_URL;
    }
    
  }

  generateSignedToken(amount, paymentReason) {
    const time = Math.floor(Date.now() / 1000);

    const payload = {
      amount,
      paymentReason,
      merchantId: this.merchantId,
      generated: time,
    }

    return signES256(payload, this.privateKey);
  }

  async generatePaymentUrl(id, amount, paymentReason, successRedirectUrl, failureRedirectUrl, notifyUrl) {
    try {

      const token = this.generateSignedToken(amount, paymentReason);

      const response = await axios.post(`${this.baseUrl}/initiate-payment`, {
        id,
        amount,
        reason: paymentReason,
        merchantId: this.merchantId,
        signedToken: token,
        successRedirectUrl,
        failureRedirectUrl,
        notifyUrl
      },
      // {
        // headers: {
        //   Authorization: `Bearer ${this.token}`
        // }
      // }
      );

      if (response.status === 200) {
        return response.data.url;
      } else {
        throw new Error("Failed to initiate payment");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw error;
    }
  }
}

export default SantimpaySdk;