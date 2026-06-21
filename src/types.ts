export type UserRole = 'master_admin' | 'tenant_admin' | 'employee';

export interface Plan {
  id: 'basic' | 'professional' | 'enterprise';
  name: string;
  price: number;
  usersLimit: number;
  features: string[];
}

export interface Tenant {
  id: string; // Environment exclusive key
  companyName: string;
  responsibleName: string;
  document: string; // CPF or CNPJ
  stateEnrollment?: string; // Inscricao Estadual
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  selectedPlan: 'basic' | 'professional' | 'enterprise';
  usersCount: number;
  licenseStatus: 'active' | 'expired' | 'blocked';
  licenseExpiryDate: string;
  is2FAEnabled?: boolean;
  trialStartDate?: string;
  isSubscribed?: boolean;
}

export interface Product {
  id: string;
  code: string;
  barcode: string;
  description: string;
  category: 
    | 'Ferramentas Manuais'
    | 'Ferramentas Elétricas'
    | 'Materiais Hidráulicos'
    | 'Materiais Elétricos'
    | 'Parafusos'
    | 'Pregos'
    | 'Fixadores'
    | 'Solda'
    | 'Abrasivos'
    | 'EPI'
    | 'Tintas'
    | 'Vernizes'
    | 'Construção'
    | 'Jardinagem'
    | 'Equipamentos Industriais';
  subCategory?: string;
  brand: string;
  unit: 'UN' | 'KG' | 'M' | 'PCT' | 'CX';
  supplierId: string;
  supplierName: string;
  cost: number;
  salePrice: number;
  profitMargin: number; // calculated %
  stock: number;
  stockMin: number;
  stockMax: number;
  location: string; // ex: Corredor A, Prateleira 4, Gaveteiro 12
  imageUrl?: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productDescription: string;
  type: 'entrada' | 'saida' | 'transferencia' | 'ajuste' | 'inventario';
  quantity: number;
  date: string;
  user: string;
  reason: string;
}

export interface Client {
  id: string;
  type: 'PF' | 'PJ';
  name: string;
  document: string; // CPF or CNPJ
  rg?: string;
  stateEnrollment?: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  creditLimit: number;
  balanceUsed: number;
  notes?: string;
  purchaseHistoryCount: number;
}

export interface Employee {
  id: string;
  name: string;
  document: string;
  role: 'Vendedor' | 'Gerente' | 'Estoquista' | 'Caixa';
  department: string;
  salary: number;
  commissionRate: number; // in % (e.g. 2.5%)
  permissions: {
    canSell: boolean;
    canManageStock: boolean;
    canViewFinance: boolean;
    canAccessAdmin: boolean;
  };
  schedule: string; // ex: 08:00 - 18:00
  status: 'active' | 'inactive';
}

export interface Supplier {
  id: string;
  companyName: string;
  cnpj: string;
  contactName: string;
  phone: string;
  whatsapp: string;
  email: string;
  commercialConditions: string;
  contractDetails?: string;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  items: Array<{
    productId: string;
    description: string;
    quantity: number;
    cost: number;
  }>;
  total: number;
  status: 'pendente' | 'aprovado' | 'recebido';
  dateCreated: string;
  dateReceived?: string;
}

export interface Sale {
  id: string;
  invoiceNumber?: string; // NFC-e or NF-e string
  type: 'pdv' | 'orcamento' | 'pedido';
  items: Array<{
    productId: string;
    description: string;
    quantity: number;
    price: number;
    unit: string;
  }>;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'pix' | 'credito' | 'debito' | 'boleto' | 'dinheiro';
  clientName: string;
  clientId?: string;
  sellerName: string;
  sellerId?: string;
  date: string;
  isFiscalEmitted?: boolean;
}

export interface CashMovement {
  id: string;
  description: string;
  type: 'entrada' | 'saida';
  category: string; // ex: Vendas, Rec de Clientes, Pagto de Fornecedor, Salário, Energia, etc
  amount: number;
  paymentMethod: string;
  date: string;
  status: 'conciliado' | 'pendente';
  costCenter?: string; // Centro de Custo (ex: Operacional, Marketing, Administrativo)
}

export interface CRMLog {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  type: 'ligacao' | 'whatsapp' | 'email' | 'visita';
  summary: string;
  followUpDate?: string;
  status: 'concluido' | 'agendado';
}

export interface MarketingCampaign {
  id: string;
  title: string;
  channel: 'whatsapp' | 'sms' | 'email';
  audienceCount: number;
  messageText: string;
  status: 'rascunho' | 'enviado' | 'agendado';
  dateCreated: string;
  dateSent?: string;
}

export interface PropagandaBanner {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
  displayLocation: 'lateral' | 'topo' | 'login' | 'financeiro';
  active: boolean;
  impressions: number;
  clicks: number;
}
