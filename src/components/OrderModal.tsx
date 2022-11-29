import { useEffect } from "react";
import { X } from "phosphor-react";

import {
  Order,
  IconsEnum,
  StatusTitlesEnum,
  ButtonTitlesEnum,
  NextStepIconsEnum,
} from "../@types/Order";
import { formatCurrency } from "../utils/formatCurrency";

import { OrderItem } from "./OrderItem";

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onCloseModal: () => void;
  onCancelOrder: () => Promise<void>;
  onChangeOrderStatus: () => void;
  isLoading: boolean;
}

export function OrderModal({
  visible,
  order,
  onCloseModal,
  onChangeOrderStatus,
  onCancelOrder,
  isLoading,
}: OrderModalProps) {
  if (!visible || !order) {
    return null;
  }

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + product.price * quantity;
  }, 0);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      onCloseModal();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCloseModal]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-opacity-80 backdrop-blur-sm">
      <div className="fixed bg-gray-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] rounded-lg shadow-xl p-8 flex flex-col gap-8">
        <header className="w-full flex items-center justify-between">
          <strong className="text-2xl">Mesa {order.table}</strong>
          <button onClick={onCloseModal}>
            <X />
          </button>
        </header>

        <div>
          <small className="text-gray-500/80 pb-2">Status do pedido</small>
          <div className="flex gap-2 items-center">
            <span>{IconsEnum[order.status]}</span>
            <span className="font-semibold text-gray-500">
              {StatusTitlesEnum[order.status]}
            </span>
          </div>
        </div>

        <div>
          <small className="text-gray-500/80 mb-4">Itens</small>
          {order.products.map(({ _id, product, quantity }) => (
            <OrderItem
              key={_id}
              name={product.name}
              price={product.price}
              imagePath={product.imagePath}
              quantity={quantity}
            />
          ))}
          <div className="flex items-center justify-between">
            <small className="text-gray-500/80">Total</small>
            <strong className="text-gray-500">{formatCurrency(total)}</strong>
          </div>
        </div>

        <footer className="flex flex-col gap-4">
          {order.status !== "DONE" && (
            <button
              className={
                !isLoading
                  ? "flex gap-2 items-center justify-center font-semibold px-6 py-3 bg-gray-500 text-gray-0 rounded-[48px]"
                  : "flex gap-2 items-center justify-center font-semibold px-6 py-3 bg-gray-500 text-gray-0 rounded-[48px] opacity-50 cursor-not-allowed"
              }
              disabled={isLoading}
              onClick={onChangeOrderStatus}
            >
              <span>{NextStepIconsEnum[order.status]}</span>
              <span>{ButtonTitlesEnum[order.status]}</span>
            </button>
          )}

          <button
            className={
              !isLoading
                ? "text-red font-semibold"
                : "text-red font-semibold opacity-50 cursor-not-allowed"
            }
            onClick={onCancelOrder}
            disabled={isLoading}
          >
            Cancelar pedido
          </button>
        </footer>
      </div>
    </div>
  );
}
