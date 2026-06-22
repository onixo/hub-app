import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { AppCard } from './components/AppCard';
import { 
  FileText, 
  GraduationCap, 
  Package,
  Cpu,
  Search,
  Car
} from 'lucide-react';
import logoUNI from '../assets/46c6d041e957bce7f2e328d0d8972dd187445419.png';

interface App {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: 'active' | 'maintenance' | 'coming-soon';
  statusDate?: string;
  category: string;
  url?: string;
}

const apps: App[] = [
  {
    id: '4',
    name: 'Automações RPA',
    description: 'Sistema de automações e processos robóticos.',
    icon: Cpu,
    status: 'maintenance',
    category: 'Automação'
  },
  {
    id: '5',
    name: 'Controle de Quilometragem',
    description: 'Gestão de quilometragem de veículos.',
    icon: Car,
    status: 'coming-soon',
    statusDate: '2026/1',
    category: 'Frotas'
  },
  {
    id: '1',
    name: 'Fiscalize',
    description: 'App para cadastro de Notas fiscais em obra.',
    icon: FileText,
    status: 'active',
    category: 'Obras',
    url: 'https://app.construtorauni.tech'
  },
  {
    id: '3',
    name: 'Patrimônio',
    description: 'Controle de patrimônio da empresa.',
    icon: Package,
    status: 'coming-soon',
    statusDate: '2026/1',
    category: 'Gestão'
  },
  {
    id: '2',
    name: 'UNIversidade',
    description: 'Plataforma de cursos corporativos.',
    icon: GraduationCap,
    status: 'coming-soon',
    statusDate: '2026/2',
    category: 'Educação'
  }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alpha Version Banner */}
      <div className="sticky top-0 z-50 bg-gray-100 border-b border-gray-300 py-2">
        <div className="max-w-[1400px] mx-auto px-8">
          <p className="text-center text-sm text-gray-900">
            <span className="font-semibold">Versão Alpha</span> - Esta página está em desenvolvimento e pode sofrer alterações
          </p>
        </div>
      </div>

      {/* Hero Section com elementos geométricos */}
      <div className="relative bg-gradient-to-br from-[#0047BB] to-[#003A99] py-16 overflow-hidden">
        {/* Elementos geométricos decorativos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-1/4 w-64 h-1 bg-white/20"></div>
        <div className="absolute bottom-10 left-1/4 w-48 h-48 border border-white/10 rounded-full"></div>
        
        <div className="relative max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-10">
            <img src={logoUNI} alt="UNI Hub" className="h-[77px] mx-auto mb-4" />
            <p className="text-white/80 text-lg">Acesse todos os sistemas digitais da Construtora UNI em um só lugar</p>
          </div>
          
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Todos os Aplicativos */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-[#0047BB] rounded-full"></div>
              <h2 className="text-gray-900">
                {searchTerm ? 'Resultados da Busca' : 'Todos os Aplicativos'}
              </h2>
            </div>
            <p className="text-gray-500 text-sm">
              {filteredApps.length} {filteredApps.length === 1 ? 'aplicativo' : 'aplicativos'}
            </p>
          </div>
          
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredApps.map(app => (
                <AppCard
                  key={app.id}
                  icon={app.icon}
                  name={app.name}
                  description={app.description}
                  status={app.status}
                  statusDate={app.statusDate}
                  url={app.url}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-gray-900 mb-2">Nenhum aplicativo encontrado</h3>
              <p className="text-gray-500">Tente buscar com outros termos</p>
            </div>
          )}
        </section>

        {/* Stats Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl text-[#0047BB] mb-2">5</div>
              <p className="text-gray-600">Aplicativos Disponíveis</p>
            </div>
            <div>
              <div className="text-3xl text-[#0047BB] mb-2">1</div>
              <p className="text-gray-600">Sistema Ativo</p>
            </div>
            <div>
              <div className="text-3xl text-[#0047BB] mb-2">3</div>
              <p className="text-gray-600">Em Breve</p>
            </div>
            <div>
              <div className="text-3xl text-[#0047BB] mb-2">1</div>
              <p className="text-gray-600">Aplicativos em Manutenção</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>© 2025 Construtora UNI. Todos os direitos reservados.</p>
            <p>Suporte: <a href="mailto:ti@somosauni.com.br" className="text-[#0047BB] hover:underline">ti@somosauni.com.br</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}