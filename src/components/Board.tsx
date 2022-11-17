import { Button } from "./Button";

export function Board() {
  return (
    <div className="p-4 border border-gray-200 rounded-2xl flex flex-col items-center shadow-md">
      <header className="p-2 text-sm flex items-center gap-2 pb-6">
        <span>🕖</span>
        <strong>Fila de espera</strong>
        <span>(1)</span>
      </header>

      <div className="w-full flex flex-col gap-6">
        <Button />
        <Button />
        <Button />
      </div>
    </div>
  );
}
