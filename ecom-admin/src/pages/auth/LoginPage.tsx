import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Button, Input, Form, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Store } from 'lucide-react';
import { authAtom } from '@/atoms';

export const LoginPage: React.FC = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const [loading, setLoading] = useState(false);

  // Already authenticated → redirect to dashboard
  if (auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));

    if (values.email && values.password) {
      setAuth({
        isAuthenticated: true,
        user: {
          id: '1',
          name: 'Alex Taylor',
          email: values.email,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
          role: 'Store Manager',
        },
      });
      message.success('Welcome back!');
    } else {
      message.error('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-indigo-200">
            <Store className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">LuxeAdmin</h1>
          <p className="text-slate-500 mt-1">Sign in to your dashboard</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
          <Form
            layout="vertical"
            onFinish={handleLogin}
            requiredMark={false}
            initialValues={{ email: 'alex.taylor@luxe.com', password: 'password' }}
          >
            <Form.Item
              label={<span className="font-medium text-slate-700">Email</span>}
              name="email"
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <Input
                prefix={<MailOutlined className="text-slate-400" />}
                placeholder="you@company.com"
                size="large"
                className="rounded-xl"
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-medium text-slate-700">Password</span>}
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-slate-400" />}
                placeholder="••••••••"
                size="large"
                className="rounded-xl"
              />
            </Form.Item>

            <Form.Item className="mb-0 mt-6">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-12 font-semibold text-base border-none shadow-lg shadow-indigo-200"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Demo credentials are pre-filled. Just click Sign In.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
