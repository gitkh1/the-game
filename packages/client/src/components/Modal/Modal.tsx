import React, { FC, MouseEventHandler, PropsWithChildren } from "react";
import Button from "@mui/material/Button";
import MuiModal from "@mui/material/Modal";

import styles from "./Modal.module.scss";

interface I_Props {
  title: string;
  isOpen: boolean;
  handleSave: MouseEventHandler;
  handleClose: MouseEventHandler;
}

export const Modal: FC<PropsWithChildren<I_Props>> = ({ handleClose, handleSave, isOpen, children, title }) => {
  return (
    <MuiModal open={isOpen} onClose={handleClose} className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h2>{title}</h2>
        </div>
        <div>{children}</div>
        <div className={styles.buttons}>
          <Button variant="contained" onClick={handleSave}>
            Сохранить
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            Отмена
          </Button>
        </div>
      </div>
    </MuiModal>
  );
};
