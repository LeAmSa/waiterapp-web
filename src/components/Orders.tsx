import { Order } from "../@types/Order";
import { Board } from "./Board";

const orders: Order[] = [
  {
    _id: "6373933cda0049ac51f4d731",
    table: "123",
    status: "WAITING",
    products: [
      {
        product: {
          name: "Pizza de quatro queijos",
          imagePath: "1668515891592-quatro-queijos.png",
          price: 40,
        },
        quantity: 3,
        _id: "6373933cda0049ac51f4d732",
      },
    ],
  },
];

export function Orders() {
  return (
    <div className="w-full mx-auto px-4 mt-10 mb-10 max-w-7xl grid grid-cols-3 gap-8">
      <Board title="Fila de espera" icon="WAITING" orders={orders} />
      <Board title="Preparando" icon="IN_PRODUCTION" orders={[]} />
      <Board title="Pronto" icon="DONE" orders={[]} />
    </div>
  );
}
