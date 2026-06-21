/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  initialProducts, 
  initialClients, 
  initialEmployees, 
  initialSales, 
  initialCashMovements, 
  initialCRMLogs, 
  initialCampaigns, 
  initialBanners, 
  initialSuppliers,
  initialPurchaseOrders 
} from "./initialData";
import { 
  Product, 
  Client, 
  Employee, 
  Supplier, 
  Sale, 
  CashMovement, 
  CRMLog, 
  MarketingCampaign, 
  PropagandaBanner, 
  PurchaseOrder,
  Tenant
} from "./types";
import POSView from "./components/POSView";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  MessageSquare, 
  Sparkles, 
  ShieldAlert, 
  FileText, 
  Search, 
  Plus, 
  RefreshCw, 
  Printer, 
  Bell, 
  X, 
  Check, 
  AlertTriangle, 
  Download, 
  Smartphone, 
  CheckCircle,
  Menu,
  ChevronRight,
  TrendingDown,
  Info,
  Layers,
  Lock,
  Percent,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Authentication & Plan Selection
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentTenant, setCurrentTenant] = useState<Tenant>({
    id: "ten-901",
    companyName: "Ferragista & Tintas Central Ltda",
    responsibleName: "Mário Pinheiro de Souza",
    document: "12.345.678/0001-90",
    stateEnrollment: "110.223.445.111",
    phone: "(11) 98765-4321",
    whatsapp: "11987654321",
    email: "contato@ferragistacentral.com.br",
    address: "Avenida Central do Comércio, 450",
    city: "São Paulo",
    state: "SP",
    zipCode: "01311-000",
    selectedPlan: "professional",
    usersCount: 3,
    licenseStatus: "active",
    licenseExpiryDate: "2026-07-15",
    trialStartDate: "2026-06-18",
    isSubscribed: false,
  });

  // State Management
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [cashMovements, setCashMovements] = useState<CashMovement[]>(initialCashMovements);
  const [crmLogs, setCrmLogs] = useState<CRMLog[]>(initialCRMLogs);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(initialCampaigns);
  const [banners, setBanners] = useState<PropagandaBanner[]>(initialBanners);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(initialPurchaseOrders);

  // 5 Days Trial Simulation States
  const [simulatedTrialDay, setSimulatedTrialDay] = useState<number>(3);

  // Mailchimp Integration Setup
  const [mailchimpKey, setMailchimpKey] = useState<string>("us102-39fbc80123efd67123aa12fc111-us21");
  const [mailchimpAudienceId, setMailchimpAudienceId] = useState<string>("list-8091a1");
  const [mailchimpConnected, setMailchimpConnected] = useState<boolean>(true);
  const [mailchimpSyncing, setMailchimpSyncing] = useState<boolean>(false);
  const [mailchimpLogs, setMailchimpLogs] = useState<string[]>([
    "Sincronização agendada ativa em nuvem.",
    "Mapeamento de banco de dados ERP → Mailchimp concluído com sucesso."
  ]);

  // WhatsApp Gateway Setup
  const [whatsappInstanceId, setWhatsappInstanceId] = useState<string>("inst_902abc_central");
  const [whatsappToken, setWhatsappToken] = useState<string>("3f1a2b3c4d5e6f7g8h9i0j");
  const [whatsappConnected, setWhatsappConnected] = useState<boolean>(true);
  const [whatsappDelay, setWhatsappDelay] = useState<number>(5);
  const [whatsappOptOut, setWhatsappOptOut] = useState<boolean>(true);
  const [whatsappApprovedTemplate, setWhatsappApprovedTemplate] = useState<string>("recompra");
  const [whatsappSending, setWhatsappSending] = useState<boolean>(false);
  const [whatsappLogs, setWhatsappLogs] = useState<string[]>([
    "Fila de envio inicializada limpa.",
    "Conexão com servidor oficial do WhatsApp API (Meta Business API) restabelecida."
  ]);

  // Segmentation Filters Setup
  const [segmentType, setSegmentType] = useState<string>("Todos");
  const [segmentLoyalty, setSegmentLoyalty] = useState<string>("Todos");
  const [segmentCategory, setSegmentCategory] = useState<string>("Todos");
  const [segmentLocation, setSegmentLocation] = useState<string>("Todos");

  // Active Navigation Configuration
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Product Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  // Registration states for client and products
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);

  // AI assistant simulation and request values
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);

  // Sign up state if not authenticated
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [regForm, setRegForm] = useState({
    companyName: "",
    responsibleName: "",
    document: "",
    stateEnrollment: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    selectedPlan: "professional" as 'basic' | 'professional' | 'enterprise'
  });

  // Temporary item models for additions
  const [newProduct, setNewProduct] = useState({
    code: "",
    barcode: "",
    description: "",
    category: "Ferramentas Manuais" as any,
    subCategory: "",
    brand: "",
    unit: "UN" as any,
    supplierId: "forn-1",
    cost: "0",
    salePrice: "0",
    stock: "0",
    stockMin: "0",
    stockMax: "0",
    location: "",
    imageUrl: ""
  });

  const [newClient, setNewClient] = useState({
    type: "PF" as "PF" | "PJ",
    name: "",
    document: "",
    rg: "",
    stateEnrollment: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    creditLimit: "1000",
    notes: ""
  });

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    document: "",
    role: "Vendedor" as any,
    department: "Vendas",
    salary: "1850",
    commissionRate: "2.5",
    schedule: "08:00 - 18:00",
    canSell: true,
    canManageStock: false,
    canViewFinance: false,
    canAccessAdmin: false
  });

  const [newSupplier, setNewSupplier] = useState({
    companyName: "",
    cnpj: "",
    contactName: "",
    phone: "",
    whatsapp: "",
    email: "",
    commercialConditions: "",
    contractDetails: ""
  });

  // Backup & Import states
  const [lastBackupTime, setLastBackupTime] = useState<string>("Hoje às 08:30");
  const [isBackingUp, setIsBackingUp] = useState(false);

  // Initial trigger for AI advice on component mount
  useEffect(() => {
    fetchAiAdvice();
  }, []);

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      setLastBackupTime(new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }) + " (Nuvem Central Sincronizada)");
    }, 1200);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.companyName || !regForm.document || !regForm.email) {
      alert("Preencha todos os campos obrigatórios (Empresa, Documento e E-mail)!");
      return;
    }
    const usersLimit = regForm.selectedPlan === 'basic' ? 1 : regForm.selectedPlan === 'professional' ? 10 : 999;
    
    const newTenant: Tenant = {
      id: `ten-${Math.floor(100 + Math.random() * 900)}`,
      companyName: regForm.companyName,
      responsibleName: regForm.responsibleName,
      document: regForm.document,
      stateEnrollment: regForm.stateEnrollment,
      phone: regForm.phone,
      whatsapp: regForm.whatsapp,
      email: regForm.email,
      address: regForm.address,
      city: regForm.city,
      state: regForm.state,
      zipCode: regForm.zipCode,
      selectedPlan: regForm.selectedPlan,
      usersCount: 1,
      licenseStatus: "active",
      licenseExpiryDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0], // 30 days trial
      trialStartDate: new Date().toISOString().split('T')[0],
      isSubscribed: false
    };

    setCurrentTenant(newTenant);
    setIsAuthenticated(true);
    setIsRegistering(false);
  };

  const fetchAiAdvice = async () => {
    setIsLoadingAI(true);
    try {
      const lowStockProducts = products.filter(p => p.stock <= p.stockMin);
      const topSelling = products.slice(0, 3);
      
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: products.map(p => ({ description: p.description, stock: p.stock, brand: p.brand })),
          sales: sales.map(s => ({ total: s.total, itemsCount: s.items.length })),
          lowStock: lowStockProducts.map(p => ({ description: p.description, stock: p.stock, stockMin: p.stockMin })),
          mostSold: topSelling.map(p => ({ description: p.description, category: p.category }))
        })
      });
      const data = await response.json();
      setAiAnalysis(data.text || "Falha ao obter conselho do assistente de IA.");
    } catch (e) {
      console.error(e);
      setAiAnalysis("Sua rede está desconectada ou a API de IA está indisponível.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Add handlers
  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const costNum = parseFloat(newProduct.cost) || 0;
    const saleNum = parseFloat(newProduct.salePrice) || 0;
    const profit = costNum > 0 ? Math.round(((saleNum - costNum) / costNum) * 100) : 100;
    
    const productItem: Product = {
      id: `prod-${Date.now()}`,
      code: newProduct.code || `PROD-${Math.floor(1000 + Math.random() * 9000)}`,
      barcode: newProduct.barcode || String(Math.floor(7890000000000 + Math.random() * 999999999)),
      description: newProduct.description,
      category: newProduct.category,
      subCategory: newProduct.subCategory,
      brand: newProduct.brand || "Geral",
      unit: newProduct.unit,
      supplierId: newProduct.supplierId,
      supplierName: suppliers.find(s => s.id === newProduct.supplierId)?.companyName || "Fornecedor Local",
      cost: costNum,
      salePrice: saleNum,
      profitMargin: profit,
      stock: parseInt(newProduct.stock) || 0,
      stockMin: parseInt(newProduct.stockMin) || 10,
      stockMax: parseInt(newProduct.stockMax) || 100,
      location: newProduct.location || "Corredor Geral",
      imageUrl: newProduct.imageUrl || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=200"
    };

    setProducts([productItem, ...products]);
    setShowAddProductModal(false);
    // Reset product form
    setNewProduct({
      code: "", barcode: "", description: "", category: "Ferramentas Manuais",
      subCategory: "", brand: "", unit: "UN", supplierId: "forn-1",
      cost: "0", salePrice: "0", stock: "0", stockMin: "0", stockMax: "0",
      location: "", imageUrl: ""
    });
  };

  const handleAddNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    const clientItem: Client = {
      id: `cli-${Date.now()}`,
      type: newClient.type,
      name: newClient.name,
      document: newClient.document,
      rg: newClient.rg,
      stateEnrollment: newClient.stateEnrollment,
      phone: newClient.phone,
      whatsapp: newClient.whatsapp || newClient.phone,
      email: newClient.email,
      address: newClient.address,
      creditLimit: parseFloat(newClient.creditLimit) || 0,
      balanceUsed: 0,
      notes: newClient.notes,
      purchaseHistoryCount: 0
    };

    setClients([clientItem, ...clients]);
    setShowAddClientModal(false);
    setNewClient({
      type: "PF", name: "", document: "", rg: "", stateEnrollment: "",
      phone: "", whatsapp: "", email: "", address: "", creditLimit: "1000", notes: ""
    });
  };

  const handleAddNewEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const employeeItem: Employee = {
      id: `func-${Date.now()}`,
      name: newEmployee.name,
      document: newEmployee.document,
      role: newEmployee.role,
      department: newEmployee.department,
      salary: parseFloat(newEmployee.salary) || 1850,
      commissionRate: parseFloat(newEmployee.commissionRate) || 2.5,
      permissions: {
        canSell: newEmployee.canSell,
        canManageStock: newEmployee.canManageStock,
        canViewFinance: newEmployee.canViewFinance,
        canAccessAdmin: newEmployee.canAccessAdmin
      },
      schedule: newEmployee.schedule,
      status: "active"
    };

    setEmployees([...employees, employeeItem]);
    setShowAddEmployeeModal(false);
  };

  const handleAddNewSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const supplierItem: Supplier = {
      id: `forn-${Date.now()}`,
      companyName: newSupplier.companyName,
      cnpj: newSupplier.cnpj,
      contactName: newSupplier.contactName,
      phone: newSupplier.phone,
      whatsapp: newSupplier.whatsapp || newSupplier.phone,
      email: newSupplier.email,
      commercialConditions: newSupplier.commercialConditions,
      contractDetails: newSupplier.contractDetails
    };

    setSuppliers([...suppliers, supplierItem]);
    setShowAddSupplierModal(false);
  };

  // Trigger when POS completes a sale
  const handleCompleteSale = (completedSale: Sale, updatedProductsList: Product[]) => {
    setSales([completedSale, ...sales]);
    setProducts(updatedProductsList);

    // Add entry to cash flow
    const cashEntry: CashMovement = {
      id: `fin-${Date.now()}`,
      description: `Venda ${completedSale.invoiceNumber} - PDV (${completedSale.clientName})`,
      type: "entrada",
      category: "Vendas à Vista",
      amount: completedSale.total,
      paymentMethod: completedSale.paymentMethod,
      date: completedSale.date,
      status: "conciliado",
      costCenter: "PDV Frente Caixa"
    };
    setCashMovements([cashEntry, ...cashMovements]);

    // Update client balance if not Consumidor
    if (completedSale.clientId) {
      setClients(clients.map(c => {
        if (c.id === completedSale.clientId) {
          return {
            ...c,
            balanceUsed: c.balanceUsed + completedSale.total,
            purchaseHistoryCount: c.purchaseHistoryCount + 1
          };
        }
        return c;
      }));
    }
  };

  // Categories list specific to hardware stores
  const categoriesList = [
    "Todos", "Ferramentas Manuais", "Ferramentas Elétricas", "Materiais Hidráulicos",
    "Materiais Elétricos", "Parafusos", "Pregos", "Fixadores", "Solda",
    "Abrasivos", "EPI", "Tintas", "Vernizes", "Construção", "Jardinagem", "Equipamentos Industriais"
  ];

  // Calculations for Dashboard
  const today = "2026-06-20";
  const todaySales = sales.filter(s => s.date.startsWith(today));
  const todaySalesTotal = todaySales.reduce((acc, s) => acc + s.total, 0);

  const currentMonthSales = sales.reduce((acc, s) => acc + s.total, 0);
  const lowStockCount = products.filter(p => p.stock <= p.stockMin).length;

  // Accounts receivable simulator
  const accountsReceivable = clients.reduce((acc, c) => acc + c.balanceUsed, 0);
  const accountsPayable = purchaseOrders.filter(po => po.status === 'aprovado').reduce((acc, po) => acc + po.total, 0);

  // Active advertisements / banners shown in sidebar or bottom
  const activePromoBanner = banners.find(b => b.active);

  return (
    <div id="saas-main-viewport" className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      
      {/* LICENSE STATUS BLOCK SIMULATOR CHECK overlay */}
      {currentTenant.licenseStatus !== 'active' && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full bg-slate-900 border border-red-500/50 rounded-2xl p-6 shadow-2xl text-center">
            <Lock className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold font-display text-white mb-2">LICENÇA BLOQUEADA OU EXPIRADA</h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              O sistema detectou que a assinatura da sua empresa <strong>{currentTenant.companyName}</strong> está pendente de renovação técnica ou está bloqueada temporariamente.
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6">
              <span className="text-[10px] text-zinc-500 uppercase font-black">PIX COBRANÇA AUTOMÁTICO</span>
              <div className="flex justify-center my-3 bg-white p-2 rounded-lg max-w-[150px] mx-auto">
                {/* Simulated QR Code */}
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020126580014BR.GOV.BCB.PIX013600000000000000000000000000000000520400005303986540559.905802BR5915SaaSFerragista6009SaoPaulo62070503***63041A2D" 
                  alt="Pix QR Code" 
                  className="w-32 h-32"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400">Total do Plano Profissional:</p>
                <p className="text-lg font-bold text-emerald-400">R$ 59,90 / mês</p>
                <div className="mt-2 text-[9px] text-zinc-500">Chave PIX Copie e Cole abaixo:</div>
                <input 
                  type="text" 
                  readOnly 
                  value="00020126580014BR.GOV.BCB.PIX..." 
                  className="w-full text-center text-[10px] bg-slate-900 text-slate-300 font-mono p-1 rounded border border-white/5"
                />
              </div>
            </div>

            <button 
              onClick={() => {
                setCurrentTenant({ ...currentTenant, licenseStatus: 'active' });
                alert("Simulação de confirmação: PIX compensado com sucesso! Licença restabelecida.");
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-colors cursor-pointer"
            >
              Simular Confirmação do Pagamento / Registrar Licença
            </button>
          </div>
        </div>
      )}

      {/* 5 DAYS TRIAL EXPIRED BLOCK OVERLAY */}
      {simulatedTrialDay > 5 && !currentTenant.isSubscribed && isAuthenticated && (
        <div id="trial-expired-blocker" className="fixed inset-0 bg-slate-950/98 backdrop-blur-md flex items-center justify-center z-55 z-50 p-4">
          <div className="max-w-xl w-full bg-slate-900 border-2 border-amber-500/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-500/15 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10 mb-2">
                <Lock className="w-8 h-8 text-amber-500 animate-pulse" />
              </div>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-extrabold">período de testes encerrado</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">Seus 5 Dias Gratuitos Expiraram</h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                Prezado <strong>{currentTenant.responsibleName || "Parceiro"}</strong>, a sua empresa <strong>{currentTenant.companyName}</strong> atingiu o limite de 5 dias de degustação sem limite de recursos.
              </p>
              <p className="text-yellow-400 text-xs font-semibold py-1 px-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg inline-block">
                🚫 Todas as operações de vendas, estoque e CRM estão suspensas temporariamente.
              </p>
            </div>

            {/* Plan selection within the blocker to immediately unlock and pay! */}
            <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-350 uppercase tracking-widest text-center">Ativar Assinatura Mensal Instantânea</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div 
                  onClick={() => setCurrentTenant({ ...currentTenant, selectedPlan: 'basic' })}
                  className={`p-3.5 border rounded-xl cursor-pointer transition-all ${currentTenant.selectedPlan === 'basic' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'}`}
                >
                  <h4 className="font-bold text-xs text-white">Plano Básico</h4>
                  <div className="text-base font-black text-amber-500 mt-1">R$ 39,90<span className="text-[10px] text-slate-400">/m</span></div>
                  <span className="text-[8px] text-zinc-500 block mt-1">1 Usuário • Estoque</span>
                </div>
                
                <div 
                  onClick={() => setCurrentTenant({ ...currentTenant, selectedPlan: 'professional' })}
                  className={`p-3.5 border rounded-xl cursor-pointer transition-all ${currentTenant.selectedPlan === 'professional' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'}`}
                >
                  <h4 className="font-bold text-xs text-white flex justify-between">
                    <span>Profissional</span>
                    <span className="text-[7px] bg-amber-500 text-slate-900 px-1 rounded uppercase">PROMO</span>
                  </h4>
                  <div className="text-base font-black text-amber-500 mt-1">R$ 59,90<span className="text-[10px] text-slate-400">/m</span></div>
                  <span className="text-[8px] text-zinc-500 block mt-1">10 Usuários • DFC completo</span>
                </div>

                <div 
                  onClick={() => setCurrentTenant({ ...currentTenant, selectedPlan: 'enterprise' })}
                  className={`p-3.5 border rounded-xl cursor-pointer transition-all ${currentTenant.selectedPlan === 'enterprise' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'}`}
                >
                  <h4 className="font-bold text-xs text-white">Empresarial</h4>
                  <div className="text-base font-black text-amber-500 mt-1">R$ 99,90<span className="text-[10px] text-slate-400">/m</span></div>
                  <span className="text-[8px] text-zinc-500 block mt-1">Multiempresa • Ilimitado</span>
                </div>
              </div>

              {/* Fake payment processor */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Plano Selecionado:</span>
                  <span className="font-bold text-white capitalize">{currentTenant.selectedPlan}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Valor Assinatura:</span>
                  <span className="font-black text-emerald-400">
                    {currentTenant.selectedPlan === 'basic' ? 'R$ 39,90' : currentTenant.selectedPlan === 'professional' ? 'R$ 59,90' : 'R$ 99,90'} / mês
                  </span>
                </div>

                <button 
                  onClick={() => {
                    setCurrentTenant({ ...currentTenant, isSubscribed: true });
                    alert(`Obrigado! Assinatura do ${currentTenant.selectedPlan.toUpperCase()} ativada com sucesso via Mercado Pago / PIX! Todas as operações do Ferragista Central estão desbloqueadas.`);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 font-bold text-slate-950 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 border-none"
                >
                  <CheckCircle className="w-4 h-4" />
                  Efetuar Pagamento & Desbloquear Imediatamente
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-850 p-2 text-[10px] text-zinc-500 rounded text-center">
                Dúvidas ou suporte com a fatura? Entre em contato pelo financeiro@centralerp.com
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER MASTER REGISTRATION SCREEN IF NOT AUTHENTICATED */}
      {!isAuthenticated ? (
        <div className="flex-1 overflow-y-auto bg-slate-950 flex flex-col items-center justify-center py-12 px-4 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/50 via-slate-950 to-slate-950 z-0"></div>
          
          <div className="max-w-2xl w-full bg-slate-900/80 backdrop-blur-lg border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
            <div className="text-center mb-8">
              <span className="bg-amber-500/10 text-amber-400 text-xs font-bold font-mono px-3 py-1 rounded-full uppercase tracking-wider">
                SaaS Central ERP Ferragens
              </span>
              <h1 className="text-4xl font-extrabold text-white font-display mt-3">Cadastro de Assinante</h1>
              <p className="text-slate-400 text-sm mt-1">
                Ambiente exclusivo e conectado. Gerencie sua loja de ferramentas e ferragens com segurança.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nome da Empresa *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ferragista Parafuso Certo ME"
                    value={regForm.companyName}
                    onChange={(e) => setRegForm({ ...regForm, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nome do Responsável *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nome completo do administrador"
                    value={regForm.responsibleName}
                    onChange={(e) => setRegForm({ ...regForm, responsibleName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">CPF/CNPJ *</label>
                  <input
                    type="text"
                    required
                    placeholder="00.000.000/0001-00"
                    value={regForm.document}
                    onChange={(e) => setRegForm({ ...regForm, document: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Inscrição Est.</label>
                  <input
                    type="text"
                    placeholder="Opcional"
                    value={regForm.stateEnrollment}
                    onChange={(e) => setRegForm({ ...regForm, stateEnrollment: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">WhatsApp</label>
                  <input
                    type="text"
                    placeholder="Ex: (11) 99999-8888"
                    value={regForm.whatsapp}
                    onChange={(e) => setRegForm({ ...regForm, whatsapp: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">E-mail Corporativo *</label>
                  <input
                    type="email"
                    required
                    placeholder="Ex: contato@suaferragista.com"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Endereço Completo</label>
                <input
                  type="text"
                  placeholder="Rua, número, bairro..."
                  value={regForm.address}
                  onChange={(e) => setRegForm({ ...regForm, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Cidade</label>
                  <input
                    type="text"
                    placeholder="São Paulo"
                    value={regForm.city}
                    onChange={(e) => setRegForm({ ...regForm, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Estado</label>
                  <input
                    type="text"
                    placeholder="SP"
                    value={regForm.state}
                    onChange={(e) => setRegForm({ ...regForm, state: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">CEP</label>
                  <input
                    type="text"
                    placeholder="00000-00"
                    value={regForm.zipCode}
                    onChange={(e) => setRegForm({ ...regForm, zipCode: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* TIERED SUBSCRIPTION SELECTOR PLANS */}
              <div className="border-t border-slate-800 pt-6">
                <h3 className="text-sm font-bold text-white mb-3">Escolha seu Plano de Assinatura:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div 
                    onClick={() => setRegForm({ ...regForm, selectedPlan: 'basic' })}
                    className={`border p-4 rounded-xl cursor-pointer transition-all ${regForm.selectedPlan === 'basic' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
                  >
                    <div className="text-sm font-black text-white">Plano Básico</div>
                    <div className="text-xl font-bold text-amber-500 mt-1">R$ 39,90<span className="text-[10px] text-slate-400">/mês</span></div>
                    <ul className="text-[9px] text-zinc-400 mt-2 space-y-1">
                      <li>• 1 Usuário cadastrado</li>
                      <li>• Controle de Estoque</li>
                      <li>• Cadastro de Clientes</li>
                      <li>• Relatórios Simplificados</li>
                    </ul>
                  </div>

                  <div 
                    onClick={() => setRegForm({ ...regForm, selectedPlan: 'professional' })}
                    className={`border p-4 rounded-xl cursor-pointer transition-all ${regForm.selectedPlan === 'professional' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
                  >
                    <div className="text-sm font-black text-white flex justify-between">
                      <span>Profissional</span>
                      <span className="text-[8px] bg-amber-500 text-slate-950 font-black px-1.5 rounded uppercase">POPULAR</span>
                    </div>
                    <div className="text-xl font-bold text-amber-500 mt-1">R$ 59,90<span className="text-[10px] text-slate-400">/mês</span></div>
                    <ul className="text-[9px] text-zinc-400 mt-2 space-y-1">
                      <li>• Até 10 Usuários ativos</li>
                      <li>• Controle Fianceiro Completo</li>
                      <li>• Relatórios Avançados</li>
                      <li>• Gestão de Funcionários</li>
                    </ul>
                  </div>

                  <div 
                    onClick={() => setRegForm({ ...regForm, selectedPlan: 'enterprise' })}
                    className={`border p-4 rounded-xl cursor-pointer transition-all ${regForm.selectedPlan === 'enterprise' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
                  >
                    <div className="text-sm font-black text-white">Empresarial</div>
                    <div className="text-xl font-bold text-amber-500 mt-1">R$ 99,90<span className="text-[10px] text-slate-400">/mês</span></div>
                    <ul className="text-[9px] text-zinc-400 mt-2 space-y-1">
                      <li>• Usuários Ilimitados</li>
                      <li>• Módulo Multiempresa</li>
                      <li>• API & IA Integradas</li>
                      <li>• Inteligência Artificial Ativa</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* INTEGRATED MERCADO PAGO METODOS DE PAGAMENTO */}
              <div className="border-t border-slate-800 pt-6">
                <span className="text-xs text-slate-400 uppercase font-bold">Cobrança Integrada via Mercado Pago</span>
                <p className="text-[10px] text-zinc-500 mb-2">Seus dados estão protegidos via criptografia SSL. Escolha o método de preferência.</p>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold text-slate-300">
                  <div className="p-2 border border-slate-800 rounded bg-slate-900 hover:border-slate-700 cursor-pointer">⚡ PIX</div>
                  <div className="p-2 border border-slate-800 rounded bg-slate-900 hover:border-slate-700 cursor-pointer">💳 Crédito</div>
                  <div className="p-2 border border-slate-800 rounded bg-slate-900 hover:border-slate-700 cursor-pointer">💳 Débito</div>
                  <div className="p-2 border border-slate-800 rounded bg-slate-900 hover:border-slate-700 cursor-pointer">📄 Boleto</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-amber-500 hover:bg-amber-600 font-bold rounded-lg text-slate-950 transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  Ativar Minha Assinatura & Gerar Ambiente
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // SAAS MAIN RENDER
        <div className="flex-1 flex overflow-hidden">
          
          {/* SIDEBAR NAVIGATION PANEL */}
          <aside className={`bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              {!isSidebarCollapsed && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-base">F</div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black tracking-wider text-slate-200">FERRAGISTA</span>
                    <span className="text-[9px] text-indigo-400 uppercase font-mono tracking-widest font-black">Central SaaS</span>
                  </div>
                </div>
              )}
              {isSidebarCollapsed && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-base mx-auto">F</div>
              )}
              <button 
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
                className="p-1 hover:bg-slate-800 rounded text-slate-400 cursor-pointer"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>

            {/* QUICK LINK STATUS BADGE */}
            {!isSidebarCollapsed && (
              <div className="m-3 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/40 text-[10px]">
                <div className="flex items-center gap-1.5 mb-1 text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Conexão Nuvem Ativa</span>
                </div>
                <div className="text-zinc-500 truncate">Empresa: {currentTenant.companyName}</div>
              </div>
            )}

            {/* NAVIGATION MENU */}
            <nav className="flex-1 py-4 space-y-1 overflow-y-auto px-2">
              <div className={`px-2 py-1 text-[10px] font-mono uppercase text-indigo-400/70 tracking-widest ${isSidebarCollapsed ? 'text-center' : ''}`}>Operação</div>
              
              <button 
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${activeTab === 'dashboard' ? 'bg-indigo-900/40 border-l-4 border-indigo-500 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
              >
                <LayoutDashboard className="w-4.5 h-4.5" />
                {!isSidebarCollapsed && <span>Dashboard ERP</span>}
              </button>

              <button 
                onClick={() => setActiveTab("produtos")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${activeTab === 'produtos' ? 'bg-indigo-900/40 border-l-4 border-indigo-500 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
              >
                <Package className="w-4.5 h-4.5" />
                {!isSidebarCollapsed && <span>Produtos / Estoque</span>}
              </button>

              <button 
                onClick={() => setActiveTab("vendas")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${activeTab === 'vendas' ? 'bg-indigo-900/40 border-l-4 border-indigo-500 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
              >
                <ShoppingCart className="w-4.5 h-4.5" />
                {!isSidebarCollapsed && <span>PDV / Frente de Caixa</span>}
              </button>

              <button 
                onClick={() => setActiveTab("financeiro")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${activeTab === 'financeiro' ? 'bg-indigo-900/40 border-l-4 border-indigo-500 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
              >
                <DollarSign className="w-4.5 h-4.5" />
                {!isSidebarCollapsed && <span>Financeiro DFC</span>}
              </button>

              <div className={`pt-4 px-2 py-1 text-[10px] font-mono uppercase text-indigo-400/70 tracking-widest ${isSidebarCollapsed ? 'text-center' : ''}`}>Parceiros</div>

              <button 
                onClick={() => setActiveTab("clientes")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${activeTab === 'clientes' ? 'bg-indigo-900/40 border-l-4 border-indigo-500 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
              >
                <Users className="w-4.5 h-4.5" />
                {!isSidebarCollapsed && <span>Clientes & CRM</span>}
              </button>

              <button 
                onClick={() => setActiveTab("funcionarios")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${activeTab === 'funcionarios' ? 'bg-indigo-900/40 border-l-4 border-indigo-500 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
              >
                <Briefcase className="w-4.5 h-4.5" />
                {!isSidebarCollapsed && <span>Funcionários e Comissões</span>}
              </button>

              <div className={`pt-4 px-2 py-1 text-[10px] font-mono uppercase text-indigo-400/70 tracking-widest ${isSidebarCollapsed ? 'text-center' : ''}`}>Recursos</div>

              <button 
                onClick={() => setActiveTab("marketing")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${activeTab === 'marketing' ? 'bg-indigo-900/40 border-l-4 border-indigo-500 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
              >
                <MessageSquare className="w-4.5 h-4.5" />
                {!isSidebarCollapsed && <span>Marketing & WhatsApp</span>}
              </button>

              <button 
                onClick={() => setActiveTab("ai_assistant")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${activeTab === 'ai_assistant' ? 'bg-indigo-900/40 border-l-4 border-indigo-500 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
              >
                <Sparkles className="w-4.5 h-4.5 text-amber-400" />
                {!isSidebarCollapsed && <q className="not-italic">Assistente IA</q>}
              </button>

              <button 
                onClick={() => setActiveTab("admin_master")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${activeTab === 'admin_master' ? 'bg-indigo-900/40 border-l-4 border-indigo-500 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
              >
                <ShieldAlert className="w-4.5 h-4.5 text-red-400" />
                {!isSidebarCollapsed && <span>Administrador Master</span>}
              </button>
            </nav>

            {/* ADVERTISING BANNER BLOCK */}
            {!isSidebarCollapsed && activePromoBanner && (
              <div className="p-3 mx-3 mb-4 bg-slate-950 border border-indigo-800/50 rounded-xl flex flex-col justify-between text-xs space-y-2">
                <div className="flex justify-between items-center text-[9px] text-zinc-500">
                  <span className="bg-amber-400/20 text-amber-400 px-1 py-0.5 rounded font-black">Patrocinado</span>
                  <span>Promo Central</span>
                </div>
                <img 
                  src={activePromoBanner.imageUrl} 
                  alt={activePromoBanner.title} 
                  className="rounded h-16 w-full object-cover filter brightness-75"
                />
                <div className="font-semibold text-[10px] text-indigo-300 leading-snug">{activePromoBanner.title}</div>
                <a 
                  href={activePromoBanner.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full text-center bg-indigo-600 hover:bg-indigo-500 transition-colors py-1 text-[9px] text-white font-bold rounded"
                >
                  Ver Ofertas
                </a>
              </div>
            )}
          </aside>

          {/* MAIN PAGE CONTAINER WITH HEADERS */}
          <main className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
            
            {/* GRADIENT HEADER */}
            <header className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 h-16 flex items-center justify-between px-6 shadow-xl border-b border-indigo-850/50">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative w-80 max-w-full">
                  <input 
                    type="text" 
                    placeholder="Filtrar nesta seção..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 hover:border-indigo-500/50 rounded-lg py-1.5 pl-10 pr-4 text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-400 placeholder-slate-400 text-slate-100 transition-all"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-2 text-slate-400" />
                </div>
              </div>

              {/* USER META & CLOUD BACKUP ACTIONS */}
              <div className="flex items-center gap-4">
                {/* 5-Day Trial Interactive Controller */}
                <div className="bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-lg text-[10px] flex items-center gap-2 shadow-md">
                  <span className="text-amber-400 font-extrabold uppercase tracking-wider hidden lg:inline-block">Degustação (5 Dias):</span>
                  <select 
                    value={currentTenant.isSubscribed ? "subscribed" : simulatedTrialDay.toString()} 
                    onChange={(e) => {
                      if (e.target.value === "subscribed") {
                        setCurrentTenant(prev => ({ ...prev, isSubscribed: true }));
                      } else {
                        setCurrentTenant(prev => ({ ...prev, isSubscribed: false }));
                        setSimulatedTrialDay(parseInt(e.target.value));
                      }
                    }}
                    className="bg-slate-950 text-white font-mono text-[10px] py-1 px-1.5 rounded border border-white/10 focus:outline-hidden cursor-pointer"
                  >
                    <option value="1">Dia 1 (Ativo - 4 dias restantes)</option>
                    <option value="3">Dia 3 (Ativo - 2 dias restantes)</option>
                    <option value="5">Dia 5 (Último dia Ativo)</option>
                    <option value="6">Dia 6 (Expirado - Bloquear Operações!)</option>
                    <option value="subscribed">★ Assinante Ativo (Desbloqueado)</option>
                  </select>
                </div>

                <div className="hidden sm:flex flex-col items-end text-xs">
                  <span className="font-bold text-slate-200">{currentTenant.companyName}</span>
                  <span className="text-[10px] text-indigo-300 flex items-center gap-1">
                    {currentTenant.isSubscribed ? "Assinatura Ativa" : `Degustação: Dia ${simulatedTrialDay}/5`} • Vence em: {currentTenant.licenseExpiryDate}
                  </span>
                </div>
                
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md border border-white/25">
                  {currentTenant.responsibleName.substring(0, 2).toUpperCase()}
                </div>

                <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-lg text-[10px] text-slate-400 flex items-center gap-1.5 select-none hover:bg-slate-800 cursor-pointer" onClick={handleBackup}>
                  <RefreshCw className={`w-3.5 h-3.5 text-yellow-500 ${isBackingUp ? 'animate-spin' : ''}`} />
                  <span className="hidden md:inline">Backup Nuvem: {lastBackupTime}</span>
                </div>
              </div>
            </header>

            {/* MAIN CENTRAL WORKSPACE CONTAINER */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: DASHBOARD ERP */}
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  {/* Top Stats Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-900/60 backdrop-blur-xs p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-xs text-slate-400 uppercase font-black tracking-wider">Vendas Hoje</span>
                        <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">+12.5%</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-2xl font-bold tracking-tight text-white">
                          {todaySalesTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-1">{todaySales.length} transações concluídas</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 backdrop-blur-xs p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-xs text-slate-400 uppercase font-black tracking-wider">Estoque Crítico</span>
                        {lowStockCount > 0 && (
                          <span className="bg-rose-500/15 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">Atenção</span>
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="text-2xl font-bold tracking-tight text-rose-400">{lowStockCount}</span>
                        <p className="text-[10px] text-slate-500 mt-1">Produtos abaixo do nível mínimo</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 backdrop-blur-xs p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-xs text-slate-400 uppercase font-black tracking-wider">Recebíveis (A prazo)</span>
                        <span className="text-indigo-400 text-[10px]">Previsível</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-2xl font-bold tracking-tight text-white">
                          {accountsReceivable.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-1">Limite utilizado por clientes PJ/PF</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 backdrop-blur-xs p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-xs text-slate-400 uppercase font-black tracking-wider">Contas a Pagar</span>
                        <span className="text-yellow-400 text-[10px]">Aprovados</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-2xl font-bold tracking-tight text-amber-500">
                          {accountsPayable.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-1">Fornecedores aguardando envio</p>
                      </div>
                    </div>
                  </div>

                  {/* Graphic columns & Critical Stock list */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Weekly Sales Graphic representation via clean SVG/HTML divs */}
                    <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xs p-5 rounded-xl border border-slate-800 flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest font-display">Fluxo de Vendas Diárias</h3>
                        <div className="flex gap-3 text-[10px] text-slate-400">
                          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-indigo-500 rounded-sm"></span> Vendas</span>
                          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm"></span> Meta Diária (R$ 1.000)</span>
                        </div>
                      </div>

                      <div className="flex-1 flex items-end justify-between gap-4 h-44 border-b border-slate-800 pb-2 mt-4 text-xs">
                        <div className="w-full flex flex-col items-center gap-1.5">
                          <div className="w-full bg-slate-800/50 rounded-t h-32 relative flex items-end">
                            <div className="w-full bg-emerald-500/10 border-t border-emerald-500/30 h-10 absolute bottom-0"></div>
                            <div className="w-full bg-indigo-500 rounded-t h-[65%] shadow-lg transition-all hover:brightness-110"></div>
                          </div>
                          <span className="text-[9px] text-slate-500 font-mono">SEG</span>
                        </div>
                        <div className="w-full flex flex-col items-center gap-1.5">
                          <div className="w-full bg-slate-800/50 rounded-t h-32 relative flex items-end">
                            <div className="w-full bg-indigo-500 rounded-t h-[80%] shadow-lg transition-all hover:brightness-110"></div>
                          </div>
                          <span className="text-[9px] text-slate-500 font-mono">TER</span>
                        </div>
                        <div className="w-full flex flex-col items-center gap-1.5">
                          <div className="w-full bg-slate-800/50 rounded-t h-32 relative flex items-end">
                            <div className="w-full bg-indigo-500 rounded-t h-[40%] shadow-lg transition-all hover:brightness-110"></div>
                          </div>
                          <span className="text-[9px] text-slate-500 font-mono">QUA</span>
                        </div>
                        <div className="w-full flex flex-col items-center gap-1.5">
                          <div className="w-full bg-slate-800/50 rounded-t h-32 relative flex items-end">
                            <div className="w-full bg-indigo-400 rounded-t h-[95%] shadow-lg transition-all hover:brightness-110"></div>
                          </div>
                          <span className="text-[9px] text-slate-400 font-bold font-mono">QUI</span>
                        </div>
                        <div className="w-full flex flex-col items-center gap-1.5">
                          <div className="w-full bg-slate-800/50 rounded-t h-32 relative flex items-end">
                            <div className="w-full bg-indigo-500 rounded-t h-[55%] shadow-lg transition-all hover:brightness-110"></div>
                          </div>
                          <span className="text-[9px] text-slate-500 font-mono">SEX</span>
                        </div>
                        <div className="w-full flex flex-col items-center gap-1.5">
                          <div className="w-full bg-slate-800/50 rounded-t h-32 relative flex items-end">
                            <div className="w-full bg-indigo-500 rounded-t h-[60%] shadow-lg transition-all hover:brightness-110"></div>
                          </div>
                          <span className="text-[9px] text-slate-500 font-mono">SAB</span>
                        </div>
                      </div>
                    </div>

                    {/* Stock shortage and warnings */}
                    <div className="bg-slate-900/60 backdrop-blur-xs p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest font-display mb-3">Estoque Baixo Alert</h3>
                        <p className="text-[10px] text-slate-500 mb-4">Comprar imediatamente para evitar ruptura de vendas rápidas</p>
                        
                        <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                          {products.filter(p => p.stock <= p.stockMin).map(p => (
                            <div key={p.id} className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border-l-2 border-rose-500 border-y border-r border-slate-800">
                              <div className="truncate max-w-[155px]">
                                <p className="text-xs font-semibold text-slate-200 truncate">{p.description}</p>
                                <p className="text-[9px] font-mono text-slate-500">Mín: {p.stockMin} {p.unit} | Local: {p.location}</p>
                              </div>
                              <span className="bg-red-500/10 text-red-400 text-xs font-bold px-2 py-1 rounded">
                                {p.stock} UN
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setSelectedCategory("Todos");
                          setActiveTab("produtos");
                        }}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-xs transition-colors mt-4"
                      >
                        Ver Inventário Geral
                      </button>
                    </div>
                  </div>

                  {/* Recent sales logs row */}
                  <div className="bg-slate-900/60 backdrop-blur-xs p-5 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest font-display">Últimas Transações Homologadas</h3>
                      <button onClick={() => setActiveTab("vendas")} className="text-xs text-indigo-400 hover:underline">Ir para Frente de Caixa (PDV) →</button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                          <tr className="border-b border-slate-800">
                            <th className="p-3">Doc Fiscal</th>
                            <th className="p-3">Cliente</th>
                            <th className="p-3">Operador / Vendedor</th>
                            <th className="p-3">Data</th>
                            <th className="p-3">Forma</th>
                            <th className="p-3">Tributo</th>
                            <th className="p-3 text-right">Total Líquido</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {sales.slice(0, 5).map(s => (
                            <tr key={s.id} className="hover:bg-slate-800/30">
                              <td className="p-3 font-mono font-bold text-slate-200">{s.invoiceNumber}</td>
                              <td className="p-3 font-medium text-slate-100">{s.clientName}</td>
                              <td className="p-3 text-slate-400">{s.sellerName}</td>
                              <td className="p-3 text-slate-400 font-mono text-[11px]">{new Date(s.date).toLocaleString()}</td>
                              <td className="p-3 uppercase font-semibold text-slate-300">{s.paymentMethod}</td>
                              <td className="p-3">
                                {s.isFiscalEmitted ? (
                                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold">NFC-e</span>
                                ) : (
                                  <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded font-bold">Simples</span>
                                )}
                              </td>
                              <td className="p-3 text-right font-bold text-emerald-400">
                                {s.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Seller commissions scoreboard */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/60 backdrop-blur-xs p-5 rounded-xl border border-slate-800">
                      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest font-display mb-4">Ranking de Vendedores & Comissão</h3>
                      <div className="space-y-3">
                        {employees.filter(e => e.role === 'Vendedor' || e.role === 'Gerente').map(emp => {
                          const empSales = sales.filter(s => s.sellerName === emp.name);
                          const totalSold = empSales.reduce((acc, s) => acc + s.total, 0);
                          const commissionGained = (totalSold * emp.commissionRate) / 100;
                          return (
                            <div key={emp.id} className="bg-slate-950 p-3 rounded-lg flex items-center justify-between border border-slate-800">
                              <div>
                                <p className="text-xs font-bold text-slate-250">{emp.name}</p>
                                <p className="text-[10px] text-slate-500">Taxa: {emp.commissionRate}% | Salário Fixo: R$ {emp.salary.toFixed(2)}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-bold text-indigo-400">Vendeu: {totalSold.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <p className="text-[10px] text-emerald-400 font-bold">Comissão: {commissionGained.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-indigo-950/40 backdrop-blur-xs p-5 rounded-xl border border-indigo-900/50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2 font-display">
                          <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
                          <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-widest">IA Insight Central</h3>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {isLoadingAI ? "Alimentando neurônios virtuais para analisar estoque..." : 
                           aiAnalysis ? aiAnalysis.substring(0, 240) + "..." : 
                           "Gere ou atualize seu relatório comercial na seção Assistente IA!"}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-indigo-900/50">
                        <button 
                          onClick={() => setActiveTab("ai_assistant")}
                          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-lg text-xs transition-colors"
                        >
                          Ir para Assistente de Inteligência Artificial
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUTOS / ESTOQUE */}
              {activeTab === "produtos" && (
                <div className="space-y-6">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-slate-400 font-bold">Categoria:</span>
                      <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-xs text-zinc-100 rounded p-2 focus:ring-1 focus:ring-amber-500"
                      >
                        {categoriesList.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <button 
                      onClick={() => setShowAddProductModal(true)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
                    >
                      <Plus className="w-4 h-4" /> Cadastrar Produto Novo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products
                      .filter(p => selectedCategory === "Todos" || p.category === selectedCategory)
                      .filter(p => p.description.toLowerCase().includes(searchTerm.toLowerCase()) || p.barcode.includes(searchTerm) || p.code.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map(p => {
                        const isLow = p.stock <= p.stockMin;
                        return (
                          <div key={p.id} className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 flex flex-col justify-between hover:border-indigo-500/50 transition-all">
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="bg-slate-800 text-slate-400 font-mono text-[9px] px-2 py-0.5 rounded">
                                  {p.code}
                                </span>
                                <span className="text-[10px] text-amber-400 font-bold">{p.brand}</span>
                              </div>

                              <h3 className="text-xs font-bold text-white mt-3 line-clamp-2 h-8">{p.description}</h3>
                              
                              <div className="mt-2 text-[10px] text-slate-500">
                                <div>Ubicación: <strong className="text-slate-300">{p.location}</strong></div>
                                <div>Fornecedor: <strong className="text-slate-400">{p.supplierName}</strong></div>
                                <div>Código de Barras: <strong className="text-slate-400 font-mono">{p.barcode}</strong></div>
                              </div>
                            </div>

                            <div className="space-y-2 mt-4 pt-3 border-t border-slate-800/80">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Estoque:</span>
                                <span className={`font-bold ${isLow ? 'text-red-400 font-black animate-pulse' : 'text-slate-200'}`}>
                                  {p.stock} {p.unit} {isLow && "⚠️"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Preço de Venda:</span>
                                <span className="font-bold text-emerald-400">
                                  {p.salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-slate-500">Custo: {p.cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                <span className="text-indigo-400 font-bold font-mono">Margem: {p.profitMargin}%</span>
                              </div>
                            </div>

                            {/* ADJUST / INVENTORY QUICK HANDLERS */}
                            <div className="grid grid-cols-2 gap-1.5 mt-3 pt-3 border-t border-slate-800/40">
                              <button 
                                onClick={() => {
                                  const addStock = parseInt(prompt("Entrada no estoque - Digite a quantidade a somar:") || "0");
                                  if (addStock > 0) {
                                    setProducts(products.map(prod => prod.id === p.id ? { ...prod, stock: prod.stock + addStock } : prod));
                                  }
                                }}
                                className="py-1 px-2 hover:bg-slate-800 border border-slate-800 rounded text-[9px] font-bold text-emerald-400"
                              >
                                + Entrada
                              </button>
                              <button 
                                onClick={() => {
                                  const subStock = parseInt(prompt("Saída no estoque - Digite a quantidade a subtrair:") || "0");
                                  if (subStock > 0) {
                                    setProducts(products.map(prod => prod.id === p.id ? { ...prod, stock: Math.max(0, prod.stock - subStock) } : prod));
                                  }
                                }}
                                className="py-1 px-2 hover:bg-slate-800 border border-slate-800 rounded text-[9px] font-bold text-red-400"
                              >
                                - Saída
                              </button>
                            </div>
                          </div>
                        );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: PDV / FRENTE DE CAIXA */}
              {activeTab === "vendas" && (
                <div className="space-y-4">
                  <POSView 
                    products={products}
                    employees={employees}
                    clients={clients}
                    onCompleteSale={handleCompleteSale}
                    propagandaBanner={activePromoBanner}
                  />
                </div>
              )}

              {/* TAB 4: FINANCEIRO */}
              {activeTab === "financeiro" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
                      <div className="text-zinc-500 text-[10px] uppercase font-black">Fluxo Caixas Registrados</div>
                      <div className="mt-2 text-2xl font-black text-emerald-400 flex items-center gap-1.5">
                        <TrendingUp className="w-6 h-6" />
                        {cashMovements.filter(c => c.type === 'entrada').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">Créditos de vendas e faturamentos homologados</p>
                    </div>

                    <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
                      <div className="text-zinc-500 text-[10px] uppercase font-black">Custo Total / Saídas</div>
                      <div className="mt-2 text-2xl font-black text-rose-450 text-rose-400 flex items-center gap-1.5">
                        <TrendingDown className="w-6 h-6" />
                        {cashMovements.filter(c => c.type === 'saida').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">Contas pagas, salários e faturamento de estoque</p>
                    </div>

                    <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 bg-linear-to-br from-indigo-950/20 to-slate-900">
                      <div className="text-zinc-500 text-[10px] uppercase font-black font-display">Saldo em Caixa</div>
                      {/* calculation input */}
                      {(() => {
                        const creditSum = cashMovements.filter(c => c.type === 'entrada').reduce((acc, curr) => acc + curr.amount, 0);
                        const debitSum = cashMovements.filter(c => c.type === 'saida').reduce((acc, curr) => acc + curr.amount, 0);
                        const balance = creditSum - debitSum;
                        return (
                          <div className={`mt-2 text-2xl font-black ${balance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </div>
                        );
                      })()}
                      <p className="text-[10px] text-slate-500 mt-1">Histórico líquido em conta corrente integrada</p>
                    </div>
                  </div>

                  {/* Add financial entry layout form */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Registrar Movimentação Manual Caixa</h3>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const desc = formData.get("desc") as string;
                        const type = formData.get("type") as "entrada" | "saida";
                        const category = formData.get("category") as string;
                        const amount = parseFloat(formData.get("amount") as string) || 0;
                        const costCenter = formData.get("costCenter") as string;

                        if (!desc || amount <= 0) {
                          alert("Descrição e valor são obrigatórios!");
                          return;
                        }

                        const newFlow: CashMovement = {
                          id: `fin-${Date.now()}`,
                          description: desc,
                          type,
                          category,
                          amount,
                          paymentMethod: "Dinheiro / PIX manual",
                          date: new Date().toISOString(),
                          status: "conciliado",
                          costCenter
                        };

                        setCashMovements([newFlow, ...cashMovements]);
                        e.currentTarget.reset();
                        alert("Lançamento efetuado!");
                      }}
                      className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end"
                    >
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Descrição</label>
                        <input type="text" name="desc" placeholder="Ex: Conserto do Portão Hidráulico" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tipo / Custo</label>
                        <select name="type" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white">
                          <option value="saida">Saída (Débito)</option>
                          <option value="entrada">Entrada (Crédito)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Valor R$</label>
                        <input type="number" step="0.01" name="amount" placeholder="0.00" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white" />
                      </div>
                      <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 rounded">
                        Lançar no Fluxo
                      </button>
                    </form>
                  </div>

                  {/* Cashflow listing logs */}
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Razão Auxiliar de Lançamentos</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-950 text-slate-400 text-[10px] font-bold">
                          <tr className="border-b border-slate-800">
                            <th className="p-3">Data</th>
                            <th className="p-3">Descrição lançamento</th>
                            <th className="p-3">Centro de Custo</th>
                            <th className="p-3">Categoria</th>
                            <th className="p-3">Canal Pagamento</th>
                            <th className="p-3 text-right">Crédito</th>
                            <th className="p-3 text-right">Débito</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/40">
                          {cashMovements.map(m => (
                            <tr key={m.id} className="hover:bg-slate-850">
                              <td className="p-3 text-slate-500 font-mono">{new Date(m.date).toLocaleDateString()}</td>
                              <td className="p-3 font-semibold text-slate-200">{m.description}</td>
                              <td className="p-3 text-indigo-300 font-mono text-[10px]">{m.costCenter || "Geral"}</td>
                              <td className="p-3 text-slate-400">{m.category}</td>
                              <td className="p-3 uppercase text-slate-400 text-[10px]">{m.paymentMethod}</td>
                              <td className="p-3 text-right text-emerald-400 font-bold font-mono">
                                {m.type === 'entrada' ? m.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "-"}
                              </td>
                              <td className="p-3 text-right text-rose-450 text-rose-400 font-bold font-mono">
                                {m.type === 'saida' ? m.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: CLIENTES & CRM */}
              {activeTab === "clientes" && (
                <div className="space-y-6">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest font-display">Clientes Registrados</h3>
                    <button 
                      onClick={() => setShowAddClientModal(true)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Novo Cliente PF/PJ
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clients.map(cli => (
                      <div key={cli.id} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${cli.type === 'PJ' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-amber-500/10 text-amber-400'}`}>
                              {cli.type === 'PJ' ? 'Pessoa Jurídica' : 'Pessoa Física'}
                            </span>
                            <span className="text-[10px] text-zinc-500">Histórico: {cli.purchaseHistoryCount} compras</span>
                          </div>

                          <h4 className="text-sm font-bold text-white mt-3">{cli.name}</h4>
                          <p className="text-[10px] font-mono text-zinc-400 mt-1">Doc: {cli.document} {cli.rg && `| RG: ${cli.rg}`}</p>
                          <p className="text-[10px] text-zinc-500 mt-2">{cli.address}</p>

                          <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 text-[10px] gap-2">
                            <div>
                              <span className="text-zinc-550 block text-zinc-500 uppercase font-bold">Email:</span>
                              <span className="text-zinc-350 select-all font-semibold text-slate-300">{cli.email}</span>
                            </div>
                            <div>
                              <span className="text-zinc-550 block text-zinc-500 uppercase font-bold">Contato:</span>
                              <span className="text-zinc-350 select-all font-semibold text-slate-300">{cli.phone}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 bg-slate-950 p-2.5 rounded-lg space-y-1">
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Limite rotativo:</span>
                            <span>{cli.creditLimit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                          </div>
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Saldo utilizado:</span>
                            <span className="text-red-400 font-bold">{cli.balanceUsed.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CRM Interaction history loggers */}
                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Acompanhamento e Follow-up (CRM)</h3>
                    <div className="space-y-3">
                      {crmLogs.map(log => (
                        <div key={log.id} className="bg-slate-950 p-4 rounded-lg border border-slate-850 flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{log.clientName}</span>
                              <span className="text-[9px] bg-indigo-900/40 text-indigo-300 px-1.5 rounded uppercase font-mono">{log.type}</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">{log.summary}</p>
                            {log.followUpDate && (
                              <p className="text-[10px] text-yellow-500 flex items-center gap-1 font-semibold">
                                <AlertTriangle className="w-3.5 h-3.5" /> Próxima Cobrança / Follow: {new Date(log.followUpDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">{new Date(log.date).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: FUNCIONÁRIOS E EQUIPE */}
              {activeTab === "funcionarios" && (
                <div className="space-y-6">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest font-display">Quadro de Colaboradores</h3>
                    <button 
                      onClick={() => setShowAddEmployeeModal(true)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Novo Colaborador
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {employees.map(emp => (
                      <div key={emp.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                              {emp.role}
                            </span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          </div>

                          <h4 className="text-base font-bold text-white mt-3">{emp.name}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold">{emp.department}</p>
                          <p className="text-[11px] text-slate-500 font-mono mt-1">CPF: {emp.document}</p>
                          <p className="text-[11px] text-slate-400 mt-2">🕒 Escala de Horário: <strong className="text-slate-200">{emp.schedule}</strong></p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 bg-slate-950 p-3 rounded-lg text-xs space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Salário Base:</span>
                            <span className="font-bold text-slate-200">{emp.salary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Taxa de Comissão:</span>
                            <span className="font-bold text-amber-500">{emp.commissionRate}%</span>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[10px] font-bold bg-slate-900 p-2 rounded border border-slate-800">
                          <div>
                            <span className="text-slate-500 block">Vender</span>
                            <span className={emp.permissions.canSell ? 'text-emerald-400' : 'text-red-400'}>{emp.permissions.canSell ? 'SIM' : 'NÃO'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Estoque</span>
                            <span className={emp.permissions.canManageStock ? 'text-emerald-400' : 'text-red-400'}>{emp.permissions.canManageStock ? 'SIM' : 'NÃO'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: MARKETING & CAMPAIGNS */}
              {activeTab === "marketing" && (
                <div id="marketing-tab-workspace" className="space-y-6">
                  {/* Top Stats Banner */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h2 className="text-base font-bold text-white font-display">Hub de Automação de Marketing de Loja</h2>
                      <p className="text-xs text-slate-400 mt-0.5">Segmentação baseada no CRM & histórico de compras. Conexão integrada com Mailchimp e WhatsApp API Oficial.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        WhatsApp Gateway: Conectado
                      </span>
                      <span className="bg-indigo-500/10 text-indigo-400 text-xs px-2.5 py-1 rounded-full border border-indigo-500/20 font-bold flex items-center gap-1">
                        Mailchimp API: Integrável
                      </span>
                    </div>
                  </div>

                  {/* Split Dashboard */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* LEFT COLUMN (GRID 5/12): CUSTOMER SEGMENTATION ENGINE */}
                    <div className="lg:col-span-5 bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2">
                        <Users className="w-4 h-4 text-amber-400" />
                        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Motor de Segmentação de Clientes (CRM)</h3>
                      </div>

                      {/* Segmentation filter controls form */}
                      <div className="space-y-3 bg-slate-950 p-3 rounded-lg border border-slate-850">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Tipo de Cliente (PF/PJ)</label>
                          <select 
                            value={segmentType}
                            onChange={(e) => setSegmentType(e.target.value)}
                            className="w-full bg-slate-900 text-xs p-2 rounded text-white border border-slate-800 focus:outline-hidden"
                          >
                            <option value="Todos">Todos os Tipos (Física e Jurídica)</option>
                            <option value="PF">Pessoa Física - PF (Profissionais Autônomos)</option>
                            <option value="PJ">Pessoa Jurídica - PJ (Construtoras / Atacado)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Fidelidade & Histórico CRM</label>
                          <select 
                            value={segmentLoyalty}
                            onChange={(e) => setSegmentLoyalty(e.target.value)}
                            className="w-full bg-slate-900 text-xs p-2 rounded text-white border border-slate-800 focus:outline-hidden"
                          >
                            <option value="Todos">Todos os Perfis de Compra</option>
                            <option value="Recorrentes">Clientes Recorrentes (Mais de 10 compras faturadas)</option>
                            <option value="Ausentes">Clientes Ausentes / Baixo Volume (Menos de 10 compras)</option>
                            <option value="Recompra">Clientes c/ Recompra Indicada (Lembrete de Insumos)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Interesse de Categorias de Insumos</label>
                          <select 
                            value={segmentCategory}
                            onChange={(e) => setSegmentCategory(e.target.value)}
                            className="w-full bg-slate-900 text-xs p-2 rounded text-white border border-slate-800 focus:outline-hidden"
                          >
                            <option value="Todos">Qualquer Categoria Comprada</option>
                            <option value="Tintas">Tintas, Solventes & Vernizes (Contínuo)</option>
                            <option value="EPI">Equipamentos de Proteção - EPI (Recompra regular)</option>
                            <option value="Parafusos">Parafusos, Pregos e Fixação (Consumo rápido)</option>
                            <option value="Materiais Hidráulicos">Materiais Hidráulicos e conexões de tubos</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Localização Geográfica</label>
                          <select 
                            value={segmentLocation}
                            onChange={(e) => setSegmentLocation(e.target.value)}
                            className="w-full bg-slate-900 text-xs p-2 rounded text-white border border-slate-800 focus:outline-hidden"
                          >
                            <option value="Todos">Todas as Regiões</option>
                            <option value="São Paulo">Região Metropolitana - São Paulo/SP</option>
                            <option value="Campinas">Região de Campinas/SP</option>
                          </select>
                        </div>
                      </div>

                      {/* Segmentation statistics live counter */}
                      {(() => {
                        const filtered = clients.filter(c => {
                          if (segmentType !== "Todos" && c.type !== segmentType) return false;
                          if (segmentLocation !== "Todos") {
                            const isSP = c.address.includes("São Paulo") || c.address.includes("SP");
                            const isCampinas = c.address.includes("Campinas");
                            if (segmentLocation === "São Paulo" && !isSP) return false;
                            if (segmentLocation === "Campinas" && !isCampinas) return false;
                          }
                          if (segmentLoyalty === "Recorrentes") {
                            if (c.purchaseHistoryCount < 10) return false;
                          } else if (segmentLoyalty === "Ausentes") {
                            if (c.purchaseHistoryCount >= 10) return false;
                          } else if (segmentLoyalty === "Recompra") {
                            if (c.purchaseHistoryCount > 20) return false;
                          }
                          if (segmentCategory !== "Todos") {
                            const noteStr = (c.notes || "").toLowerCase();
                            const nameStr = c.name.toLowerCase();
                            if (segmentCategory === "Tintas" && !noteStr.includes("tinta") && !nameStr.includes("prumo") && !noteStr.includes("sherwin")) return false;
                            if (segmentCategory === "EPI" && !noteStr.includes("eletricista") && !noteStr.includes("reformas") && !noteStr.includes("óculos")) return false;
                            if (segmentCategory === "Parafusos" && !noteStr.includes("pregos") && !noteStr.includes("reformas")) return false;
                            if (segmentCategory === "Materiais Hidráulicos" && !noteStr.includes("encanador") && !nameStr.includes("prumo")) return false;
                          }
                          return true;
                        });

                        const percent = clients.length ? Math.round((filtered.length / clients.length) * 100) : 0;

                        return (
                          <div className="space-y-3">
                            <div className="p-3 bg-indigo-950/40 border border-indigo-900/40 rounded-lg flex items-center justify-between">
                              <div>
                                <div className="text-[10px] text-zinc-500 uppercase font-black">Público Selecionado</div>
                                <div className="text-xl font-bold text-indigo-300">{filtered.length} Clientes</div>
                              </div>
                              <div className="text-right">
                                <span className="bg-indigo-500 text-white text-[10px] font-black px-2 py-1 rounded-sm">{percent}% da base</span>
                                <div className="text-[9px] text-zinc-500 mt-1">Total base: {clients.length}</div>
                              </div>
                            </div>

                            {/* List of matched segment directory with actionable triggers */}
                            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                              <span className="text-[9px] uppercase font-bold text-slate-500">Mapeamento do CRM para Recompra & Promoção:</span>
                              {filtered.length === 0 ? (
                                <div className="p-3 bg-slate-950 rounded text-center text-zinc-500 text-[11px]">Nenhum cliente atende a todos os filtros selecionados combinados.</div>
                              ) : (
                                filtered.map(c => {
                                  // recommend materials
                                  let sugMaterial = "Fixadores & EPIs";
                                  if (c.notes?.toLowerCase().includes("tinta") || c.name.toLowerCase().includes("prumo")) {
                                    sugMaterial = "Tintas Acrílicas Sherwin-Williams";
                                  } else if (c.notes?.toLowerCase().includes("encanador")) {
                                    sugMaterial = "Tubos PVC Tigre e Luvas Recorrentes";
                                  } else if (c.notes?.toLowerCase().includes("eletricista")) {
                                    sugMaterial = "Fios Sil e Equipamentos EPI Danny";
                                  } else if (c.notes?.toLowerCase().includes("pedreiro")) {
                                    sugMaterial = "Pregos Belgo Bekaert e Lixas";
                                  }

                                  return (
                                    <div key={c.id} className="bg-slate-950 p-2.5 rounded border border-slate-850 flex items-center justify-between gap-1">
                                      <div className="truncate">
                                        <p className="text-xs font-bold text-white truncate">{c.name}</p>
                                        <p className="text-[10px] text-indigo-400 mt-0.5 font-mono">{c.phone}</p>
                                        <span className="inline-block mt-1 bg-amber-500/10 text-amber-500 text-[9px] px-1.5 py-0.5 rounded-sm font-semibold">
                                          Sugerido: {sugMaterial}
                                        </span>
                                      </div>
                                      <div className="text-right min-w-[75px]">
                                        <span className="text-[10px] font-mono text-zinc-400 block">{c.purchaseHistoryCount} compras</span>
                                        <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded block text-center mt-1 bg-slate-900 border text-slate-400 border-white/5">
                                          CRM Ativo
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* RIGHT COLUMN (GRID 7/12): MARKETING AUTOMATION GATEWAYS */}
                    <div className="lg:col-span-7 bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                      
                      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <MessageSquare className="w-4 h-4 text-emerald-400" />
                          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Ferramentas de Campanhas & Disparo</h3>
                        </div>
                        <div className="text-[10px] text-slate-400">Canal Ativo de Automação</div>
                      </div>

                      {/* Selector for Mailchimp or WhatsApp */}
                      <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-950 rounded-lg border border-slate-850">
                        <button 
                          onClick={() => setWhatsappConnected(true)}
                          className={`py-1.5 rounded text-xs font-bold transition-all ${whatsappConnected ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                          💬 WhatsApp Bulk API (Anti-Ban)
                        </button>
                        <button 
                          onClick={() => setWhatsappConnected(false)}
                          className={`py-1.5 rounded text-xs font-bold transition-all ${!whatsappConnected ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                          📧 Sync Mailchimp (Newsletter)
                        </button>
                      </div>

                      {/* SUB TAB CONTAINER */}
                      {whatsappConnected ? (
                        /* WHATSAPP BULK EXCLUSIVO SUB TAB */
                        <div className="space-y-4 flex-1">
                          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 space-y-3">
                            <span className="text-[9px] font-black uppercase text-emerald-400">CONFIGURAÇÃO DE ACESSO DO DISPARADOR WHATSAPP</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] text-slate-400 mb-1">ID da Instância WhatsApp</label>
                                <input 
                                  type="text" 
                                  value={whatsappInstanceId} 
                                  onChange={(e) => setWhatsappInstanceId(e.target.value)}
                                  className="w-full bg-slate-900 text-xs p-2 rounded text-white border border-slate-800 font-mono focus:outline-hidden" 
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-slate-400 mb-1">Token de Acesso Bearer</label>
                                <input 
                                  type="password" 
                                  value={whatsappToken} 
                                  onChange={(e) => setWhatsappToken(e.target.value)}
                                  className="w-full bg-slate-900 text-xs p-2 rounded text-white border border-slate-800 font-mono focus:outline-hidden" 
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                              <div>
                                <label className="block text-[10px] text-slate-400 mb-1">Delay de Segurança (Políticas de Spam)</label>
                                <select 
                                  value={whatsappDelay} 
                                  onChange={(e) => setWhatsappDelay(parseInt(e.target.value))}
                                  className="w-full bg-slate-900 text-xs p-1.5 rounded text-white border border-slate-800 font-mono focus:outline-hidden"
                                >
                                  <option value="2">2 Segundos (Rápido - alto risco de ban)</option>
                                  <option value="5">5 Segundos (Sugerido para listas quentes)</option>
                                  <option value="10">10 Segundos (Semirrecomendado)</option>
                                  <option value="15">15 Segundos (Seguro - Baixo Risco de Bloqueio)</option>
                                </select>
                              </div>
                              <div className="flex items-center gap-2 pt-5">
                                <input 
                                  type="checkbox" 
                                  id="opt-out" 
                                  checked={whatsappOptOut} 
                                  onChange={(e) => setWhatsappOptOut(e.target.checked)}
                                  className="rounded accent-emerald-500 cursor-pointer" 
                                />
                                <label htmlFor="opt-out" className="text-[10px] text-slate-350 select-none cursor-pointer">Anexar Suffix Opt-Out (Evita denúncias)</label>
                              </div>
                            </div>
                          </div>

                          {/* CAMPAIGN TEMPLATE EMITTER */}
                          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 space-y-3">
                            <span className="text-[9px] font-black uppercase text-amber-400">CAMPANHAS DIRECIONADAS & MODELOS DE RECOMPRA APÓS COMPRAS (WhatsApp)</span>
                            
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Selecione o Modelo de Disparo Homologado:</label>
                              <select 
                                value={whatsappApprovedTemplate} 
                                onChange={(e) => setWhatsappApprovedTemplate(e.target.value)}
                                className="w-full bg-slate-900 text-xs p-2 rounded text-white border border-slate-800 font-bold text-amber-500 focus:outline-hidden"
                              >
                                <option value="recompra">🔄 Lembrete de Recompra Recorrente (Consumível)</option>
                                <option value="promocional">🔥 Campanhas Direcionadas: Saldão & Promoção de Estoques</option>
                                <option value="pesquisa">📋 CRM: Pesquisa de Satisfação de Compras & Obras</option>
                              </select>
                            </div>

                            {/* Dynamically simulated textarea prompt message based on approved templates */}
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Mensagem Gerada (Variáveis do CRM Substituídas Automática):</label>
                              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-[11px] text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                                {whatsappApprovedTemplate === "recompra" && (
                                  `Olá, {NOME}! 🔄 Percebemos no nosso CRM que faz algum tempo desde a sua última compra de insumos e ferramentas de ferragens. Os seus materiais ou insumos acabaram? 

Evite paradas na sua obra! Compre novamente hoje na Ferragista Tintas Central e garanta 10% OFF com entrega relâmpago! Responda para reservar.
`
                                )}
                                {whatsappApprovedTemplate === "promocional" && (
                                  `💥 SALDÃO DIRETO DO ESTOQUE {NOME}!
Confira o Festival de ferramentas, EPIs e acabamentos na Tintas Central Ltda! Condições de pagamento faturadas em até 60 dias para PJ e frete livre no galpão.

Pare de sofrer com ferramentas amadoras! Clique aqui: bit.ly/central-tintas-ofertas
`
                                )}
                                {whatsappApprovedTemplate === "pesquisa" && (
                                  `Olá, {NOME}! Tudo bem? 📋 Queremos saber a sua opinião sincera sobre a sua última compra no nosso PDV. O produto atendeu o padrão de qualidade esperado?

Sua avaliação nos ajuda a selecionar as melhores marcas. Responda este WhatsApp de forma rápida. Obrigado!
`
                                )}
                                {whatsappOptOut && (
                                  <span className="text-zinc-500 block border-t border-slate-800 pt-1 mt-2 font-sans italic text-[10px] select-none">
                                    "Para sair desse canal promocional ou parar de receber ofertas de ferramentas, responda com 0."
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Action Dispatch */}
                            <button
                              onClick={() => {
                                if (whatsappSending) return;
                                setWhatsappSending(true);
                                const newLogs = [
                                  `[${new Date().toLocaleTimeString()}] Fila de Disparador em Massa Ativada pelo Central ERP...`,
                                  `[${new Date().toLocaleTimeString()}] Aplicando regras de delay anti-ban de ${whatsappDelay} segundos...`,
                                  `[${new Date().toLocaleTimeString()}] Opt-out compliance ativo: ${whatsappOptOut ? 'SIM' : 'NÃO'}`
                                ];
                                setWhatsappLogs(newLogs);

                                // Get segmented list of clients
                                const filtered = clients.filter(c => {
                                  if (segmentType !== "Todos" && c.type !== segmentType) return false;
                                  if (segmentLocation !== "Todos") {
                                    const isSP = c.address.includes("São Paulo") || c.address.includes("SP");
                                    const isCampinas = c.address.includes("Campinas");
                                    if (segmentLocation === "São Paulo" && !isSP) return false;
                                    if (segmentLocation === "Campinas" && !isCampinas) return false;
                                  }
                                  if (segmentLoyalty === "Recorrentes") {
                                    if (c.purchaseHistoryCount < 10) return false;
                                  } else if (segmentLoyalty === "Ausentes") {
                                    if (c.purchaseHistoryCount >= 10) return false;
                                  } else if (segmentLoyalty === "Recompra") {
                                    if (c.purchaseHistoryCount > 20) return false;
                                  }
                                  if (segmentCategory !== "Todos") {
                                    const noteStr = (c.notes || "").toLowerCase();
                                    const nameStr = c.name.toLowerCase();
                                    if (segmentCategory === "Tintas" && !noteStr.includes("tinta") && !nameStr.includes("prumo") && !noteStr.includes("sherwin")) return false;
                                    if (segmentCategory === "EPI" && !noteStr.includes("eletricista") && !noteStr.includes("reformas") && !noteStr.includes("óculos")) return false;
                                    if (segmentCategory === "Parafusos" && !noteStr.includes("pregos") && !noteStr.includes("reformas")) return false;
                                    if (segmentCategory === "Materiais Hidráulicos" && !noteStr.includes("encanador") && !nameStr.includes("prumo")) return false;
                                  }
                                  return true;
                                });

                                if (filtered.length === 0) {
                                  alert("Aviso: Nenhum cliente selecionado na segmentação para receber a mensagem!");
                                  setWhatsappSending(false);
                                  return;
                                }

                                filtered.forEach((clientIter, idx) => {
                                  setTimeout(() => {
                                    setWhatsappLogs(prev => [
                                      ...prev,
                                      `[${new Date().toLocaleTimeString()}] Enviando para ${clientIter.name} (Zap: ${clientIter.phone}) - Código de confirmação: WAPI-${Math.floor(100000 + Math.random() * 900000)} OK`
                                    ]);

                                    if (idx === filtered.length - 1) {
                                      setTimeout(() => {
                                        setWhatsappLogs(prev => [
                                          ...prev,
                                          `[${new Date().toLocaleTimeString()}] Campanha de WhatsApp Concluída com Sucesso! Total de disparos efetuados: ${filtered.length}.`
                                        ]);
                                        setWhatsappSending(false);

                                        const newCampItem: MarketingCampaign = {
                                          id: `camp-${Date.now()}`,
                                          title: `Zap Massa: ${whatsappApprovedTemplate === 'recompra' ? 'Lembrete de Recompra' : whatsappApprovedTemplate === 'promocional' ? 'Saldão' : 'CRM Contato'}`,
                                          channel: "whatsapp",
                                          audienceCount: filtered.length,
                                          messageText: `Enviado template ${whatsappApprovedTemplate.toUpperCase()} para segmento de ${filtered.length} contatos. Delay: ${whatsappDelay}s.`,
                                          status: "enviado",
                                          dateCreated: new Date().toISOString(),
                                          dateSent: new Date().toISOString()
                                        };
                                        setCampaigns(prevC => [newCampItem, ...prevC]);
                                        alert(`Campanha oficial de WhatsApp finalizada com sucesso via API local! Clientes notificados em segundos.`);
                                      }, 500);
                                    }
                                  }, (idx + 1) * 1200);
                                });

                              }}
                              disabled={whatsappSending}
                              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-lg transition-colors border-none"
                            >
                              <RefreshCw className={`w-3.5 h-3.5 ${whatsappSending && 'animate-spin'}`} />
                              {whatsappSending ? "Enviando Fila Progressivamente..." : "Iniciar Disparo em Massa no Segmento Selecionado"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* MAILCHIMP NEWSLETTER AUTOMATION INTEGRATION PANEL */
                        <div className="space-y-4 flex-1">
                          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 space-y-3">
                            <span className="text-[9px] font-black uppercase text-indigo-400">CONFIGURAÇÃO DA API MAILCHIMP</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] text-slate-400 mb-1">Mailchimp API Key *</label>
                                <input 
                                  type="text" 
                                  value={mailchimpKey} 
                                  onChange={(e) => setMailchimpKey(e.target.value)}
                                  className="w-full bg-slate-900 text-xs p-2 rounded text-white border border-slate-800 font-mono focus:outline-hidden" 
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-slate-400 mb-1">Audience ID (Lista de E-mails) *</label>
                                <input 
                                  type="text" 
                                  value={mailchimpAudienceId} 
                                  onChange={(e) => setMailchimpAudienceId(e.target.value)}
                                  className="w-full bg-slate-900 text-xs p-2 rounded text-white border border-slate-800 font-mono focus:outline-hidden" 
                                />
                              </div>
                            </div>
                            
                            <p className="text-[10px] text-slate-500 font-sans">
                              * A integração nativa do SaaS busca os contatos quentes e as tags do CRM do seu banco de dados e sincroniza no Mailchimp para campanhas em lote.
                            </p>
                          </div>

                          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 space-y-3 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                            <div>
                              <div className="text-[10px] font-bold text-indigo-300 font-display">Conexão Servidores:</div>
                              <p className="text-[11px] text-zinc-400 mt-1">Status atual: <span className="text-emerald-400 font-extrabold font-mono">Pronto (API Online)</span></p>
                            </div>
                            <button 
                              onClick={() => {
                                alert("Simulação de Conexão: Mailchimp retornou 'Ping OK' e API Key ativa para a conta Picapau Informática!");
                                setMailchimpLogs(prev => [
                                  `[${new Date().toLocaleTimeString()}] Conexão bem-sucedida! Teste ping com Mailchimp server us21 retornado com sucesso.`,
                                  ...prev
                                ]);
                              }}
                              className="py-2.5 px-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold rounded text-xs text-center cursor-pointer transition-colors"
                            >
                              Testar Conexão Oficial
                            </button>
                          </div>

                          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 space-y-2">
                            <h4 className="text-[10px] uppercase font-bold text-slate-500">Ações de Sincronização Larga (Mailchimp):</h4>
                            <button
                              onClick={() => {
                                if (mailchimpSyncing) return;
                                setMailchimpSyncing(true);
                                setMailchimpLogs(prev => [
                                  `[${new Date().toLocaleTimeString()}] Inicializando sincronizador nativo do Mailchimp...`,
                                  `[${new Date().toLocaleTimeString()}] Buscando registros filtrados pelo segmento atual...`,
                                  ...prev
                                ]);

                                const filtered = clients.filter(c => {
                                  if (segmentType !== "Todos" && c.type !== segmentType) return false;
                                  if (segmentLocation !== "Todos") {
                                    const isSP = c.address.includes("São Paulo") || c.address.includes("SP");
                                    const isCampinas = c.address.includes("Campinas");
                                    if (segmentLocation === "São Paulo" && !isSP) return false;
                                    if (segmentLocation === "Campinas" && !isCampinas) return false;
                                  }
                                  if (segmentLoyalty === "Recorrentes") {
                                    if (c.purchaseHistoryCount < 10) return false;
                                  } else if (segmentLoyalty === "Ausentes") {
                                    if (c.purchaseHistoryCount >= 10) return false;
                                  } else if (segmentLoyalty === "Recompra") {
                                    if (c.purchaseHistoryCount > 20) return false;
                                  }
                                  if (segmentCategory !== "Todos") {
                                    const noteStr = (c.notes || "").toLowerCase();
                                    const nameStr = c.name.toLowerCase();
                                    if (segmentCategory === "Tintas" && !noteStr.includes("tinta") && !nameStr.includes("prumo") && !noteStr.includes("sherwin")) return false;
                                    if (segmentCategory === "EPI" && !noteStr.includes("eletricista") && !noteStr.includes("reformas") && !noteStr.includes("óculos")) return false;
                                    if (segmentCategory === "Parafusos" && !noteStr.includes("pregos") && !noteStr.includes("reformas")) return false;
                                    if (segmentCategory === "Materiais Hidráulicos" && !noteStr.includes("encanador") && !nameStr.includes("prumo")) return false;
                                  }
                                  return true;
                                });

                                if (filtered.length === 0) {
                                  alert("Erro: Nenhum cliente qualifica para sincronizar!");
                                  setMailchimpSyncing(false);
                                  return;
                                }

                                filtered.forEach((cItem, i) => {
                                  setTimeout(() => {
                                    setMailchimpLogs(prev => [
                                      `[${new Date().toLocaleTimeString()}] Sincronizado: ${cItem.email} com as tags ["SaaS-CRM", "${cItem.type}", "Segmento-${segmentLoyalty}"]`,
                                      ...prev
                                    ]);

                                    if (i === filtered.length - 1) {
                                      setTimeout(() => {
                                        setMailchimpLogs(prev => [
                                          `[${new Date().toLocaleTimeString()}] Sincronização concluída! ${filtered.length} contatos cadastrados/atualizados na audiencia "${mailchimpAudienceId}".`,
                                          ...prev
                                        ]);
                                        setMailchimpSyncing(false);

                                        const newMailchimpSync: MarketingCampaign = {
                                          id: `camp-${Date.now()}`,
                                          title: `Sync Mailchimp: Segmento ${segmentLoyalty}`,
                                          channel: "email",
                                          audienceCount: filtered.length,
                                          messageText: `Sincronização manual Mailchimp de ${filtered.length} contatos qualificados.`,
                                          status: "enviado",
                                          dateCreated: new Date().toISOString(),
                                          dateSent: new Date().toISOString()
                                        };
                                        setCampaigns(prevC => [newMailchimpSync, ...prevC]);
                                        alert(`Sucesso! Sincronização em segundo plano concluída com o Mailchimp.`);
                                      }, 400);
                                    }
                                  }, (i + 1) * 1000);
                                });
                              }}
                              disabled={mailchimpSyncing}
                              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-lg transition-colors border-none"
                            >
                              <RefreshCw className={`w-3.5 h-3.5 ${mailchimpSyncing && 'animate-spin'}`} />
                              {mailchimpSyncing ? "Processando API..." : "Sincronizar Lista Ativa de Segmento no Mailchimp"}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* CONSOLE LOGGER SCREEN OF AUTOMATIONS */}
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-[10px] font-mono leading-relaxed text-slate-300">
                        <span className="text-[9px] uppercase font-black text-slate-500 block mb-1">Terminal de logs de automações em tempo real:</span>
                        <div className="max-h-24 h-24 overflow-y-auto space-y-1 bg-black/40 p-2 rounded border border-white/5 scrollbar-thin">
                          {whatsappConnected ? (
                            whatsappLogs.slice().reverse().map((logText, lIndex) => (
                              <div key={lIndex} className="text-emerald-400 font-mono truncate">{logText}</div>
                            ))
                          ) : (
                            mailchimpLogs.map((logText, lIndex) => (
                              <div key={lIndex} className="text-indigo-400 font-mono truncate">{logText}</div>
                            ))
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Sent history list */}
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <h3 className="text-xs font-bold text-slate-350 uppercase tracking-widest mb-4 font-display">Histórico de Disparos e Sincronizações Executadas</h3>
                    <div className="space-y-3">
                      {campaigns.map(camp => (
                        <div key={camp.id} className="bg-slate-950 p-3.5 rounded-lg border border-slate-850 flex justify-between items-center text-xs">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-200">{camp.title}</span>
                              <span className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-black ${camp.channel === 'whatsapp' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                                {camp.channel === 'whatsapp' ? '💬 WhatsApp API' : '📧 Mailchimp Sync'}
                              </span>
                            </div>
                            <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">{camp.messageText}</p>
                            <span className="text-[10px] text-zinc-500 block mt-1">Disparado em: {new Date(camp.dateCreated).toLocaleString()}</span>
                          </div>
                          <div className="text-right text-[11px] text-zinc-400 font-mono min-w-[125px]">
                            <div>Audiência: <strong className="text-white">{camp.audienceCount}</strong> contatos</div>
                            <div className="text-emerald-400 font-bold mt-1.5 flex items-center justify-end gap-1">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                              Enviado com sucesso
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: ASSISTENTE IA */}
              {activeTab === "ai_assistant" && (
                <div className="space-y-6">
                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 text-indigo-400 opacity-20">
                      <Sparkles className="w-24 h-24 rotate-45" />
                    </div>

                    <div className="relative z-10 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-amber-400 animate-bounce" />
                        <h2 className="text-lg font-bold font-display text-white">Análise Inteligente de Vendas e Inventário</h2>
                      </div>
                      <p className="text-xs text-slate-300 mt-2">
                        O nosso mecanismo utiliza a IA Gemini 3.5 para interpretar as vendas de hoje, produtos em escassez e sugerir as melhores ordens de compras diretamente com marcas famosas para a sua loja!
                      </p>

                      <div className="mt-4 flex gap-3">
                        <button 
                          onClick={fetchAiAdvice}
                          disabled={isLoadingAI}
                          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg flex items-center gap-2 transition-all cursor-pointer"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAI && 'animate-spin'}`} />
                          {isLoadingAI ? "Processando Relatório Inteligente..." : "Gerar Nova Análise da Loja"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* AI Response Block */}
                  <div className="bg-slate-900/60 backdrop-blur-xs p-6 rounded-xl border border-indigo-900/50 space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                      <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Feedback da Inteligência Artificial em Tempo Real</span>
                      <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">Modelo: gemini-3.5-flash</span>
                    </div>

                    {isLoadingAI ? (
                      <div className="py-20 flex flex-col items-center justify-center space-y-3">
                        <div className="w-10 h-10 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
                        <p className="text-xs text-slate-400">Verificando dados de saída e conferindo regras tributárias do sistema...</p>
                      </div>
                    ) : (
                      <div className="prose prose-invert max-w-none text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
                        {aiAnalysis || "Clique no botão acima para alimentar o robô com as vendas do dia e obter seus insights de inteligência."}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 9: ADMINISTRADOR MASTER */}
              {activeTab === "admin_master" && (
                <div className="space-y-6">
                  <div className="bg-slate-900 p-5 rounded-xl border border-red-950 relative">
                    <span className="bg-red-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded uppercase font-mono absolute top-4 right-4">Acesso Exclusivo</span>
                    <h2 className="text-base font-bold text-white font-display">Painel Administrativo Master (Dono da Licença SaaS)</h2>
                    <p className="text-xs text-slate-400 mt-1">Configure o ecossistema, gerencie propagandas visuais, crie promoções e configure bloqueios de IP de login.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Propaganda and ad management */}
                    <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-4">
                      <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-wider">Gestor de Banners Publicitários Integrados</h3>
                      <div className="space-y-3">
                        {banners.map(b => (
                          <div key={b.id} className="p-3 rounded-lg bg-slate-950 border border-slate-850 flex justify-between items-center text-xs">
                            <div className="flex items-center gap-3">
                              <img src={b.imageUrl} alt={b.title} className="w-12 h-12 object-cover rounded" />
                              <div>
                                <p className="font-bold text-slate-250 truncate max-w-[150px]">{b.title}</p>
                                <span className="text-[10px] text-slate-500">Impressões: {b.impressions} | Cliques: {b.clicks}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-bold ${b.active ? 'text-emerald-400' : 'text-slate-500'}`}>{b.active ? 'Ativo' : 'Pausado'}</span>
                              <input 
                                type="checkbox"
                                checked={b.active}
                                onChange={(e) => {
                                  setBanners(banners.map(currB => currB.id === b.id ? { ...currB, active: e.target.checked } : currB));
                                }}
                                className="rounded accent-indigo-500 cursor-pointer"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add new advertisement */}
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const title = formData.get("title") as string;
                          const link = formData.get("link") as string;
                          const url = formData.get("url") as string;

                          if (!title) return;

                          const newAd: PropagandaBanner = {
                            id: `ad-${Date.now()}`,
                            title,
                            imageUrl: url || "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&q=80&w=200",
                            link: link || "https://www.google.com.br",
                            displayLocation: "lateral",
                            active: true,
                            impressions: 1,
                            clicks: 0
                          };

                          setBanners([...banners, newAd]);
                          e.currentTarget.reset();
                          alert("Banner de propaganda cadastrado com sucesso!");
                        }}
                        className="space-y-2 pt-2 border-t border-slate-800"
                      >
                        <input type="text" name="title" required placeholder="Título do Anunciante" className="w-full bg-slate-950 text-xs p-2 rounded text-white border border-slate-800" />
                        <input type="text" name="url" placeholder="URL da imagem (Unsplash)" className="w-full bg-slate-950 text-xs p-2 rounded text-white border border-slate-800" />
                        <input type="text" name="link" placeholder="Link de destino" className="w-full bg-slate-950 text-xs p-2 rounded text-white border border-slate-800" />
                        <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white rounded">
                          Salvar e Ativar Anúncio
                        </button>
                      </form>
                    </div>

                    {/* Manage plan prices and blocks */}
                    <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-4">
                      <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-wider">Alterar Parâmetros de Cobrança / Bloqueio</h3>
                      
                      <div className="space-y-3 font-mono text-xs text-slate-300">
                        <div className="flex justify-between p-2 rounded bg-slate-950">
                          <span>Status da Licença Atual:</span>
                          <select 
                            value={currentTenant.licenseStatus}
                            onChange={(e) => {
                              setCurrentTenant({ ...currentTenant, licenseStatus: e.target.value as any });
                            }}
                            className="bg-slate-900 text-xs p-1 rounded border border-slate-800 focus:outline-hidden"
                          >
                            <option value="active">✓ Ativa (Acesso Total)</option>
                            <option value="expired">✗ Expiração Pendente</option>
                            <option value="blocked">⛔ Suspenso Judicial / Bloqueado</option>
                          </select>
                        </div>

                        <div className="p-3 bg-indigo-950/20 rounded border border-indigo-900 space-y-2 text-[11px] leading-relaxed">
                          <p className="font-bold text-indigo-400">⚡ Simule os Estados Legais:</p>
                          <p>Altere o status do cliente acima para ver as proteções automáticas de LGPD, bloqueio de tela com PIX Copie-Cole, e interações na nuvem em tempo real.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      )}

      {/* MODAL WINDOWS FOR ADDITIONS */}
      {/* 1. ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Novo Registro de Produto</h3>
              <button onClick={() => setShowAddProductModal(false)} className="p-1 hover:bg-slate-800 rounded text-slate-400"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleAddNewProduct} className="space-y-4 text-xs text-slate-300">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Código Interno</label>
                  <input type="text" placeholder="Ex: FER-201" value={newProduct.code} onChange={e => setNewProduct({ ...newProduct, code: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Código de Barras EAN</label>
                  <input type="text" placeholder="Auto-gerado se vazio" value={newProduct.barcode} onChange={e => setNewProduct({ ...newProduct, barcode: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Descrição Comercial do Item *</label>
                <input type="text" required placeholder="Ex: Chave Estrela 14x15 Gedore" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Categoria Ferragista *</label>
                  <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value as any })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white">
                    {categoriesList.filter(c => c !== "Todos").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Subcategoria</label>
                  <input type="text" placeholder="Ex: Chaves Fixas" value={newProduct.subCategory} onChange={e => setNewProduct({ ...newProduct, subCategory: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Marca / Fabricante</label>
                  <input type="text" placeholder="Gedore, Tramontina..." value={newProduct.brand} onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Custo Fornecedor R$ *</label>
                  <input type="number" step="0.01" required value={newProduct.cost} onChange={e => setNewProduct({ ...newProduct, cost: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Preço de Venda R$ *</label>
                  <input type="number" step="0.01" required value={newProduct.salePrice} onChange={e => setNewProduct({ ...newProduct, salePrice: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Unidade Venda *</label>
                  <select value={newProduct.unit} onChange={e => setNewProduct({ ...newProduct, unit: e.target.value as any })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white">
                    <option value="UN">UN - Unidade</option>
                    <option value="KG">KG - Quilograma</option>
                    <option value="M">M - Metro Linear</option>
                    <option value="PCT">PCT - Pacote</option>
                    <option value="CX">CX - Caixa fechada</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Estoque Inicial</label>
                  <input type="number" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nível Mínimo</label>
                  <input type="number" value={newProduct.stockMin} onChange={e => setNewProduct({ ...newProduct, stockMin: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nível Máximo</label>
                  <input type="number" value={newProduct.stockMax} onChange={e => setNewProduct({ ...newProduct, stockMax: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Localização no Galpão</label>
                  <input type="text" placeholder="Ex: Corredor A, Prateleira 4" value={newProduct.location} onChange={e => setNewProduct({ ...newProduct, location: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Fornecedor Vinculado</label>
                  <select value={newProduct.supplierId} onChange={e => setNewProduct({ ...newProduct, supplierId: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white">
                    {suppliers.map(s => (
                      <option key={s.id} value={s.id}>{s.companyName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs">
                Gravar e Inserir no Estoque central
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. ADD CLIENT MODAL */}
      {showAddClientModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-md w-full">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Novo Cadastro de Cliente</h3>
              <button onClick={() => setShowAddClientModal(false)} className="p-1 hover:bg-slate-800 rounded text-slate-400"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleAddNewClient} className="space-y-4 text-xs text-slate-300">
              <div className="flex gap-4 p-2 bg-slate-950 rounded border border-slate-800 justify-center">
                <span className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="radio" checked={newClient.type === "PF"} onChange={() => setNewClient({ ...newClient, type: "PF" })} className="accent-amber-500" /> Pessoa Física (CPF)
                </span>
                <span className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="radio" checked={newClient.type === "PJ"} onChange={() => setNewClient({ ...newClient, type: "PJ" })} className="accent-amber-500" /> Pessoa Jurídica (CNPJ)
                </span>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nome Completo / Razão Social *</label>
                <input type="text" required placeholder="Ex: Construtora Aliança" value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">CPF / CNPJ *</label>
                  <input type="text" required placeholder="Apenas números ou formatado" value={newClient.document} onChange={e => setNewClient({ ...newClient, document: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">RG ou Inscrição Estadual</label>
                  <input type="text" placeholder="Opcional" value={newClient.stateEnrollment} onChange={e => setNewClient({ ...newClient, stateEnrollment: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Telefone Principal *</label>
                  <input type="text" required placeholder="Ex: (11) 98888-0000" value={newClient.phone} onChange={e => setNewClient({ ...newClient, phone: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">E-mail</label>
                  <input type="email" placeholder="nome@email.com" value={newClient.email} onChange={e => setNewClient({ ...newClient, email: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Endereço Comercial / Faturamento</label>
                <input type="text" value={newClient.address} onChange={e => setNewClient({ ...newClient, address: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Limite Máximo do Crediário Próprio (R$)</label>
                <input type="number" value={newClient.creditLimit} onChange={e => setNewClient({ ...newClient, creditLimit: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-bold text-emerald-400" />
              </div>

              <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs">
                Confirmar Cadastro de Cliente
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. ADD COLLABORATOR MODAL */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-sm w-full animate-scale-in">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Novo Colaborador</h3>
              <button onClick={() => setShowAddEmployeeModal(false)} className="p-1 hover:bg-slate-800 text-slate-450"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleAddNewEmployee} className="space-y-4 text-xs text-slate-300">
              <div>
                <label className="block text-zinc-400 uppercase font-bold text-[10px] mb-1">Nome do Funcionário *</label>
                <input type="text" required placeholder="Nome completo" value={newEmployee.name} onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold text-[10px] mb-1">CPF *</label>
                <input type="text" required placeholder="000.000.000-00" value={newEmployee.document} onChange={e => setNewEmployee({ ...newEmployee, document: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold text-[10px] mb-1">Cargo / Função *</label>
                  <select value={newEmployee.role} onChange={e => setNewEmployee({ ...newEmployee, role: e.target.value as any })} className="w-full bg-slate-950 border border-slate-880 rounded p-2 text-white">
                    <option value="Vendedor">Vendedor</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Estoquista">Estoquista</option>
                    <option value="Caixa">Caixa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase font-bold text-[10px] mb-1">Departamento</label>
                  <input type="text" value={newEmployee.department} onChange={e => setNewEmployee({ ...newEmployee, department: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold text-[10px] mb-1">Salário Fixo R$</label>
                  <input type="number" value={newEmployee.salary} onChange={e => setNewEmployee({ ...newEmployee, salary: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase font-bold text-[10px] mb-1">Taxa Comissão %</label>
                  <input type="number" step="0.1" value={newEmployee.commissionRate} onChange={e => setNewEmployee({ ...newEmployee, commissionRate: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
                </div>
              </div>

              <button type="submit" className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded">
                Efetuar Cadastro
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
