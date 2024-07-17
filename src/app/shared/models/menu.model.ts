export type MenuItem = {
  label: string;
  ariaLabel: string;
  routerLink?: string;
  onClick?: () => void;
  buttonStyleClass?: string;
};

export type MenuTemplateType = 'header' | 'content';

export type MenuConfig = {
  header: string;
  menuItems: MenuItem[];
};
