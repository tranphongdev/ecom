import React, { useState } from 'react';
import { 
  Tabs, 
  Form, 
  Input, 
  Button, 
  Switch, 
  Upload, 
  Avatar, 
  Badge, 
  Timeline, 
  Typography,
  Space,
  Divider,
  Row,
  Col,
  Skeleton
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  BellOutlined, 
  CameraOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { useProfile } from '@/hooks/useProfile';
import { motion } from 'motion/react';
import { LoginActivity } from '@/types';

const { Title, Text } = Typography;

const MOCK_ACTIVITY: LoginActivity[] = [
  { id: '1', device: 'Chrome on MacOS', ip: '192.168.1.1', location: 'New York, USA', time: '2024-03-22 10:30' },
  { id: '2', device: 'Safari on iPhone', ip: '192.168.1.5', location: 'New York, USA', time: '2024-03-21 18:45' },
  { id: '3', device: 'Chrome on Windows', ip: '182.12.34.56', location: 'London, UK', time: '2024-03-15 09:00' },
];

export const ProfilePage: React.FC = () => {
  const { profile, loading, updateProfile, updatePreferences, changePassword } = useProfile();
  const [activeTab, setActiveTab] = useState('1');

  const onFinishOverview = (values: any) => {
    updateProfile(values);
  };

  const onFinishPassword = (values: any) => {
    changePassword(values);
  };

  const renderOverview = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card className="text-center">
            <div className="relative inline-block mb-4 group">
              <Avatar 
                size={120} 
                src={profile.avatar} 
                icon={<UserOutlined />}
                className="border-4 border-white shadow-xl"
              />
              <Upload
                showUploadList={false}
                className="absolute bottom-0 right-0"
              >
                <Button 
                  shape="circle" 
                  icon={<CameraOutlined />} 
                  className="bg-indigo-600 text-white border-white border-2 hover:bg-indigo-700 hover:text-white"
                />
              </Upload>
            </div>
            <Title level={4} style={{ margin: 0 }}>{profile.name}</Title>
            <Text type="secondary">{profile.role}</Text>
            <div className="mt-4">
              <Badge status={profile.status === 'online' ? 'success' : 'default'} text={profile.status.toUpperCase()} />
            </div>
            <Divider />
            <div className="space-y-4 text-left px-4">
              <div className="flex items-center gap-3 text-slate-600">
                <MailOutlined className="text-indigo-500" />
                <Text>{profile.email}</Text>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <PhoneOutlined className="text-indigo-500" />
                <Text>{profile.phone}</Text>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <HomeOutlined className="text-indigo-500" />
                <Text className="text-sm">{profile.address}</Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card title="Edit Personal Information">
            <Form
              layout="vertical"
              initialValues={profile}
              onFinish={onFinishOverview}
              className="mt-4"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input placeholder="Alex Taylor" prefix={<UserOutlined className="text-slate-400" />} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input placeholder="alex@example.com" prefix={<MailOutlined className="text-slate-400" />} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Phone Number" name="phone">
                    <Input placeholder="+1 (555) 000-0000" prefix={<PhoneOutlined className="text-slate-400" />} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Role" name="role">
                    <Input disabled placeholder="Role" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Address" name="address">
                <Input.TextArea placeholder="Your address" rows={3} />
              </Form.Item>
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  className="bg-indigo-600 h-11 px-8 rounded-xl"
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </motion.div>
  );

  const renderSecurity = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card title="Security Settings">
        <div className="max-w-md">
          <Title level={5} className="mb-6">Change Password</Title>
          <Form layout="vertical" onFinish={onFinishPassword}>
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[{ required: true, message: 'Current password is required' }]}
            >
              <Input.Password prefix={<LockOutlined className="text-slate-400" />} />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: 'New password is required' },
                { min: 8, message: 'Password must be at least 8 characters' }
              ]}
            >
              <Input.Password prefix={<LockOutlined className="text-slate-400" />} />
            </Form.Item>
            <Form.Item
              label="Confirm New Password"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your new password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined className="text-slate-400" />} />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="bg-indigo-600 h-11 px-8 rounded-xl"
              >
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Divider />
        <div className="flex items-center justify-between">
          <div>
            <Title level={5} style={{ margin: 0 }}>Two-Factor Authentication</Title>
            <Text type="secondary">Add an extra layer of security to your account.</Text>
          </div>
          <Button icon={<SafetyCertificateOutlined />}>Enable 2FA</Button>
        </div>
      </Card>

      <Card title="Recent Activity">
        <Timeline
          className="mt-6 ml-4"
          items={MOCK_ACTIVITY.map(act => ({
            children: (
              <div className="pb-4">
                <Text strong>{act.device}</Text>
                <div className="text-xs text-slate-400">{act.time} • {act.ip} • {act.location}</div>
              </div>
            ),
            color: 'blue'
          }))}
        />
      </Card>
    </motion.div>
  );

  const renderPreferences = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card title="System Preferences">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <Text strong className="block">Email Notifications</Text>
              <Text type="secondary" className="text-sm">Receive email updates about your orders and store status.</Text>
            </div>
            <Switch 
              checked={profile.preferences.emailNotifications} 
              onChange={(val) => updatePreferences({ emailNotifications: val })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Text strong className="block">System Notifications</Text>
              <Text type="secondary" className="text-sm">In-app notifications for new orders and customers.</Text>
            </div>
            <Switch 
              checked={profile.preferences.systemNotifications} 
              onChange={(val) => updatePreferences({ systemNotifications: val })}
            />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <Text strong className="block">Dark Mode</Text>
              <Text type="secondary" className="text-sm">Change the interface to a darker theme for night usage.</Text>
            </div>
            <Switch 
              checked={profile.preferences.darkMode} 
              onChange={(val) => updatePreferences({ darkMode: val })}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader 
        title="Profile Settings" 
        description="Manage your account information, security, and preferences."
      />

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="profile-tabs"
        items={[
          {
            key: '1',
            label: (
              <span className="flex items-center gap-2">
                <UserOutlined />
                Overview
              </span>
            ),
            children: renderOverview(),
          },
          {
            key: '2',
            label: (
              <span className="flex items-center gap-2">
                <LockOutlined />
                Security
              </span>
            ),
            children: renderSecurity(),
          },
          {
            key: '3',
            label: (
              <span className="flex items-center gap-2">
                <BellOutlined />
                Preferences
              </span>
            ),
            children: renderPreferences(),
          },
        ]}
      />
    </div>
  );
};

export default ProfilePage;
