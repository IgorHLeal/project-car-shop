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
  
  afterEach(() => {
    sinon.restore();
  });

  describe('Create Car', () => {
    it('Success', async () => {
			sinon.stub(carModel, 'create').resolves(carMockWithId);
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			sinon.stub(carModel, 'create').resolves();
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
  });

  describe('Searching all cars', () => {
		it('Success', async () => {
			sinon.stub(carModel, 'read').resolves([carMockWithId]);
			const cars = await carService.read();

			expect(cars).to.be.deep.equal([carMockWithId]);
		});

		it('Failure', async () => {
			sinon.stub(carModel, 'read').resolves();
			try {
				await carService.read();
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

  describe('Searching one car', () => {
		it('Success', async () => {
			sinon.stub(carModel, 'readOne').resolves(carMockWithId);
			const cars = await carService.readOne(carMockWithId._id);

			expect(cars).to.be.deep.equal(carMockWithId );
		});

		it('Failure', async () => {
			sinon.stub(carModel, 'readOne').resolves();
			try {
				await carService.readOne(carMockWithId._id);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

  describe('Updating a car', () => {
		it('Success', async () => {
			sinon.stub(carModel, 'update').resolves(carMockForChangeWithId);
			const carUpdated = await carService.update(carMockWithId._id, carMock);
			expect(carUpdated).to.be.deep.equal(carMockForChangeWithId);
		});

		it('Failure: entity is not valid', async () => {
			sinon.stub(carModel, 'update').resolves();
			let errorToTest;
			try {
				await carService.update(carMockWithId._id, carMockWrong)
			} catch (error: any) {
				errorToTest = error;
			}
			expect(errorToTest).to.be.instanceOf(ZodError);
		});

    it('Return error: "Id must have 24 hexadecimal characters"', async () => {
			sinon.stub(carModel, 'update').resolves(carMockForChangeWithId);
			try {
				await carService.update('123ERRADO', carMock)
			} catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('Deleting a car', () => {
		it('Successfully deleted', async () => {
			sinon.stub(carModel, 'delete').resolves(carMockWithId);
			const carDeleted = await carService.delete(carMockWithId._id);
			expect(carDeleted).to.be.deep.equal(carMockWithId);
		});
	});
})