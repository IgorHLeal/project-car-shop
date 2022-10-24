import { ICar } from '../../interfaces/ICar';

const carMock: ICar = {
  model: "Sedan",
  year: 2007,
  color: "black",
  status: true,
  buyValue: 10,
  doorsQty: 3,
  seatsQty: 5
}

const carMockWithId: ICar & { _id: string } = {
  ...carMock,
  _id: "63567e103c90cf442ecd85cd",
}

const carMockForChange: ICar = {
  ...carMock,
  model: "Honda Civic",
}

const carMockForChangeWithId: ICar & { _id: string } = {
  ...carMockForChange,
  _id: carMockWithId._id,
}

const carMockWrong: ICar = {
	model: "S",
  year: 2007,
  color: "123",
  status: true,
  buyValue: 10,
  doorsQty: 3,
  seatsQty: 5
};

export {
  carMock,
  carMockWithId,
  carMockForChange,
  carMockForChangeWithId,
  carMockWrong,
}