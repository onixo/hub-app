import {
  FileText, Car, Activity, ClipboardCheck,
  TicketCheck, Package, GraduationCap, ShieldCheck,
} from 'lucide-react'

export const ICONS = {
  FileText, Car, Activity, ClipboardCheck,
  TicketCheck, Package, GraduationCap, ShieldCheck,
}

export const APP_META = {
  autentique: { name: 'Autentique',  description: 'Portal de acesso, usuários e gestão do hub.', icon: 'ShieldCheck',    category: 'Acesso',    url: 'https://autentique.construtorauni.tech' },
  fiscalize:  { name: 'Fiscalize',   description: 'Cadastro de notas fiscais em obra.',           icon: 'FileText',       category: 'Obras',     url: 'https://fiscalize.construtorauni.tech' },
  quilometre: { name: 'Quilometre',  description: 'Controle de quilometragem de veículos.',       icon: 'Car',            category: 'Frotas',    url: 'https://quilometre.construtorauni.tech' },
  registre:   { name: 'Registre',    description: 'Helpdesk e registro de chamados internos.',    icon: 'TicketCheck',    category: 'Suporte',   url: 'https://registre.construtorauni.tech' },
  vistorie:   { name: 'Vistorie',    description: 'Vistoria de obras e inspeções técnicas.',      icon: 'ClipboardCheck', category: 'Obras',     url: 'https://vistorie.construtorauni.tech' },
  monitore:   { name: 'Monitore',    description: 'Monitoramento de scripts e automações RPA.',   icon: 'Activity',       category: 'Automação', url: 'https://monitore.construtorauni.tech' },
}

export const COMING_SOON_EXTRA = [
  { slug: 'patrimonio',   name: 'Patrimônio',   description: 'Controle de patrimônio da empresa.', icon: 'Package',       category: 'Gestão',   eta: 'Q1 2026' },
  { slug: 'universidade', name: 'UNIversidade', description: 'Plataforma de cursos corporativos.',  icon: 'GraduationCap', category: 'Educação', eta: 'Q2 2026' },
]

export const STATUS_CONFIG = {
  active:        { label: 'Ativo',      cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  maintenance:   { label: 'Manutenção', cls: 'bg-amber-50   text-amber-700   border border-amber-200'   },
  'coming-soon': { label: 'Em Breve',   cls: 'bg-slate-100  text-slate-600   border border-slate-200'   },
}
