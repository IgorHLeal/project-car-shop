import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const MotorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum([
    'Street', 'Custom', 'Trail',
  ]),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  })
    .int({ message: 'Must be a integer number' })
    .positive({ message: 'Must be a positive number' })
    .lte(2500, { message: 'Must be a less than 2500' }),
});

type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;

export { MotorcycleZodSchema, IMotorcycle };