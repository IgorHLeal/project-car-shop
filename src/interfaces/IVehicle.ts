import { z } from 'zod';

const VehicleZodSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3, { message: 'Must be a string 3 or more characters long' }),
  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  })
    .int({ message: 'Must be a integer number' })
    .positive({ message: 'Must be a positive number' })
    .gte(1900, { message: 'Must be a greater than 1900' })
    .lte(2022, { message: 'Must be a less than 2022' }),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Must be a string 3 or more characters long' }),
  status: z.boolean({
    invalid_type_error: 'Status must be a boolean',
  }).optional(),
  buyValue: z.number({
    required_error: 'BuyValue is required',
    invalid_type_error: 'BuyValue must be a number',
  }).int({ message: 'Must be a integer number' }),
});

export type IVehicle = z.infer<typeof VehicleZodSchema>;

export { VehicleZodSchema };

// Referências
// https://zod.dev/