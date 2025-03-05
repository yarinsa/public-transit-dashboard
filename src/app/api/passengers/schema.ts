import { z } from "zod";

const daysSchema = z.record(z.string(), z.any());

export const recordSchema =z.union([z.object({
    year_key: z.number(),
    month_key: z.number(),
    operator: z.string(),
    // and D{day} for all days of the month (dynamic)
}), daysSchema])

// .transform(({year_key,month_key,operator, ...record}) => ({
//     year: year_key,
//     month: month_key,
//     operator: operator,
//     ...(typeof record === 'object' && record ? record : {}),
// }));
