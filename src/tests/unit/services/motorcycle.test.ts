import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import {
	motorcycleMock,
  motorcycleMockWithId,
  motorcycleMockForChange,
  motorcycleMockForChangeWithId,
  motorcycleMockWrong
} from '../../mocks/motorcycleMock';
import { ErrorTypes } from '../../../errors/catalog';

describe('Motorcycle Service', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  
  afterEach(() => {
    sinon.restore();
  });

  describe('Create Motorcycle', () => {
    it('Success', async () => {
			sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
			const motorcycleCreated = await motorcycleService.create(motorcycleMock);

			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
			sinon.stub(motorcycleModel, 'create').resolves();
			try {
				await motorcycleService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
  });

  describe('Searching all motorcycles', () => {
		it('Success', async () => {
			sinon.stub(motorcycleModel, 'read').resolves([motorcycleMockWithId]);
			const motorcycles = await motorcycleService.read();

			expect(motorcycles).to.be.deep.equal([motorcycleMockWithId]);
		});

		it('Failure', async () => {
			sinon.stub(motorcycleModel, 'read').resolves();
			try {
				await motorcycleService.read();
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

  describe('Searching one motorcycle', () => {
		it('Success', async () => {
			sinon.stub(motorcycleModel, 'readOne').resolves(motorcycleMockWithId);
			const motorcycles = await motorcycleService.readOne(motorcycleMockWithId._id);

			expect(motorcycles).to.be.deep.equal(motorcycleMockWithId );
		});

		it('Failure', async () => {
			sinon.stub(motorcycleModel, 'readOne').resolves();
			try {
				await motorcycleService.readOne(motorcycleMockWithId._id);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

  describe('Updating a motorcycle', () => {
		it('Success', async () => {
			sinon.stub(motorcycleModel, 'update').resolves(motorcycleMockForChangeWithId);
			const motorcycleUpdated = await motorcycleService.update(motorcycleMockWithId._id, motorcycleMock);
			expect(motorcycleUpdated).to.be.deep.equal(motorcycleMockForChangeWithId);
		});

		it('Failure: entity is not valid', async () => {
			sinon.stub(motorcycleModel, 'update').resolves();
			let errorToTest;
			try {
				await motorcycleService.update(motorcycleMockWithId._id, motorcycleMockWrong)
			} catch (error: any) {
				errorToTest = error;
			}
			expect(errorToTest).to.be.instanceOf(ZodError);
		});

    it('Return error: "Id must have 24 hexadecimal characters"', async () => {
			sinon.stub(motorcycleModel, 'update').resolves(motorcycleMockForChangeWithId);
			try {
				await motorcycleService.update('123ERRADO', motorcycleMock)
			} catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('Deleting a motorcycle', () => {
		it('Successfully deleted', async () => {
			sinon.stub(motorcycleModel, 'delete').resolves(motorcycleMockWithId);
			const motorcycleDeleted = await motorcycleService.delete(motorcycleMockWithId._id);
			expect(motorcycleDeleted).to.be.deep.equal(motorcycleMockWithId);
		});
	});
})