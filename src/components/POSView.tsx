import React, { useState } from "react";
import { Product, Sale, Employee, Client } from "../types";
import { ShoppingCart, Search, Trash2, Printer, CheckCircle, FileText, ArrowRight, Sparkles, Tag, Percent } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface POSProps {
  products: Product[];
  employees: Employee[];
  clients: Client[];
  onCompleteSale: (sale: Sale, updatedProducts: Product[]) => void;
  propagandaBanner?: { title: string; imageUrl: string; link: string };
  onAdClick?: () => void;
}

export default function POSView({ products, employees, clients, onCompleteSale, propagandaBanner, onAdClick }: POSProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [selectedSeller, setSelectedSeller] = useState<string>(employees[0]?.name || "Carlos Souza");
  const [selectedClient, setSelectedClient] = useState<string>("Consumidor Final");
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credito' | 'debito' | 'boleto' | 'dinheiro'>("pix");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [lastEmittedSale, setLastEmittedSale] = useState<Sale | null>(null);
  const [isFiscal, setIsFiscal] = useState(true);

  // Filter products by description or barcode or code
  const filteredProducts = products.filter(p => 
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.barcode.includes(searchTerm) || 
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      alert("Aviso: Produto sem estoque disponível no momento! É recomendável reabastecer.");
    }
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (productId: string, val: number) => {
    if (val <= 0) {
      setCart(cart.filter(item => item.product.id !== productId));
      return;
    }
    setCart(cart.map(item => 
      item.product.id === productId ? { ...item, quantity: val } : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.product.salePrice * item.quantity), 0);
  };

  const getTotal = () => {
    const sub = getSubtotal();
    return Math.max(0, sub - discount);
  };

  const handleCheckout = (type: 'pdv' | 'orcamento' | 'pedido') => {
    if (cart.length === 0) {
      alert("Adicione pelo menos um item ao carrinho!");
      return;
    }

    const subtotal = getSubtotal();
    const total = getTotal();

    // Map cart to sale items
    const saleItems = cart.map(item => ({
      productId: item.product.id,
      description: item.product.description,
      quantity: item.quantity,
      price: item.product.salePrice,
      unit: item.product.unit
    }));

    // Update stocks
    const updatedProducts = products.map(prod => {
      const cartItem = cart.find(item => item.product.id === prod.id);
      if (cartItem && type !== 'orcamento') {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - cartItem.quantity)
        };
      }
      return prod;
    });

    const docNumber = Math.floor(100000 + Math.random() * 900000);
    const invoicePrefix = type === 'pdv' ? 'NFCe' : 'PED';

    const newSale: Sale = {
      id: `venda-${Date.now()}`,
      invoiceNumber: `${invoicePrefix}-${docNumber}`,
      type,
      items: saleItems,
      subtotal,
      discount,
      total,
      paymentMethod,
      clientName: selectedClient,
      sellerName: selectedSeller,
      date: new Date().toISOString().replace(/\.\d+Z/, ""),
      isFiscalEmitted: type === 'pdv' && isFiscal
    };

    onCompleteSale(newSale, updatedProducts);
    setLastEmittedSale(newSale);
    setShowInvoiceModal(true);
    setCart([]);
    setDiscount(0);
  };

  return (
    <div id="pos-view-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      {/* Product Selection area */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-xs border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-display flex items-center gap-2 mb-3">
            <Search className="w-5 h-5 text-amber-500" />
            Localizar Produtos (Código, Descrição ou Código de Barras)
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Digite o nome do parafuso, martelo, marca, etc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 pl-4 pr-10 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-sm"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 text-xs text-zinc-500 hover:text-zinc-700 bg-zinc-200 dark:bg-zinc-800 rounded px-1.5 py-0.5"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-xs border border-zinc-200 dark:border-zinc-800 flex-1 overflow-y-auto max-h-[500px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredProducts.map((product) => {
              const isLow = product.stock <= product.stockMin;
              return (
                <div 
                  key={product.id}
                  id={`pos-product-${product.id}`}
                  onClick={() => addToCart(product)}
                  className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 dark:hover:border-amber-500 rounded-lg p-3 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded">
                        {product.code}
                      </span>
                      <span className="text-[10px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-1.5 rounded">
                        {product.brand}
                      </span>
                    </div>
                    <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-2 line-clamp-2">
                      {product.description}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-zinc-500">Valor Unitário</p>
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {product.salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-zinc-500">Estoque</p>
                      <p className={`text-xs font-bold ${isLow ? 'text-red-500' : 'text-zinc-700 dark:text-zinc-300'}`}>
                        {product.stock} {product.unit}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-8 text-center text-zinc-500">
                Qualquer produto digitado não foi localizado. Cadastre um novo produto!
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Ad Campaign */}
        {propagandaBanner && (
          <div 
            onClick={() => onAdClick?.()}
            className="bg-amber-50 dark:bg-zinc-950 hover:bg-amber-100/50 dark:hover:bg-indigo-950/25 border border-amber-200 dark:border-amber-950 hover:border-amber-400 dark:hover:border-indigo-800/60 rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all duration-200 hover:shadow-md group"
          >
            <div className="bg-amber-500 group-hover:bg-indigo-505 bg-amber-500 text-white rounded px-1.5 py-0.5 text-[9px] uppercase font-black tracking-wider shadow-xs">Anúncio CRM</div>
            <button className="text-left text-xs font-semibold text-amber-800 dark:text-amber-300 group-hover:text-indigo-405 group-hover:text-indigo-400 flex-1 truncate bg-transparent border-none p-0 outline-hidden">
              {propagandaBanner.title} — clique para abrir o painel oculto de campanhas!
            </button>
            <span className="text-[10px] text-zinc-500 font-mono group-hover:text-indigo-400 select-none">🔑 Config</span>
          </div>
        )}
      </div>

      {/* Checkout and Cart area */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-xs border border-zinc-200 dark:border-zinc-800 flex flex-col flex-1">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-display flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-3">
            <ShoppingCart className="w-5 h-5 text-amber-500" />
            Carrinho / Comprovante Atual
          </h2>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto max-h-[250px] space-y-2 pr-1 mb-4">
            {cart.map((item) => (
              <div 
                key={item.product.id}
                className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-100 dark:border-zinc-900 text-xs"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {item.product.description}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">
                    {item.product.salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} / {item.product.unit}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateCartQuantity(item.product.id, parseInt(e.target.value) || 1)}
                    className="w-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center py-1 rounded text-zinc-900 dark:text-zinc-100 font-bold"
                  />
                  <span className="font-bold text-zinc-950 dark:text-zinc-50 min-w-[60px] text-right">
                    {(item.product.salePrice * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1 hover:text-red-500 rounded transition-colors text-zinc-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {cart.length === 0 && (
              <div className="h-40 flex flex-col items-center justify-center text-zinc-400">
                <ShoppingCart className="w-8 h-8 opacity-40 mb-2" />
                <p>O caixa está livre.</p>
                <p className="text-[10px]">Utilize a listagem ao lado para inserir itens.</p>
              </div>
            )}
          </div>

          {/* Cashier configurations */}
          <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Vendedor</label>
                <select 
                  value={selectedSeller}
                  onChange={(e) => setSelectedSeller(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded p-2 focus:outline-hidden"
                >
                  {employees.map(e => (
                    <option key={e.id} value={e.name}>{e.name} ({e.role})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Cliente / Limite</label>
                <select 
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded p-2 focus:outline-hidden"
                >
                  <option value="Consumidor Final">Consumidor de Balcão</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.name}>{c.name} ({c.type})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Forma de Pagamento</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded p-2 focus:outline-hidden font-semibold capitalize"
                >
                  <option value="pix">⚡ PIX Digital</option>
                  <option value="credito">💳 Cartão de Crédito</option>
                  <option value="debito">💳 Cartão de Débito</option>
                  <option value="boleto">📄 Boleto Faturado</option>
                  <option value="dinheiro">💵 Dinheiro Líquido</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Desconto Manuel (R$)</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-zinc-400">R$</span>
                  <input 
                    type="number"
                    min="0"
                    placeholder="0,00"
                    value={discount || ""}
                    onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded pl-8 pr-2 py-1.5 focus:outline-hidden text-right font-bold text-emerald-600"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-950 p-2 rounded-lg mt-1 justify-between">
              <span className="text-[10px] uppercase font-bold text-zinc-500">Enviar Nota Fiscal (NFC-e)</span>
              <input 
                type="checkbox" 
                checked={isFiscal} 
                onChange={(e) => setIsFiscal(e.target.checked)}
                className="rounded accent-amber-500 w-4 h-4 cursor-pointer"
              />
            </div>
          </div>

          {/* Pricing summary */}
          <div className="mt-4 pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <div className="flex justify-between text-zinc-500 text-xs">
              <span>Subtotal bruto:</span>
              <span>{getSubtotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-red-500 text-xs font-semibold">
                <span>Desconto concedido:</span>
                <span>- {discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-900 dark:text-zinc-50 text-base font-bold pt-1">
              <span>Total líquido:</span>
              <span className="text-xl text-amber-600 dark:text-amber-400">
                {getTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => handleCheckout('orcamento')}
              disabled={cart.length === 0}
              className="py-2.5 px-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 text-xs"
            >
              <FileText className="w-4 h-4" />
              Salvar Orçamento
            </button>
            <button
              onClick={() => handleCheckout('pdv')}
              disabled={cart.length === 0}
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 text-xs shadow-md"
            >
              <CheckCircle className="w-4 h-4" />
              Concluir Venda (PDV)
            </button>
          </div>
        </div>
      </div>

      {/* NFC-e Receipt Modal Mockup */}
      <AnimatePresence>
        {showInvoiceModal && lastEmittedSale && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white text-zinc-900 rounded-xl p-5 max-w-sm w-full shadow-2xl relative font-mono text-xs max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center border-b border-dashed border-zinc-300 pb-4 mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider">FERRAGISTA CENTRAL BRASIL</h3>
                <p className="text-[10px] text-zinc-500">Distribuição Especializada de Ferragens & Tintas</p>
                <p className="text-[9px] text-zinc-500">CNPJ: 12.345.678/0001-90</p>
                <p className="text-[9px] text-zinc-500">Av. Brasil, 1500 - Setor Industrial</p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between">
                  <span>DOC: {lastEmittedSale.invoiceNumber}</span>
                  <span className="capitalize">Tipo: {lastEmittedSale.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Data: {new Date(lastEmittedSale.date).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cliente: {lastEmittedSale.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Operador: {lastEmittedSale.sellerName}</span>
                </div>
              </div>

              <div className="border-t border-b border-dashed border-zinc-300 py-3 mb-4">
                <div className="flex justify-between font-bold uppercase mb-1">
                  <span>Item / Descrição</span>
                  <span>Qtd x Preço</span>
                </div>
                {lastEmittedSale.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-zinc-100 last:border-0">
                    <span className="truncate max-w-[180px]">{it.description}</span>
                    <span>{it.quantity} x {it.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 mb-4 text-right">
                <div className="flex justify-between">
                  <span>Subtotal bruto:</span>
                  <span>{lastEmittedSale.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
                {lastEmittedSale.discount > 0 && (
                  <div className="flex justify-between text-rose-600">
                    <span>Desconto:</span>
                    <span>- {lastEmittedSale.discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-emerald-700">
                  <span>PAGO VIA ({lastEmittedSale.paymentMethod?.toUpperCase()}):</span>
                  <span>{lastEmittedSale.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              </div>

              {lastEmittedSale.isFiscalEmitted && (
                <div className="bg-zinc-50 border border-zinc-200 rounded p-2 text-center mb-4">
                  <p className="text-[10px] font-bold text-emerald-800 uppercase flex items-center justify-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> NFC-e Emitida com Sucesso
                  </p>
                  <p className="text-[8px] text-zinc-500 mt-1">Chave de Acesso Sefaz:</p>
                  <p className="text-[8px] text-zinc-700 font-mono select-all truncate">3526 0612 3456 7800 0190 6500 1000 0104 2112</p>
                </div>
              )}

              <div className="text-center text-[10px] text-zinc-400 mt-4 pt-4 border-t border-dashed border-zinc-300">
                <p>Obrigado pela preferência!</p>
                <p className="text-[8px]">ERP Central - Sistema Homologado</p>
              </div>

              <div className="flex gap-2 mt-5">
                <button 
                  onClick={() => setShowInvoiceModal(false)}
                  className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-lg cursor-pointer"
                >
                  Fechar Cupom
                </button>
                <button 
                  onClick={() => { window.print(); }}
                  className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg"
                  title="Simular Impressora Mecânica"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
