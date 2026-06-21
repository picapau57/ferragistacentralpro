import { Product, Client, Employee, Supplier, Sale, CashMovement, CRMLog, MarketingCampaign, PropagandaBanner, PurchaseOrder } from "./types";

export const initialSuppliers: Supplier[] = [
  {
    id: "forn-1",
    companyName: "Tigre S/A Tubos e Conexões",
    cnpj: "42.123.456/0001-99",
    contactName: "Reginaldo Silveira",
    phone: "(11) 98765-4321",
    whatsapp: "11987654321",
    email: "comercial@tigre.com.br",
    commercialConditions: "Faturado 30/60 dias, pedido mínimo R$ 1.500,00",
    contractDetails: "Contrato Anual N-4819. Desconto de 5% em toda linha de PVC."
  },
  {
    id: "forn-2",
    companyName: "Bosch Ferramentas Elétricas Ltda",
    cnpj: "60.456.789/0002-88",
    contactName: "Patrícia Souza",
    phone: "(19) 3874-5000",
    whatsapp: "1938745000",
    email: "atendimento@bosch.com.br",
    commercialConditions: "Faturado 15/30/45 dias sem juros",
    contractDetails: "Parceiro Ouro de Distribuição. Tabela de preços exclusiva para atacado."
  },
  {
    id: "forn-3",
    companyName: "Gedore Ferramentas Brasil",
    cnpj: "92.321.654/0001-22",
    contactName: "Marcelo Rodrigues",
    phone: "(51) 3589-9200",
    whatsapp: "5135899200",
    email: "vendas@gedore.com.br",
    commercialConditions: "À vista no PIX 3% desc ou Boleto 45D",
    contractDetails: "Garantia vitalícia em chaves mecânicas selecionadas."
  },
  {
    id: "forn-4",
    companyName: "Belgo Bekaert Arames Ltda",
    cnpj: "17.987.321/0001-55",
    contactName: "Fernando Prado",
    phone: "(31) 3218-1200",
    whatsapp: "3132181200",
    email: "distribuicao@belgo.com.br",
    commercialConditions: "Fator unitário por tonelada, pagamento 30D",
    contractDetails: "Fornecimento regular de pregos, telas e arames recozidos."
  }
];

