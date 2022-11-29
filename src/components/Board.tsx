import { useState } from "react";

import { Order, IconsEnum } from "../@types/Order";

import { api } from "../utils/api";

import { Button } from "./Button";
import { OrderModal } from "./OrderModal";

import { toast } from "react-toastify";

interface BoardProps {
  title: string;
  icon: "WAITING" | "IN_PRODUCTION" | "DONE";
  orders: Order[];
  onChangeOrderStatus: (orderId: string, status: Order["status"]) => void;
  onCancelOrder: (orderId: string) => void;
}

export function Board({
  title,
  icon,
  orders,
  onChangeOrderStatus,
  onCancelOrder,
}: BoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenOrderModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
    console.log(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    try {
      setIsLoading(true);

      const newStatus =
        selectedOrder!.status === "WAITING" ? "IN_PRODUCTION" : "DONE";

      await api.patch(`/orders/${selectedOrder!._id}`, { status: newStatus });

      onChangeOrderStatus(selectedOrder!._id, newStatus);
    } catch (error) {
      console.log(error);
      toast.error(
        `Erro ao enviar o pedido da mesa ${selectedOrder!.table} para preparo.`
      );
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
      toast.success(
        `O pedido da mesa ${selectedOrder!.table} teve seu status alterado!`
      );
    }
  }

  async function handleCancelOrder() {
    try {
      setIsLoading(true);
      await api.delete(`/orders/${selectedOrder!._id}`);
    } catch (error) {
      console.log(error);
      toast.error(`Erro ao cancelar o pedido da mesa ${selectedOrder!.table}`);
    } finally {
      setIsLoading(false);
      onCancelOrder(selectedOrder!._id);
      handleCloseModal();
      toast.success(`O pedido da mesa ${selectedOrder!.table} foi cancelado!`);
    }
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
        onChangeOrderStatus={handleChangeOrderStatus}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
      />
    </div>
  );
}
