import { LucideIcon } from 'lucide-react';
import { Badge } from './ui/badge';

interface AppCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  status: 'active' | 'maintenance' | 'coming-soon';
  statusDate?: string;
  url?: string;
}

export function AppCard({ icon: Icon, name, description, status, statusDate, url }: AppCardProps) {
  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return { className: 'bg-green-100 text-green-800 border-green-200', label: 'Ativo' };
      case 'maintenance':
        return { className: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Manutenção' };
      case 'coming-soon':
        return { className: 'bg-blue-100 text-blue-800 border-blue-200', label: statusDate || 'Em Breve' };
      default:
        return { className: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Indefinido' };
    }
  };

  const badgeConfig = getStatusBadge();

  const cardContent = (
    <div className="group relative bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl hover:border-[#0047BB] cursor-pointer">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#0047BB] to-[#0062E6] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <Badge variant="secondary" className={badgeConfig.className}>
            {badgeConfig.label}
          </Badge>
        </div>
        <div className="space-y-2">
          <h3 className="text-gray-900 group-hover:text-[#0047BB] transition-colors">{name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
        <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 text-[#0047BB] text-sm">
            <span>Acessar aplicativo</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}