export const initialProducts: Product[] = [
  {
    id: "prod-1",
    code: "FER-001",
    barcode: "7891000111222",
    description: "Martelo de Unha Polido 29mm Cabo de Madeira Gedore",
    category: "Ferramentas Manuais",
    subCategory: "Martelos",
    brand: "Gedore",
    unit: "UN",
    supplierId: "forn-3",
    supplierName: "Gedore Ferramentas Brasil",
    cost: 15.80,
    salePrice: 32.50,
    profitMargin: 105.7,
    stock: 24,
    stockMin: 10,
    stockMax: 50,
    location: "Corredor A, Prateleira 2, Gaveta 3",
    imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "prod-2",
    code: "FER-002",
    barcode: "7891000111333",
    description: "Parafusadeira/Furadeira de Impacto 12V Bosch GSB 120-LI",
    category: "Ferramentas Elétricas",
    subCategory: "Furadeiras e Parafusadeiras",
    brand: "Bosch",
    unit: "UN",
    supplierId: "forn-2",
    supplierName: "Bosch Ferramentas Elétricas Ltda",
    cost: 220.00,
    salePrice: 489.00,
    profitMargin: 122.2,
    stock: 2, // low stock alert!
    stockMin: 5,
    stockMax: 20,
    location: "Corredor B, Prateleira 1, Nicho Altura-Média",
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "prod-3",
    code: "HID-102",
    barcode: "7891555222012",
    description: "Tubo de PVC Soldável 25mm (3/4\") Barra 6m Tigre",
    category: "Materiais Hidráulicos",
    subCategory: "Tubos PVC",
    brand: "Tigre",
    unit: "UN",
    supplierId: "forn-1",
    supplierName: "Tigre S/A Tubos e Conexões",
    cost: 12.50,
    salePrice: 28.90,
    profitMargin: 131.2,
    stock: 8, // low stock!
    stockMin: 20,
    stockMax: 100,
    location: "Galpão Traseiro, Baia PVC-25",
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "prod-4",
    code: "FIX-501",
    barcode: "7893214561234",
    description: "Prego com Cabeça 18x27 (Pacote 1kg) Belgo",
    category: "Pregos",
    subCategory: "Pregos de Aço",
    brand: "Belgo",
    unit: "PCT",
    supplierId: "forn-4",
    supplierName: "Belgo Bekaert Arames Ltda",
    cost: 9.20,
    salePrice: 18.00,
    profitMargin: 95.6,
    stock: 45,
    stockMin: 15,
    stockMax: 80,
    location: "Corredor C, Prateleira 4, Caixa Metálica",
    imageUrl: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "prod-5",
    code: "EPI-010",
    barcode: "7895005001239",
    description: "Óculos de Proteção Antiembaçante Incolor Danny",
    category: "EPI",
    subCategory: "Proteção Visual",
    brand: "Danny",
    unit: "UN",
    supplierId: "forn-2",
    supplierName: "Bosch Ferramentas Elétricas Ltda",
    cost: 3.50,
    salePrice: 12.00,
    profitMargin: 242.8,
    stock: 120,
    stockMin: 30,
    stockMax: 200,
    location: "Corredor D, Prateleira 1, Próximo ao Caixa",
    imageUrl: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "prod-6",
    code: "PAR-012",
    barcode: "7899990102030",
    description: "Parafuso Sextavado Autotarraxante Zincado 4.2 x 13mm (Cento)",
    category: "Parafusos",
    subCategory: "Sextavados",
    brand: "Ciser",
    unit: "PCT",
    supplierId: "forn-4",
    supplierName: "Belgo Bekaert Arames Ltda",
    cost: 4.80,
    salePrice: 14.50,
    profitMargin: 202.0,
    stock: 75,
    stockMin: 10,
    stockMax: 100,
    location: "Corredor C, Prateleira 1, Gaveteiro Azul-35",
    imageUrl: "https://images.unsplash.com/photo-1530124564312-cc048de88bf1?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "prod-7",
    code: "TIN-021",
    barcode: "7891234567891",
    description: "Tinta Acrílica Premium Fosca Metalatex Branco Neve 18L Sherwin-Williams",
    category: "Tintas",
    subCategory: "Tintas Parede",
    brand: "Sherwin-Williams",
    unit: "UN",
    supplierId: "forn-2",
    supplierName: "Bosch Ferramentas Elétricas Ltda",
    cost: 165.00,
    salePrice: 349.90,
    profitMargin: 112.0,
    stock: 14,
    stockMin: 5,
    stockMax: 30,
    location: "Setor de Tintas, Corredor G, Palete Principal",
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=200"
  }
];

export const initialEmployees: Employee[] = [
  {
    id: "func-1",
    name: "Carlos Souza",
    document: "123.456.789-00",
    role: "Vendedor",
    department: "Balcão e Atendimento",
    salary: 1850.00,
    commissionRate: 2.5,
    permissions: {
      canSell: true,
      canManageStock: false,
      canViewFinance: false,
      canAccessAdmin: false
    },
    schedule: "08:00 - 18:00 (Sábado até 12h)",
    status: "active"
  },
  {
    id: "func-2",
    name: "Amanda Lima",
    document: "987.654.321-11",
    role: "Gerente",
    department: "Administração",
    salary: 3500.00,
    commissionRate: 1.0,
    permissions: {
      canSell: true,
      canManageStock: true,
      canViewFinance: true,
      canAccessAdmin: false
    },
    schedule: "08:00 - 18:00 (Sábado alternado)",
    status: "active"
  },
  {
    id: "func-3",
    name: "Robson Mendes",
    document: "456.789.123-22",
    role: "Estoquista",
    department: "Logística",
    salary: 1600.00,
    commissionRate: 0.0,
    permissions: {
      canSell: false,
      canManageStock: true,
      canViewFinance: false,
      canAccessAdmin: false
    },
    schedule: "07:30 - 17:30 (Semanal)",
    status: "active"
  }
];

