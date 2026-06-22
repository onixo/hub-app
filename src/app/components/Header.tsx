import logoImage from '../../assets/b9d542ddc4daf9255a2cb4b5f129c42b0c80b5e4.png';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e Título */}
          <div className="flex items-center gap-6">
            <img src={logoImage} alt="Construtora UNI" className="h-10 w-auto" />
            <div className="h-8 w-px bg-gray-200"></div>
            <div>
              <h1 className="text-gray-900">UNI Hub</h1>
              <p className="text-xs text-gray-500 mt-0.5">Central de sistemas digitais</p>
            </div>
          </div>

          {/* Menu Superior */}
          <nav className="flex items-center gap-6">
            <a href="#" className="text-gray-700 hover:text-[#0047BB] transition-colors text-sm">
              Suporte
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}