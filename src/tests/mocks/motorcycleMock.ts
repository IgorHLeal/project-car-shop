import { IMotorcycle } from '../../interfaces/IMotorcycle';

const motorcycleMock: IMotorcycle = {
  model: "Honda bis",
  year: 2007,
  color: "blue",
  status: false,
  buyValue: 10,
  category: 'Street' as 'Street' | 'Custom' | 'Trail',
  engineCapacity: 5
}

const motorcycleMockWithId: IMotorcycle & { _id: string } = {
  ...motorcycleMock,
  _id: "63567e103c90cf442ecd85cd",
}

const motorcycleMockForChange: IMotorcycle = {
  ...motorcycleMock,
  model: "Titan",
}

const motorcycleMockForChangeWithId: IMotorcycle & { _id: string } = {
  ...motorcycleMockForChange,
  _id: motorcycleMockWithId._id,
}

const motorcycleMockWrong: IMotorcycle = {
	model: "S",
  year: 2007,
  color: "123",
  status: true,
  buyValue: 10,
  category: 'Street' as 'Street' | 'Custom' | 'Trail',
  engineCapacity: 3,
};

export {
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleMockForChange,
  motorcycleMockForChangeWithId,
  motorcycleMockWrong,
}