import { useState } from "react";

import { Order, IconsEnum } from "../@types/Order";

import { Button } from "./Button";
import { OrderModal } from "./OrderModal";

interface BoardProps {
  title: string;
  icon: "WAITING" | "IN_PRODUCTION" | "DONE";
  orders: Order[];
}

export function Board({ title, icon, orders }: BoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleOpenOrderModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
    console.log(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  return (
    <div className="p-4 border bg-gray-100 border-gray-200 rounded-2xl flex flex-col items-center shadow-md">
      <header className="p-2 text-sm flex items-center gap-2 pb-6">
        <span>{IconsEnum[icon]}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <div className="w-full flex flex-col gap-6">
          {orders.map((order) => (
            <Button
              key={order._id}
              table={order.table}
              items={order.products.length}
              onClick={() => handleOpenOrderModal(order)}
            />
          ))}
        </div>
      )}

      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onCloseModal={handleCloseModal}
      />
    </div>
  );
}
