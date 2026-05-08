import { categories } from "./categories";

export const departments = categories.map((category, index) => ({
  ...category,
  discountLabel: index % 3 === 0 ? "ate 42% off" : index % 3 === 1 ? "top custo-beneficio" : "selecionados",
}));
