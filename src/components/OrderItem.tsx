import { formatCurrency } from "../utils/formatCurrency";

interface OrderItemProps {
  name: string;
  price: number;
  imagePath: string;
  quantity: number;
}

export function OrderItem({
  name,
  price,
  quantity,
  imagePath,
}: OrderItemProps) {
  return (
    <div className="flex items-center pb-6">
      <img
        src={`http://localhost:3333/uploads/${imagePath}`}
        alt={name}
        className="w-[80px] rounded"
      />
      <small className="text-gray-400 pl-3 pr-3">{quantity}x</small>
      <div className="flex flex-col">
        <strong className="text-gray-500">{name}</strong>
        <small className="text-gray-400">{formatCurrency(price)}</small>
      </div>
    </div>
  );
}