export const initialClients: Client[] = [
  {
    id: "cli-1",
    type: "PF",
    name: "José da Silva Oliveira",
    document: "223.445.667-88",
    rg: "9.876.543-SSP/SP",
    phone: "(11) 98888-7711",
    whatsapp: "11988887711",
    email: "jose.oliveiradelphi@gmail.com",
    address: "Rua do Encanador Valente, 350 - Jd. Floresta, São Paulo - SP",
    creditLimit: 1500.00,
    balanceUsed: 350.00,
    notes: "Eletricista profissional. Dá preferência para cabos Sil e materiais Alumbra.",
    purchaseHistoryCount: 18
  },
  {
    id: "cli-2",
    type: "PJ",
    name: "Construtora Prumo Forte Ltda",
    document: "44.987.654/0001-32",
    stateEnrollment: "110.223.445.111",
    phone: "(11) 3214-9000",
    whatsapp: "1132149000",
    email: "compras@prumoforte.com.br",
    address: "Av. Industrial Paulista, 2400, Cj 12 - Centro, Campinas - SP",
    creditLimit: 15000.00,
    balanceUsed: 4200.00,
    notes: "Faturar sempre quinzenal mediante pedido de compra carimbado.",
    purchaseHistoryCount: 42
  },
  {
    id: "cli-3",
    type: "PF",
    name: "Marcos Pinheiro",
    document: "302.504.608-22",
    phone: "(11) 93456-1212",
    whatsapp: "11934561212",
    email: "marquinhos_reformas@outlook.com",
    address: "Rua dos Pinheiros, 77 - Pinheiros, São Paulo - SP",
    creditLimit: 500.00,
    balanceUsed: 0.00,
    notes: "Pedreiro autônomo. Costuma comprar pregos, argamassa e lixas à vista.",
    purchaseHistoryCount: 5
  }
];

export const initialSales: Sale[] = [
  {
    id: "venda-1",
    invoiceNumber: "NFCe-001042",
    type: "pdv",
    items: [
      { productId: "prod-1", description: "Martelo de Unha Polido 29mm Cabo de Madeira Gedore", quantity: 1, price: 32.50, unit: "UN" },
      { productId: "prod-4", description: "Prego com Cabeça 18x27 (Pacote 1kg) Belgo", quantity: 2, price: 18.00, unit: "PCT" }
    ],
    subtotal: 68.50,
    discount: 5.00,
    total: 63.50,
    paymentMethod: "pix",
    clientName: "Consumidor Final",
    sellerName: "Carlos Souza",
    sellerId: "func-1",
    date: "2026-06-20T10:30:00",
    isFiscalEmitted: true
  },
  {
    id: "venda-2",
    invoiceNumber: "NFe-000450",
    type: "pedido",
    items: [
      { productId: "prod-3", description: "Tubo de PVC Soldável 25mm (3/4\") Barra 6m Tigre", quantity: 10, price: 28.90, unit: "UN" },
      { productId: "prod-6", description: "Parafuso Sextavado Autotarraxante Zincado 4.2 x 13mm (Cento)", quantity: 5, price: 14.50, unit: "PCT" }
    ],
    subtotal: 361.50,
    discount: 11.50,
    total: 350.00,
    paymentMethod: "credito",
    clientId: "cli-1",
    clientName: "José da Silva Oliveira",
    sellerName: "Amanda Lima",
    sellerId: "func-2",
    date: "2026-06-20T14:15:00",
    isFiscalEmitted: true
  }
];

