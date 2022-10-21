import { z } from 'zod';
import { IVehicle } from './IVehicle';

const CarZodSchema = z.object({
  doorsQty: z.number()
    .int()
    .positive()
    .gte(2)
    .lte(4),
  seatsQty: z.number()
    .int()
    .positive()
    .gte(2)
    .lte(7),
});

type CarSchema = z.infer<typeof CarZodSchema>;

export interface ICar extends IVehicle, CarSchema {}