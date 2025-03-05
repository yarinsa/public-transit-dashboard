import { z } from "zod";

const statusEnum = z.enum(["הקדמה ביציאה", "איחור", "בזמן"]);

export const recordSchema = z.object({
    shana: z.number(),
    hodesh: z.number(),
    train_station_nm: z.string(),
    station_status_nm: statusEnum,
    status_count: z.number(),
})  

export type Record = z.infer<typeof recordSchema>;