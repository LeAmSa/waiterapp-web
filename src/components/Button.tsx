interface ButtonProps {
  table: string;
  items: number;
  onClick: () => void;
}

export function Button({ table, items, onClick }: ButtonProps) {
  return (
    <button
      className="w-full bg-gray-0 border border-gray-200 rounded-lg h-32 flex flex-col gap-1 items-center justify-center"
      onClick={onClick}
    >
      <strong className="text-gray-500 font-semibold">Mesa {table}</strong>
      <span className="text-sm text-gray-400">{items} item(s)</span>
    </button>
  );
}
