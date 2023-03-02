import axios from "axios";

import { YOOKASSA_ID, YOOKASSA_TOKEN } from "../configuration";
import { T_CreatePaymentOptions, T_CreatePaymentPayload, T_Payment } from "../types/payments";

const http = axios.create({
  baseURL: "https://api.yookassa.ru/v3/payments",
  auth: {
    username: YOOKASSA_ID,
    password: YOOKASSA_TOKEN,
  },
});

export class PaymentService {
  create = async (options: T_CreatePaymentOptions) => {
    const opt: T_CreatePaymentPayload = {
      capture: true,
      ["payment_method_data"]: {
        type: "bank_card",
      },
      description: options.description,
      amount: {
        currency: "RUB",
        value: options.amount.toFixed(2),
      },
      confirmation: {
        type: "redirect",
        ["return_url"]: options.returnUrl,
      },
    };
    return http
      .post("", opt, {
        headers: {
          "Idempotence-Key": Math.random(),
        },
      })
      .then((res) => res.data as T_Payment);
  };

  get = async (paymentId: string) => {
    return http.get(`/${paymentId}`).then((res) => res.data as T_Payment);
  };
}
