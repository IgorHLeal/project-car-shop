import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import {
	carMock,
  carMockWithId,
  carMockForChangeWithId,
  carMockWrong,
} from '../../mocks/carsMock';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'readOne').resolves(carMockWithId);
    sinon.stub(carModel, 'update').resolves(carMockForChangeWithId);
    sinon.stub(carModel, 'delete').resolves(carMockWithId);
  });
  
  after(() => {
    sinon.restore();
  });

  describe('Create Car', () => {
    it('Success', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
  });

  describe('Searching all cars', () => {
		it('Success', async () => {
			const cars = await carService.read();

			expect(cars).to.be.deep.equal([carMockWithId]);
		});

		it('Failure', async () => {
			try {
				await carService.read();
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

  describe('Searching one car', () => {
		it('Success', async () => {
			const cars = await carService.readOne(carMockWithId._id);

			expect(cars).to.be.deep.equal(carMockWithId );
		});

		it('Failure', async () => {
			try {
				await carService.readOne(carMockWithId._id);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

  describe('Updating a car', () => {
		it('Success', async () => {
			const carUpdated = await carService.update(carMockWithId._id, carMock);
			expect(carUpdated).to.be.deep.equal(carMockForChangeWithId);
		});

		it('Failure: entity is not valid', async () => {
			let errorToTest;
			try {
				await carService.update(carMockWithId._id, carMockWrong)
			} catch (error: any) {
				errorToTest = error;
			}
			expect(errorToTest).to.be.instanceOf(ZodError);
		});

    it('Return error: "Id must have 24 hexadecimal characters"', async () => {
			try {
				await carService.update('123ERRADO', carMock)
			} catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('Deleting a car', () => {
		it('Successfully deleted', async () => {
			const carDeleted = await carService.delete(carMockWithId._id);
			expect(carDeleted).to.be.deep.equal(carMockWithId);
		});
	});
})