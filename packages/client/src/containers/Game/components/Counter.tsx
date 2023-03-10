import { FC } from "react";
import AddIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlined";
import { Box, IconButton, Typography } from "@mui/material";

type T_Props = {
  value?: number;
  minValue?: number;
  maxValue?: number;
  onChange?: (value: number) => void;
};

export const Counter: FC<T_Props> = ({ value = 0, minValue = 0, maxValue = 10, onChange }) => {
  const setValue = (value: number) => {
    onChange?.(value);
  };

  const decrement = () => value > minValue && setValue(value - 1);
  const increment = () => value < maxValue && setValue(value + 1);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" minWidth={110}>
      <IconButton onClick={decrement}>
        <RemoveIcon />
      </IconButton>
      <Typography>{value}</Typography>
      <IconButton onClick={increment}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};
