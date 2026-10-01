const { useState } = React;

const StatCard = ({ title, value, icon, borderColor, textColor }) => (
  <div className={`bg-white p-4 rounded-xl shadow-sm border-l-4 ${borderColor} flex justify-between items-center`}>
    <div>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</p>
      <h3 className={`text-xl font-extrabold mt-1 ${textColor || 'text-gray-800'}`}>{value}</h3>
    </div>
    {icon && <div className="text-2xl">{icon}</div>}
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const [repairs] = useState([
    { id: 'REP-001', customer: 'Ahmadu Bello', device: 'Samsung Galaxy A12', issue: 'Screen Replacement', status: 'In Progress', cost: '₦15,000' },
    { id: 'REP-002', customer: 'Fatima Usman', device: 'iPhone 11', issue: 'Battery Replacement', status: 'Pending', cost: '₦12,500' }
  ]);

  const [products] = useState([
    { id: 1, name: 'Original Type-C Charger', category: 'Accessories', stock: 15, price: '₦3,500' },
    { id: 2, name: 'Tempered Glass Protector', category: 'Screen Guard', stock: 40, price: '₦1,000' }
  ]);

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-6 max-w-2xl mx-auto font-sans pb-20">
      
      <div className="bg-white p-4 rounded-xl shadow-sm mb-4 border border-slate-200 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-gray-800 text-lg">Novastack Enterprise</h2>
          <p className="text-xs text-gray-400 mt-0.5">Admin Management System</p>
        </div>
        <span className="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-semibold">Live</span>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'overview' ? 'bg-slate-800 text-white shadow' : 'bg-white text-gray-600 border border-slate-200'}`}>
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('repairs')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'repairs' ? 'bg-slate-800 text-white shadow' : 'bg-white text-gray-600 border border-slate-200'}`}>
          Repairs ({repairs.length})
        </button>
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'inventory' ? 'bg-slate-800 text-white shadow' : 'bg-white text-gray-600 border border-slate-200'}`}>
          Inventory ({products.length})
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-3">
          <StatCard title="TODAY'S SALES" value="₦0.00" borderColor="border-emerald-500" textColor="text-emerald-600" icon="💵" />
          <StatCard title="TODAY'S PROFIT" value="₦0.00" borderColor="border-emerald-500" textColor="text-emerald-600" icon="📈" />
          <StatCard title="MONTHLY SALES" value="₦60,140.00" borderColor="border-blue-500" textColor="text-blue-600" icon="🛍️" />
          <StatCard title="PENDING REPAIRS" value={`${repairs.length} Jobs`} borderColor="border-amber-500" textColor="text-amber-600" icon="🔧" />

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-slate-200">
              <p className="text-xs font-bold text-gray-500 uppercase">TOTAL PRODUCTS</p>
              <h4 className="text-xl font-extrabold text-gray-800 mt-1">{products.length}</h4>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-slate-200">
              <p className="text-xs font-bold text-gray-500 uppercase">TOTAL MOBILES</p>
              <h4 className="text-xl font-extrabold text-gray-800 mt-1">2</h4>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'repairs' && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800 text-sm">Repair Jobs List</h3>
            <button className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold shadow-sm">+ New Job</button>
          </div>
          <div className="space-y-2">
            {repairs.map(item => (
              <div key={item.id} className="p-3 border border-slate-100 rounded-lg bg-slate-50 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-gray-800">{item.device}</p>
                  <p className="text-gray-500">{item.customer} • <span className="text-amber-600">{item.issue}</span></p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-700 block">{item.cost}</span>
                  <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800 text-sm">Stock Inventory</h3>
            <button className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold shadow-sm">+ Add Item</button>
          </div>
          <div className="space-y-2">
            {products.map(prod => (
              <div key={prod.id} className="p-3 border border-slate-100 rounded-lg bg-slate-50 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-gray-800">{prod.name}</p>
                  <p className="text-gray-500">{prod.category} • Qty: {prod.stock}</p>
                </div>
                <span className="font-extrabold text-emerald-600">{prod.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
