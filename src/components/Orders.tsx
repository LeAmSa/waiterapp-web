import { useEffect, useState } from "react";
import { Order } from "../@types/Order";
import { api } from "../utils/api";
import { Board } from "./Board";

import socketIo from "socket.io-client";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function getOrders() {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancelOrder(orderId: string) {
    setOrders((prev) => prev.filter((order) => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order["status"]) {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status } : order
      )
    );
  }

  useEffect(() => {
    const socket = socketIo(import.meta.env.VITE_API_BASE_URL, {
      transports: ["websocket"],
    });

    socket.on("orders@new", (order) => {
      setOrders((prev) => prev.concat(order));
    });
  }, []);

  useEffect(() => {
    getOrders();
  }, []);

  const waitingOrders = orders.filter((order) => order.status === "WAITING");
  const productionOrders = orders.filter(
    (order) => order.status === "IN_PRODUCTION"
  );
  const doneOrders = orders.filter((order) => order.status === "DONE");

  return (
    <div className="w-full mx-auto px-4 mt-10 mb-10 max-w-7xl grid grid-cols-3 gap-8">
      <Board
        title="Fila de espera"
        icon="WAITING"
        orders={waitingOrders}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <Board
        title="Preparando"
        icon="IN_PRODUCTION"
        orders={productionOrders}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <Board
        title="Pronto"
        icon="DONE"
        orders={doneOrders}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </div>
  );
}
