import React from 'react';
import { Table, Tag, Space, Button, Input, Dropdown } from 'antd';
import { SearchOutlined, FilterOutlined, MoreOutlined, EyeOutlined } from '@ant-design/icons';
import { PageHeader } from '../components/ui/PageHeader';
import { useOrders } from '../hooks';
import { Order } from '../types';
import { cn } from '../lib/utils';

export const Orders: React.FC = () => {
  const { orders, loading } = useOrders();

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <span className="font-mono font-medium text-slate-800">{text}</span>,
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
            {text.charAt(0)}
          </div>
          <span className="font-medium text-slate-800">{text}</span>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => <span className="text-slate-500">{new Date(date).toLocaleDateString()}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
          status === 'completed' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
          status === 'shipping' ? "bg-blue-50 text-blue-600 border border-blue-100" :
          status === 'pending' ? "bg-amber-50 text-amber-600 border border-amber-100" :
          "bg-slate-50 text-slate-400 border border-slate-100"
        )}>
          {status}
        </span>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => <span className="font-bold text-slate-900">${total.toFixed(2)}</span>,
    },
    {
      title: 'Actions',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="text" icon={<EyeOutlined className="text-slate-400" />} />
          <Button type="text" icon={<MoreOutlined className="text-slate-400" />} />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Orders" 
        description="Track and manage customer orders across all channels."
      />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Input 
            placeholder="Search orders..." 
            prefix={<SearchOutlined className="text-slate-400" />}
            className="rounded-xl h-10 max-w-md"
          />
          <div className="flex items-center gap-3">
            <Button icon={<FilterOutlined />} className="rounded-xl h-10">Status</Button>
            <Button className="rounded-xl h-10">Export CSV</Button>
          </div>
        </div>

        <Table 
          columns={columns} 
          dataSource={orders} 
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 6 }}
        />
      </div>
    </div>
  );
};

export default Orders;
