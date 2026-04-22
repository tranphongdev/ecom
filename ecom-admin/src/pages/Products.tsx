import React from 'react';
import { Table, Tag, Space, Button, Input, Select, Badge } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PageHeader } from '../components/ui/PageHeader';
import { useProducts } from '../hooks';
import { Product } from '../types';

export const Products: React.FC = () => {
  const { products, loading } = useProducts();

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Product) => (
        <div className="flex items-center gap-3">
          <img 
            src={record.image} 
            alt={text} 
            className="w-10 h-10 rounded-lg object-cover bg-slate-100"
          />
          <div>
            <div className="font-semibold text-slate-800">{text}</div>
            <div className="text-xs text-slate-500">{record.category}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <span className="font-medium text-slate-800">${price.toFixed(2)}</span>
      ),
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${stock > 10 ? 'bg-emerald-500' : stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
          <span className={stock === 0 ? 'text-red-500 font-semibold' : 'text-slate-600'}>
            {stock} units
          </span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = {
          active: 'success',
          draft: 'default',
          archived: 'error',
        };
        return <Badge status={colors[status] as any} text={status.charAt(0).toUpperCase() + status.slice(1)} />;
      },
    },
    {
      title: 'Actions',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined className="text-slate-400" />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Products" 
        description="Manage your inventory and product listings."
        actions={
          <Button 
            type="primary" 
            size="large" 
            icon={<PlusOutlined />}
            className="bg-indigo-600 hover:bg-indigo-700 h-11 px-6 rounded-xl flex items-center border-none shadow-lg shadow-indigo-100"
          >
            Add Product
          </Button>
        }
      />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Input 
              placeholder="Search products..." 
              prefix={<SearchOutlined className="text-slate-400" />}
              className="rounded-xl h-10"
            />
            <Button icon={<FilterOutlined />} className="rounded-xl h-10">Filters</Button>
          </div>
          
          <div className="flex items-center gap-3">
            <Select 
              defaultValue="all" 
              className="w-40 rounded-xl"
              options={[
                { value: 'all', label: 'All Categories' },
                { value: 'electronics', label: 'Electronics' },
                { value: 'apparel', label: 'Apparel' },
              ]}
            />
          </div>
        </div>

        <Table 
          columns={columns} 
          dataSource={products} 
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 5,
            className: "px-6 py-4",
          }}
          className="product-table custom-table"
        />
      </div>
    </div>
  );
};

export default Products;
