export type T_SimpleMenu = {
  items: T_SimpleMenuItem[];
  offsetTop: number;
  fontSize: number;
  header: string;
  gap: number;
  clickEvent: string;
};

export type T_SimpleMenuItem = {
  enabled: boolean;
  isHover: boolean;
  textLeft: string;
  textRight: string;
  tag: string;
};
