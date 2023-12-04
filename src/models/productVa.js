import { z } from "zod";
// const currentYear = new Date().getFullYear();

/* movie entity->
optional: validate id: UUID for get by id, delete, patch methods
validate users
*/

const idSchema = z.object({
  id: z.string().uuid(),
});
const productsSchema = z.object({
  name: z.string({ required_error: "Campo requerido" }),
  picture: z.string().url(),
  price: z
    .number()
    .int()
    .positive()
    .refine((value) => value !== 0, { message: "Campo requerido" }),
  descript: z.string({ required_error: "Campo requerido" }),
  catalog: z.array(
    z.enum([
      "Comida",
      "Bebida fría",
      "Bebida caliente",
      "Tazas",
      "Cafeteras",
      "Cafés molidos",
      "Combos",
      "Cápsulas",
    ])
  ),
});

export function validateProducts(object) {
  return productsSchema.safeParse(object);
}
export function validateId(object) {
  return idSchema.safeParse(object);
}
