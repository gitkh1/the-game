import { ActionCreatorsMapObject, bindActionCreators } from "@reduxjs/toolkit";

import { useAppDispatch } from "../hooks";

export function bindWithDispatch<T extends ActionCreatorsMapObject>(actions: T) {
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
}

export * from "./setCity";
