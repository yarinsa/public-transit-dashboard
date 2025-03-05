import { z } from "zod";

export const recordSchema = z.object({
    CHOPER: z.string(), // Airline code (e.g., "LY" for El Al).
    CHFLTN: z.string(), // Flight number (e.g., "351").
    CHOPERD: z.string(), // Scheduled departure time (e.g., "2025-03-04T17:10:00").
    CHSTOL: z.string(), // Actual departure/arrival time (e.g., "2025-03-04T17:16:00").
    CHPTOL: z.string(), // Planned time of landing (e.g., "2025-03-04T17:25:00" for arrivals).
    CHAORD: z.string(), // Operation type ("D" for departure, "A" for arrival).
    CHLOC1: z.string(), // Airport code of destination/arrival (e.g., "MUC" for Munich).
    CHLOC1D: z.string(), // Destination airport name in English (e.g., "MUNICH").
    CHLOC1TH: z.string(), // Destination airport name in Hebrew (e.g., "מינכן").
    CHLOC1T: z.string(), // Destination city name in English (e.g., "Munich").
    CHLOC1CH: z.string(), // Destination country name in Hebrew (e.g., "גרמניה").
    CHLOCCT: z.string(), // Destination country name in English (e.g., "GERMANY").
    CHTERM: z.number().nullable(), // Terminal number (e.g., "3").
    CHCINT: z.string().nullable(), // Check-in zone (e.g., "78-99").
    CHCKZN: z.string().nullable(), // Check-in counter zone (e.g., "D").
    CHRMINE: z.string(), // Status in English (e.g., "DEPARTED", "LANDED", "CANCELED", "ON TIME", "NOT FINAL").
    CHRMINH: z.string(), // Status in Hebrew (e.g., "המריאה", "נחתה", "מבוטלת", "בזמן", "לא סופי").
})

export type Record = z.infer<typeof recordSchema>;