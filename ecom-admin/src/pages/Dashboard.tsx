import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Percent,
  MoreVertical
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useOrders } from '../hooks';
import { cn } from '../lib/utils';

const data = [
  { name: 'Mon', revenue: 4000, orders: 240 },
  { name: 'Tue', revenue: 3000, orders: 198 },
  { name: 'Wed', revenue: 2000, orders: 980 },
  { name: 'Thu', revenue: 2780, orders: 390 },
  { name: 'Fri', revenue: 1890, orders: 480 },
  { name: 'Sat', revenue: 2390, orders: 380 },
  { name: 'Sun', revenue: 3490, orders: 430 },
];

const StatCard = ({ title, value, trend, icon: Icon, trendValue }: any) => (
  <Card className="hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h4 className="text-2xl font-bold text-slate-900 mt-1">{value}</h4>
        <div className="flex items-center mt-2">
          <span className={cn(
            "text-xs font-semibold px-1.5 py-0.5 rounded-md flex items-center gap-1",
            trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          )}>
            {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trendValue}
          </span>
          <span className="text-xs text-slate-400 ml-2">vs last week</span>
        </div>
      </div>
      <div className="p-3 bg-slate-50 rounded-2xl text-slate-600">
        <Icon size={24} />
      </div>
    </div>
  </Card>
);

export const Dashboard: React.FC = () => {
  const { orders } = useOrders();

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Welcome back, Alex" 
        description="Here's what's happening with your store today."
        actions={
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            Download Report
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$128,430" trend="up" trendValue="+12.5%" icon={DollarSign} />
        <StatCard title="Total Orders" value="1,240" trend="up" trendValue="+8.2%" icon={ShoppingCart} />
        <StatCard title="Total Customers" value="48,500" trend="down" trendValue="-2.4%" icon={Users} />
        <StatCard title="Conversion Rate" value="3.24%" trend="up" trendValue="+4.1%" icon={Percent} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Revenue Analytics" className="lg:col-span-2 min-h-[400px]" subtitle="Last 7 days performance">
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Recent Orders" subtitle="Latest transactions" noPadding>
          <div className="flex flex-col">
            {orders.slice(0, 5).map((order, i) => (
              <div 
                key={order.id} 
                className={cn(
                  "px-6 py-4 flex items-center justify-between border-slate-50",
                  i !== 4 && "border-b"
                )}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">{order.customerName}</p>
                  <p className="text-xs text-slate-500">{order.date.split('T')[0]}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">${order.total.toFixed(2)}</p>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                    order.status === 'completed' ? "bg-emerald-50 text-emerald-600" :
                    order.status === 'pending' ? "bg-amber-50 text-amber-600" :
                    "bg-slate-50 text-slate-600"
                  )}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
              <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View all orders</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
