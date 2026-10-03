const { useState } = React;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  // Sample Product List for POS
  const [products] = useState([
    { id: 1, category: 'Mobile Phones', name: 'iPhone 15 Pro', brand: 'Apple', price: 999, stock: 5 },
    { id: 2, category: 'Mobile Phones', name: 'Galaxy S24 Ultra', brand: 'Samsung', price: 1199, stock: -1 },
  ]);

  // Mobile Inventory Data matching even.vercel.app screenshots
  const [mobileInventory] = useState([
    {
      id: 1,
      brand: 'Apple',
      model: 'A3102',
      color: 'Natural Titanium',
      ramStorage: '8GB / 256GB',
      imei1: '354829104829101',
      imei2: '354829104829102',
      buyPrice: '$850',
      sellPrice: '$999',
      stock: '1 pcs',
      supplier: 'N/A'
    },
    {
      id: 2,
      brand: 'Samsung',
      model: 'SM-S928B',
      color: 'Titanium Black',
      ramStorage: '12GB / 512GB',
      imei1: '864829104829201',
      imei2: '864829104829202',
      buyPrice: '$1000',
      sellPrice: '$1199',
      stock: '-1 pcs',
      supplier: 'N/A'
    }
  ]);

  // Accessories Stock Data matching screenshot
  const [accessoriesInventory] = useState([]);

  // Cart State
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [coupon, setCoupon] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  // Full Sidebar Menu List according to design
  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'POS', icon: '🛒' },
    { name: 'Mobile Inventory', icon: '📱' },
    { name: 'Accessories', icon: '🎧' },
    { name: 'Categories & Brands', icon: '🏷️' },
    { name: 'Repairs', icon: '🔧' },
    { name: 'Warranties', icon: '🛡️' },
    { name: 'Customers', icon: '👥' },
    { name: 'Suppliers', icon: '🚚' },
    { name: 'Purchases', icon: '📦' },
    { name: 'Inventory Logs', icon: '📋' },
    { name: 'Expenses', icon: '💵' },
    { name: 'Accounting', icon: '💼' },
    { name: 'Employees', icon: '👤' },
    { name: 'Branches', icon: '🏢' },
    { name: 'Reports', icon: '📈' },
    { name: 'Export Reports', icon: '📥' },
    { name: 'Quotations', icon: '📄' },
    { name: 'Online Orders', icon: '🛍️' },
    { name: 'Coupons', icon: '🎟️' },
    { name: 'Users & Roles', icon: '👤' },
    { name: 'Activity Logs', icon: '📜' },
    { name: 'Barcode Generator', icon: '║▌' },
    { name: 'Settings', icon: '⚙️' },
  ];

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-md text-gray-700 hover:bg-gray-100 lg:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-bold text-gray-800 text-base sm:text-lg">{activePage}</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 bg-[#0f172a] text-white rounded-xl flex items-center justify-center hover:bg-slate-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Mobile Backdrop Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Dark Blue Sidebar Menu */}
        <aside className={`
          fixed lg:static top-0 left-0 h-full w-64 bg-[#0b1329] text-slate-300 z-50 transition-transform duration-300 ease-in-out flex flex-col overflow-y-auto
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 flex items-center gap-3 border-b border-slate-800">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white text-lg font-bold">
              🏪
            </div>
            <div>
              <h2 className="font-bold text-white text-sm leading-tight">Mobile Shop ERP</h2>
              <p className="text-[10px] text-slate-400">POS & Repair Management</p>
            </div>
          </div>

          <nav className="p-3 space-y-1 text-sm font-medium">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => { setActivePage(item.name); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition text-left ${
                  item.name === activePage 
                    ? 'bg-blue-600 text-white font-semibold' 
                    : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-xs">{item.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content View */}
        <main className="flex-1 p-3 sm:p-4 space-y-3 max-w-full overflow-x-hidden">
          {activePage === 'Dashboard' && (
            /* Dashboard Screen matching even.vercel.app */
            <div className="space-y-3">
              {/* Analytics Header Card */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base">Executive Analytics Dashboard</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Real-time System Overview</p>
                </div>
              </div>

              {/* Top Primary Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-3.5 rounded-2xl border-l-4 border-emerald-500 shadow-sm flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">TODAY'S SALES</p>
                    <h2 className="text-base font-extrabold text-emerald-600 mt-0.5">Rs. 0.00</h2>
                  </div>
                  <div className="text-emerald-500 text-xl font-bold">$</div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border-l-4 border-emerald-500 shadow-sm flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">TODAY'S PROFIT</p>
                    <h2 className="text-base font-extrabold text-emerald-600 mt-0.5">Rs. 0.00</h2>
                  </div>
                  <div className="text-emerald-500 text-xl">📈</div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border-l-4 border-blue-600 shadow-sm flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">MONTHLY SALES</p>
                    <h2 className="text-base font-extrabold text-blue-600 mt-0.5">Rs. 60140.00</h2>
                  </div>
                  <div className="text-blue-500 text-xl">🛍️</div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border-l-4 border-amber-500 shadow-sm flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PENDING REPAIRS</p>
                    <h2 className="text-base font-extrabold text-amber-600 mt-0.5">0 Jobs</h2>
                  </div>
                  <div className="text-amber-500 text-xl">🔧</div>
                </div>
              </div>

              {/* Secondary Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">TOTAL PRODUCTS</p>
                  <p className="text-sm font-extrabold text-gray-800 mt-1">2</p>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">TOTAL MOBILES</p>
                  <p className="text-sm font-extrabold text-gray-800 mt-1">2</p>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">ACCESSORIES</p>
                  <p className="text-sm font-extrabold text-gray-800 mt-1">0</p>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] text-amber-500 font-bold uppercase">LOW STOCK</p>
                  <p className="text-sm font-extrabold text-amber-600 mt-1">0</p>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] text-rose-500 font-bold uppercase">OUT OF STOCK</p>
                  <p className="text-sm font-extrabold text-rose-600 mt-1">0</p>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">TOTAL CUSTOMERS</p>
                  <p className="text-sm font-extrabold text-gray-800 mt-1">0</p>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm text-center col-span-2 sm:col-span-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">TOTAL SUPPLIERS</p>
                  <p className="text-sm font-extrabold text-gray-800 mt-1">1</p>
                </div>
              </div>

              {/* Sales Graph Section */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                <h4 className="font-bold text-gray-800 text-xs flex items-center gap-1.5">
                  <span>📊</span> Sales Graph — Last 7 Days
                </h4>
                <div className="h-32 bg-slate-50 rounded-xl flex items-end justify-between px-3 py-2 border border-dashed border-gray-200 text-[10px] text-gray-400">
                  {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                    <div key={day} className="flex flex-col items-center gap-1">
                      <span>Rs. 0</span>
                      <div className="w-6 h-1.5 bg-blue-600 rounded-full"></div>
                      <span>{day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Selling Products */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                <h4 className="font-bold text-gray-800 text-xs flex items-center gap-1.5 border-b pb-2">
                  <span>🏅</span> Best Selling Products
                </h4>
                <div className="flex justify-between items-center p-2 border rounded-xl bg-slate-50 text-xs font-semibold">
                  <span>Galaxy S24 Ultra</span>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md">11 Sold</span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded-xl bg-slate-50 text-xs font-semibold">
                  <span>iPhone 15 Pro</span>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md">9 Sold</span>
                </div>
              </div>

              {/* Recent Sales List */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                <h4 className="font-bold text-gray-800 text-xs flex items-center gap-1.5 border-b pb-2">
                  <span>🕒</span> Recent Sales
                </h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center p-2 border rounded-xl text-xs">
                    <div>
                      <p className="font-bold text-gray-800">syed</p>
                      <p className="text-[10px] text-gray-400">Bank Transfer</p>
                    </div>
                    <span className="font-bold text-emerald-600">Rs. 19979</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded-xl text-xs">
                    <div>
                      <p className="font-bold text-gray-800">Walk-in Customer</p>
                      <p className="text-[10px] text-gray-400">Cash</p>
                    </div>
                    <span className="font-bold text-emerald-600">Rs. 4596</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === 'POS' && (
            /* POS Screen matching even.vercel.app */
            <div className="space-y-3">
              {/* Scan / Barcode Input */}
              <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
                <div className="relative flex-1 flex items-center border border-emerald-600 rounded-xl px-2.5 py-1.5">
                  <span className="text-gray-400 mr-2 text-xs">🔍</span>
                  <input type="text" placeholder="Scan or type" className="w-full text-xs outline-none bg-transparent" />
                </div>
                <button className="bg-[#0f172a] text-white text-xs font-semibold px-3 py-2 rounded-xl">Add</button>
                <button className="bg-emerald-600 text-white p-2 rounded-xl text-xs">📷</button>
              </div>

              {/* Product Search Bar */}
              <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
                <div className="relative flex-1 flex items-center border border-gray-300 rounded-xl px-2.5 py-1.5">
                  <span className="text-gray-400 mr-2 text-xs">🔍</span>
                  <input type="text" placeholder="Search product by name" className="w-full text-xs outline-none bg-transparent" />
                </div>
                <button className="bg-emerald-600 text-white text-xs font-semibold px-3 py-2 rounded-xl">Search</button>
              </div>

              {/* Catalogue Items */}
              <div className="grid grid-cols-2 gap-2.5">
                {products.map((item) => (
                  <div key={item.id} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm relative flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] bg-blue-50 text-blue-600 font-semibold px-1.5 py-0.5 rounded inline-block mb-1">{item.category}</span>
                      <h4 className="font-bold text-gray-800 text-xs">{item.name}</h4>
                      <p className="text-[10px] text-gray-400">{item.brand}</p>
                    </div>

                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p className="text-xs font-extrabold text-emerald-600">Rs. {item.price}</p>
                        <p className="text-[9px] text-gray-400">Stock: {item.stock}</p>
                      </div>
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-emerald-600 text-white w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* POS Cart Container */}
              <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm space-y-2.5">
                <h3 className="font-bold text-gray-800 text-xs border-b pb-1.5">POS Cart & Checkout</h3>
                
                <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full border border-gray-300 rounded-xl p-2 text-xs outline-none" />

                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="WhatsApp Phone" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full border border-gray-300 rounded-xl p-2 text-xs outline-none" />
                  <input type="email" placeholder="Customer Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-xl p-2 text-xs outline-none" />
                </div>

                <div className="flex gap-2">
                  <input type="text" placeholder="Coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="flex-1 border border-gray-300 rounded-xl p-2 text-xs outline-none" />
                  <button className="bg-[#0f172a] text-white text-xs font-semibold px-3 rounded-xl">Apply</button>
                </div>

                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border border-gray-300 rounded-xl p-2 text-xs outline-none bg-white">
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>

                <div className="border-t border-b py-3 text-center">
                  {cart.length === 0 ? (
                    <p className="text-xs text-gray-400">Cart is empty</p>
                  ) : (
                    <div className="space-y-1.5 text-left">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-xs">
                          <div>
                            <p className="font-bold text-gray-800">{item.name}</p>
                            <p className="text-gray-400">{item.qty} x Rs. {item.price}</p>
                          </div>
                          <p className="font-bold text-emerald-600">Rs. {item.qty * item.price}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="font-bold text-gray-800 text-xs">Total Payable:</span>
                  <span className="font-extrabold text-emerald-600 text-sm">Rs. {calculateTotal().toFixed(2)}</span>
                </div>

                <button className="w-full bg-emerald-400 text-white font-bold text-xs py-2.5 rounded-xl">
                  Complete Sale
                </button>
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button className="bg-[#0f172a] text-white text-[11px] font-semibold py-2 rounded-xl flex items-center justify-center gap-1">🖨️ Print</button>
                  <button className="bg-blue-600 text-white text-[11px] font-semibold py-2 rounded-xl flex items-center justify-center gap-1">✉️ Email</button>
                  <button className="bg-emerald-600 text-white text-[11px] font-semibold py-2 rounded-xl flex items-center justify-center gap-1">💬 WhatsApp</button>
                </div>
              </div>
            </div>
          )}

          {activePage === 'Mobile Inventory' && (
            /* Mobile Phone Inventory (IMEI Tracked) Screen matching even.vercel.app */
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                  Mobile Phone Inventory <br className="sm:hidden" />
                  <span className="text-xs text-gray-700 font-semibold">(IMEI Tracked)</span>
                </h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 shadow-sm leading-tight text-center">
                  <span>+</span> Add Mobile Stock
                </button>
              </div>

              {/* Scrollable Table View */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[650px]">
                  <thead>
                    <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-800">
                      <th className="pb-3 pr-3">Brand & Model</th>
                      <th className="pb-3 px-3">RAM / Storage</th>
                      <th className="pb-3 px-3">IMEI 1 / IMEI 2</th>
                      <th className="pb-3 px-3">Buy Price</th>
                      <th className="pb-3 px-3">Sell Price</th>
                      <th className="pb-3 px-3">Stock</th>
                      <th className="pb-3 pl-3">Supplier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {mobileInventory.map((item) => (
                      <tr key={item.id} className="align-top">
                        <td className="py-3 pr-3">
                          <div className="font-bold text-gray-900">{item.brand}</div>
                          <div className="font-bold text-gray-900">{item.model}</div>
                          <div className="text-[10px] text-gray-400">({item.color})</div>
                        </td>
                        <td className="py-3 px-3 font-semibold text-gray-700">{item.ramStorage}</td>
                        <td className="py-3 px-3 text-gray-600 font-mono text-[11px]">
                          <div>{item.imei1}</div>
                          <div>{item.imei2}</div>
                        </td>
                        <td className="py-3 px-3 font-semibold text-gray-700">{item.buyPrice}</td>
                        <td className="py-3 px-3 font-extrabold text-emerald-600">{item.sellPrice}</td>
                        <td className="py-3 px-3">
                          <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[11px] inline-block">
                            {item.stock}
                          </span>
                        </td>
                        <td className="py-3 pl-3 text-gray-500 font-semibold">{item.supplier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activePage === 'Accessories' && (
            /* Accessories Stock Screen matching even.vercel.app */
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center gap-2">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
                  Accessories Stock
                </h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 shadow-sm text-center">
                  <span>+</span> Add Accessory
                </button>
              </div>

              {/* Scrollable Table View */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-800">
                      <th className="pb-3 pr-3">Item Name</th>
                      <th className="pb-3 px-3">Category</th>
                      <th className="pb-3 px-3">Brand</th>
                      <th className="pb-3 px-3">Purchase Price</th>
                      <th className="pb-3 px-3">Selling Price</th>
                      <th className="pb-3 pl-3">Stock Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {accessoriesInventory.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-gray-400 font-medium">
                          No accessories found
                        </td>
                      </tr>
                    ) : (
                      accessoriesInventory.map((item) => (
                        <tr key={item.id} className="align-middle">
                          <td className="py-3 pr-3 font-bold text-gray-900">{item.itemName}</td>
                          <td className="py-3 px-3 text-gray-700 font-semibold">{item.category}</td>
                          <td className="py-3 px-3 text-gray-700 font-semibold">{item.brand}</td>
                          <td className="py-3 px-3 font-semibold text-gray-700">{item.purchasePrice}</td>
                          <td className="py-3 px-3 font-extrabold text-emerald-600">{item.sellingPrice}</td>
                          <td className="py-3 pl-3 font-bold text-gray-800">{item.stockQuantity}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activePage !== 'Dashboard' && activePage !== 'POS' && activePage !== 'Mobile Inventory' && activePage !== 'Accessories' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <h2 className="text-base font-bold text-gray-800">{activePage} Screen</h2>
              <p className="text-xs text-gray-400 mt-1">Module layout is ready for execution.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
