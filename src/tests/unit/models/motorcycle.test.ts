import { expect } from 'chai';
import sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle';
import { Model } from 'mongoose';
import {
  motorcycleMockWithId,
  motorcycleMockForChange,
  motorcycleMockForChangeWithId,
} from '../../mocks/motorcycleMock';
import { ErrorTypes } from '../../../errors/catalog';

describe('Motorcycle Model', () => {
  const motorcycleModel = new MotorcycleModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves([motorcycleMockWithId]);
    sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockForChangeWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves();
  });

  after(() => {
    sinon.restore();
  });

  describe('Creating Motorcycle', () => {
    it('Successfully created', async () => {
      const newMotorcycle = await motorcycleModel.create(motorcycleMockWithId);
      expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });

  describe('Searching all motorcycles', () => {
    it('Successfully a found', async () => {
      const motorcyclesFound = await motorcycleModel.read();
      expect(motorcyclesFound).to.be.deep.equal([motorcycleMockWithId]);
    });
  });

  describe('Searching a motorcycle', () => {
    it('Successfully a found', async () => {
      const motorcycles = await motorcycleModel.readOne(motorcycleMockWithId._id);
      expect(motorcycles).to.be.deep.equal(motorcycleMockWithId);
    });

    it('_id not found', async () => {
			try {
				await motorcycleModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
  });

  describe('Updating a motorcycle', () => {
		it('Successfully changed', async () => {
			const motorcycleUpdated = await motorcycleModel.update(motorcycleMockWithId._id, motorcycleMockForChange);
			expect(motorcycleUpdated).to.be.deep.equal(motorcycleMockForChangeWithId);
		});
	
		it('_id not found to change', async () => {
			try {
				await motorcycleModel.update('123ERRADO', motorcycleMockForChange);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('Deleting a motorcycle', () => {
		it('Successfully deleted', async () => {
			const deletedMotorcycle = await motorcycleModel.delete(motorcycleMockWithId._id);
			expect(deletedMotorcycle).to.be.undefined;
		});
	});
})