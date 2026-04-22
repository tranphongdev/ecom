import React from 'react';
import { Table, Avatar, Tag, Button, Input } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { PageHeader } from '../components/ui/PageHeader';
import { useCustomers } from '../hooks';
import { Customer } from '../types';

export const Customers: React.FC = () => {
  const { customers, loading } = useCustomers();

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Customer) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div className="font-semibold text-slate-800">{text}</div>
            <div className="text-xs text-slate-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Orders',
      dataIndex: 'ordersCount',
      key: 'ordersCount',
      sorter: (a: Customer, b: Customer) => a.ordersCount - b.ordersCount,
    },
    {
      title: 'Total Spent',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (amount: number) => <span className="font-bold text-slate-900">${amount.toLocaleString()}</span>,
      sorter: (a: Customer, b: Customer) => a.totalSpent - b.totalSpent,
    },
    {
      title: 'Last Order',
      dataIndex: 'lastOrderDate',
      key: 'lastOrderDate',
      render: (date: string) => <span className="text-slate-500">{date}</span>,
    },
    {
      title: 'Actions',
      key: 'action',
      render: () => <Button type="link">View Profile</Button>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Customers" 
        description="A list of all customers who have purchased from your store."
      />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <Input 
            placeholder="Search customers by name or email..." 
            prefix={<SearchOutlined className="text-slate-400" />}
            className="rounded-xl h-10 max-w-md"
          />
        </div>

        <Table 
          columns={columns} 
          dataSource={customers} 
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default Customers;
