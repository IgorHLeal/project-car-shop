import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'DoorsQty is required',
    invalid_type_error: 'DoorsQty must be a number',
  })
    .int({ message: 'Must be a integer number' })
    .positive({ message: 'Must be a positive number' })
    .gte(2, { message: 'Must be a greater than 2' })
    .lte(4, { message: 'Must be a less than 4' }),
  seatsQty: z.number({
    required_error: 'SeatsQty is required',
    invalid_type_error: 'SeatsQty must be a number',
  })
    .int({ message: 'Must be a integer number' })
    .positive({ message: 'Must be a positive number' })
    .gte(2, { message: 'Must be a greater than 2' })
    .lte(7, { message: 'Must be a less than 7' }),
});

type ICar = z.infer<typeof CarZodSchema>;

export { CarZodSchema, ICar };