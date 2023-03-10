export type T_CheckId = {
  id: string;
};

export type T_CreateAmount = {
  amount: number;
};

export type T_CreatePaymentOptions = {
  amount: number;
  description: string;
  returnUrl: string;
};

export type T_CreatePaymentPayload = {
  amount: {
    value: string;
    currency: string;
  };
  capture: boolean;
  payment_method_data: {
    type: string;
  };
  confirmation: {
    type: string;
    return_url: string;
  };
  description: string;
};

export type T_PaymentConfirmation = {
  paymentId: string;
  redirectUrl: string;
};

export type T_PaymentStatus = "pending" | "waiting_for_capture" | "succeeded" | "canceled";

export type T_Payment = {
  id: string;
  status: T_PaymentStatus;
  paid: boolean;
  amount: T_Amount;
  confirmation: T_Confirmation;
  created_at: string;
  description: string;
  metadata: T_Metadata;
  payment_method: T_PaymentMethod;
  recipient: T_Recipient;
  refundable: boolean;
  test: boolean;
};

export type T_SimplePayment = Pick<T_Payment, "id" | "status">;

export type T_Amount = {
  value: string;
  currency: string;
};

export type T_Confirmation = {
  type: string;
  return_url: string;
  confirmation_url: string;
};

export type T_Metadata = {
  // not yet used
};

export type T_PaymentMethod = {
  type: string;
  id: string;
  saved: boolean;
};

export type T_Recipient = {
  account_id: string;
  gateway_id: string;
};
