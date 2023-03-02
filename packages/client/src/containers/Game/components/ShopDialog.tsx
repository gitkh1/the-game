import { FC, useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import RubleIcon from "@mui/icons-material/CurrencyRuble";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { paymentApi } from "../../../api/Payments";
import { T_Payment, T_PaymentConfirmation } from "../../../global/types";
import { T_Ability } from "../engine";

import { Counter } from "./Counter";

type T_Props = {
  open: boolean;
  items: T_Ability[];
  setAmount: (index: number, amount: number) => void;
  onBuy: () => void;
  onClose: () => void;
};

export const ShopDialog: FC<T_Props> = ({ items, setAmount, open, onClose, onBuy }) => {
  const totalPrice = items.reduce((sum, cur) => sum + cur.buyAmount * cur.cost, 0);

  const [paymentConfirmation, setPaymentConfirmation] = useState<T_PaymentConfirmation>();
  const [payment, setPayment] = useState<T_Payment>();

  const tryBuy = () => {
    void paymentApi.createNew(totalPrice).then((payment) => {
      setPaymentConfirmation(payment);
      window.open(payment.redirectUrl);
    });
  };

  useEffect(() => {
    if (!paymentConfirmation) return;

    void paymentApi.waitForStatusChange(paymentConfirmation.paymentId).then((payment) => {
      console.log(payment);
      setPayment(payment);
      setPaymentConfirmation(undefined);
      if (payment.status === "succeeded") {
        onBuy();
      }
    });

    const preventPageClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    addEventListener("beforeunload", preventPageClose);
    return () => removeEventListener("beforeunload", preventPageClose);
  }, [paymentConfirmation]);

  const handleClose = () => {
    setPayment(undefined);
    setPaymentConfirmation(undefined);
    onClose();
  };

  return (
    <Dialog onClose={paymentConfirmation ? undefined : handleClose} open={open}>
      {payment ? (
        payment.status === "succeeded" ? (
          <>
            <DialogTitle>Спасибо за покупку</DialogTitle>
            <DialogContent>
              <Stack dir="column" alignItems="center" gap={3}>
                <TaskAltIcon color="success" sx={{ fontSize: 48 }} />
                <Button variant="contained" onClick={handleClose}>
                  Закрыть
                </Button>
              </Stack>
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle>Покупка отменена</DialogTitle>
            <DialogContent>
              <Stack dir="column" alignItems="center" gap={3}>
                <CancelIcon color="error" sx={{ fontSize: 48 }} />
                <Button variant="contained" onClick={handleClose}>
                  Закрыть
                </Button>
              </Stack>
            </DialogContent>
          </>
        )
      ) : paymentConfirmation ? (
        <>
          <DialogTitle>Ждём оплату</DialogTitle>
          <DialogContent>
            <Stack dir="column" alignItems="center" gap={3}>
              <DialogContentText>Не закрывайте страницу</DialogContentText>
              <CircularProgress />
              <Link href={paymentConfirmation.redirectUrl} target="_blank">
                Открыть форму оплаты (если не открылась)
              </Link>
            </Stack>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>Магазин</DialogTitle>
          <DialogContent>
            <List sx={{ pt: 0 }}>
              {items.map((item, index) => (
                <ListItem key={item.name}>
                  <ListItemText>
                    <Box display="flex">
                      <Typography>
                        {item.name} — {item.cost}
                      </Typography>
                      <RubleIcon />
                    </Box>
                  </ListItemText>
                  <Counter value={item.buyAmount} onChange={(value) => setAmount(index, value)}></Counter>
                </ListItem>
              ))}

              <ListItem>
                <ListItemText>
                  <Box display="flex" alignItems="center" sx={{ fontSize: 26 }}>
                    <Typography fontSize="inherit">Итого: {totalPrice}</Typography>
                    <RubleIcon fontSize="inherit" />
                  </Box>
                </ListItemText>
              </ListItem>
            </List>
          </DialogContent>

          <DialogActions sx={{ display: "flex" }}>
            <Button variant="contained" disabled={totalPrice === 0} fullWidth onClick={tryBuy}>
              Оплатить
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
