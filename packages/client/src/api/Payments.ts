import type { T_Payment, T_PaymentConfirmation } from "../global/types";
import { sleep } from "../global/utils";

import { Api } from "./Api";
import { PAYMENT_TIMEOUT, PAYMENTS_BASE_URL } from "./constants";

const api = new Api(PAYMENTS_BASE_URL);

export const paymentApi = new (class {
  createNew = async (price: number): Promise<T_PaymentConfirmation> => {
    return await api.post("", { amount: price });
  };
  getStatus = async (paymentId: string): Promise<T_Payment> => {
    return await api.get(`/${paymentId}`);
  };
  waitForStatusChange = async (paymentId: string, { delay = 5_000 } = {}): Promise<T_Payment> => {
    const endTime = performance.now() + PAYMENT_TIMEOUT;
    for (;;) {
      await sleep(delay);
      const payment = await this.getStatus(paymentId);
      const isTimeEnded = performance.now() > endTime;
      if (isTimeEnded || payment.status !== "pending") return payment;
    }
  };
})();
