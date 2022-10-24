import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import {
	carMock,
  carMockWithId,
  carMockForChange,
  carMockForChangeWithId
} from '../../mocks/carsMock';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockForChangeWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves();
  });

  after(() => {
    sinon.restore();
  });

  describe('Creating Car', () => {
    it('Successfully created', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('Searching all cars', () => {
    it('Successfully a found', async () => {
      const carsFound = await carModel.read();
      expect(carsFound).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('Searching a car', () => {
    it('Successfully a found', async () => {
      const car = await carModel.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
  });

  describe('Updating a car', () => {
		it('Successfully changed', async () => {
			const carUpdated = await carModel.update(carMockWithId._id, carMockForChange);
			expect(carUpdated).to.be.deep.equal(carMockForChangeWithId);
		});
	
		it('_id not found to change', async () => {
			try {
				await carModel.update('123ERRADO', carMockForChange);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('Deleting a car', () => {
		it('Successfully deleted', async () => {
			const carDeleted = await carModel.delete(carMockWithId._id);
			expect(carDeleted).to.be.undefined;
		});
	});
})