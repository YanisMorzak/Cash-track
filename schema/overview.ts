import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { differenceInDays, isValid } from "date-fns";
import { z } from "zod";

export const OverviewQuerySchema = z
// définit un objet avec deux propriétés : from et to. Chacune de ces propriétés est coercée en tant que date, ce qui signifie que si une valeur qui n'est pas une date est fournie, Zod tentera de la convertir en date.
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  })
  // refine() permet de définir une logique de validation personnalisée. Garantit que la différence entre ces deux dates est comprise entre 0 et MAX_DATE_RANGE_DAYS.
  .refine((args) => {
    const { from, to } = args;
    const days = differenceInDays(to, from);

    const isValidRange = days >= 0 && days <= MAX_DATE_RANGE_DAYS;
    return isValidRange;
  });