export type T_PaymentStatus = "pending" | "waiting_for_capture" | "succeeded" | "canceled";

export type T_Payment = {
  id: string;
  status: T_PaymentStatus;
};

export type T_PaymentConfirmation = {
  paymentId: string;
  redirectUrl: string;
};
