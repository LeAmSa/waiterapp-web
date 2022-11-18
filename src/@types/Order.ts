export interface Order {
  _id: string;
  table: string;
  status: "WAITING" | "IN_PRODUCTION" | "DONE";
  products: {
    _id: string;
    quantity: number;
    product: {
      name: string;
      imagePath: string;
      price: number;
    };
  }[];
}

export enum IconsEnum {
  WAITING = "🕖",
  IN_PRODUCTION = "⌛️",
  DONE = "✅",
}

export enum NextStepIconsEnum {
  WAITING = "⌛️",
  IN_PRODUCTION = "✅",
  DONE = "✅",
}

export enum StatusTitlesEnum {
  WAITING = "Fila de espera",
  IN_PRODUCTION = "Preparando",
  DONE = "Pronto",
}

export enum ButtonTitlesEnum {
  WAITING = "Iniciar preparo",
  IN_PRODUCTION = "Concluir pedido",
  DONE = "Pronto",
}
