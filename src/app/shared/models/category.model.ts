import { Option } from './option.model';

export type Category = keyof Categories;

export type Categories = Record<string, Option[]>;