export const initialCashMovements: CashMovement[] = [
  {
    id: "fin-1",
    description: "Venda rápida de balcão - NFCe-001042",
    type: "entrada",
    category: "Vendas à Vista",
    amount: 63.50,
    paymentMethod: "PIX",
    date: "2026-06-20T10:30:00",
    status: "conciliado",
    costCenter: "Operacional Varejo"
  },
  {
    id: "fin-2",
    description: "Pagamento Construtora Prumo Forte Duplicata 41B",
    type: "entrada",
    category: "Recebimento de Clientes",
    amount: 1540.00,
    paymentMethod: "Boleto",
    date: "2026-06-19T16:00:00",
    status: "conciliado",
    costCenter: "Faturamento"
  },
  {
    id: "fin-3",
    description: "Conta de Energia Elétrica - CPFL",
    type: "saida",
    category: "Utilidades Públicas",
    amount: 380.00,
    paymentMethod: "Débito Automático",
    date: "2026-06-18T09:00:00",
    status: "conciliado",
    costCenter: "Administrativo"
  },
  {
    id: "fin-4",
    description: "Compra de Brocas e Parafusos Belgo",
    type: "saida",
    category: "Pagamento de Fornecedor",
    amount: 920.00,
    paymentMethod: "PIX",
    date: "2026-06-20T08:00:00",
    status: "pendente",
    costCenter: "Estoque/Compras"
  }
];

export const initialCRMLogs: CRMLog[] = [
  {
    id: "crm-1",
    clientId: "cli-2",
    clientName: "Construtora Prumo Forte Ltda",
    date: "2026-06-18T10:00:00",
    type: "whatsapp",
    summary: "Enviado orçamento dos tubos corrugados amarelos e luvas. Aguardando aprovação do engenheiro responsável.",
    followUpDate: "2026-06-21T10:00:00",
    status: "concluido"
  },
  {
    id: "crm-2",
    clientId: "cli-1",
    clientName: "José da Silva Oliveira",
    date: "2026-06-15T15:30:00",
    type: "ligacao",
    summary: "Parabenizado pelo aniversário de cadastro. Oferecido cupom de 10% de desconto na linha de ferramentas elétricas.",
    status: "concluido"
  }
];

export const initialCampaigns: MarketingCampaign[] = [
  {
    id: "camp-1",
    title: "🔔 Super Promocional Sábado de Tintas",
    channel: "whatsapp",
    audienceCount: 154,
    messageText: "Olá! Aproveite este Sábado de Tintas no Ferragista Central! Toda a linha Sherwin-Williams com 15% de desconto e parcelamento em até 6x s/ juros no cartão de crédito. Te aguardamos!",
    status: "enviado",
    dateCreated: "2026-06-19T09:00:00",
    dateSent: "2026-06-19T13:00:00"
  },
  {
    id: "camp-2",
    title: "⚡ Dia do Eletricista e Hidráulica",
    channel: "email",
    audienceCount: 89,
    messageText: "Prezado profissional parceiro, preparamos uma tabela diferenciada em conexões PVC Tigre e painéis de LED para esta semana. Confira clicando no link ou respondendo este email.",
    status: "rascunho",
    dateCreated: "2026-06-20T11:00:00"
  }
];

export const initialBanners: PropagandaBanner[] = [
  {
    id: "ad-1",
    title: "Super Feirão de Brocas Norton",
    imageUrl: "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&q=80&w=600",
    link: "https://www.nortonabrasivos.com.br",
    displayLocation: "lateral",
    active: true,
    impressions: 489,
    clicks: 34
  },
  {
    id: "ad-2",
    title: "Consórcio Bosch de Equipamentos",
    imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=600",
    link: "https://www.bosch.com.br",
    displayLocation: "topo",
    active: true,
    impressions: 219,
    clicks: 12
  }
];

export const initialPurchaseOrders: PurchaseOrder[] = [
  {
    id: "ped-com-1",
    supplierId: "forn-1",
    supplierName: "Tigre S/A Tubos e Conexões",
    items: [
      { productId: "prod-3", description: "Tubo de PVC Soldável 25mm (3/4\") Barra 6m Tigre", quantity: 50, cost: 12.50 }
    ],
    total: 625.00,
    status: "aprovado",
    dateCreated: "2026-06-19T08:30:00"
  }
];
