import { Currencies } from "@/lib/currencies";
import { z } from "zod";

// Zod scheme which guarantees that only a valid currency can be used when updating a user's currency in the application.

export const UpdateUserCurrencySchema = z.object({
  currency: z.custom((value) => {
    const found = Currencies.some((c) => c.value === value);
    if (!found) {
      throw new Error(`invalid currency: ${value}`);
    }

    return value;
  }),
});