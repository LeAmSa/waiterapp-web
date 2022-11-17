import logo from "../assets/logo.svg";

export function Header() {
  return (
    <header className="h-48 bg-red text-gray-0 flex items-center justify-center">
      <div className="w-full px-4 max-w-7xl flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-3xl mb-2">Pedidos</h1>
          <h2 className="opacity-90">Acompanhe os pedidos do cliente</h2>
        </div>
        <img src={logo} alt="WAITERAPP" />
      </div>
    </header>
  );
}
