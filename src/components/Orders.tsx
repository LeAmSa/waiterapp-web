import { Board } from "./Board";

export function Orders() {
  return (
    <div className="w-full mx-auto px-4 mt-10 mb-10 max-w-7xl grid grid-cols-3 gap-8">
      <Board />
      <Board />
      <Board />
    </div>
  );
}
