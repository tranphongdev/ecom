import { Link, useNavigate } from 'react-router-dom'
import { Breadcrumb, Form, Input, Select, message, Table, Tag, Button, Tabs } from 'antd'
import { User, FileText, Lock, LogOut } from 'lucide-react'
import { useAuthStore } from '~/store'
import { useTranslation } from 'react-i18next'
import { usePageMeta } from '~/hooks/usePageMeta'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { t, i18n } = useTranslation()

  usePageMeta({
    title: t('seo.dashboardTitle'),
    description: t('profile.updateInfo')
  })

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    logout()
    message.info(t('dashboard.logoutMsg'))
    navigate('/')
  }

  // Fake Order Data
  const orderColumns = [
    {
      title: t('dashboard.orderCode'),
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <a className='font-bold text-[#0b5edd]'>#{text}</a>
    },
    { title: t('dashboard.orderDate'), dataIndex: 'date', key: 'date' },
    { title: t('dashboard.orderTotal'), dataIndex: 'total', key: 'total', render: (text: string) => <b>{text}</b> },
    {
      title: t('dashboard.orderStatus'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'Hoàn thành' ? 'green' : status === 'Đang xử lý' ? 'orange' : 'red'
        return (
          <Tag color={color} className='font-bold px-2 py-1'>
            {status.toUpperCase()}
          </Tag>
        )
      }
    }
  ]
  const orderData = [
    { key: '1', id: '12345', date: '21/10/2023', total: '15.500.000 đ', status: 'Hoàn thành' },
    { key: '2', id: '12346', date: '22/10/2023', total: '1.200.000 đ', status: 'Đang xử lý' }
  ]

  const sidebarHeader = (
    <div className='flex items-center gap-3 mb-8 pl-2 pr-10 pt-2'>
      <div className='w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-sm shrink-0'>
        <User size={24} fill='currentColor' />
      </div>
      <div>
        <div className='text-[13px] text-gray-500 mb-0.5'>{t('profile.title')}</div>
        <div className='font-bold text-[16px] text-gray-800 leading-tight text-left wrap-break-word w-full'>
          {user?.name || 'Nguyễn Văn A'}
        </div>
      </div>
    </div>
  )
  const sidebarFooter = (
    <div className='mt-12 pl-2 pr-10 pb-4'>
      <a
        href='#'
        onClick={handleLogout}
        className='flex items-center gap-3 text-gray-500 hover:text-[#ed1b24] font-medium text-[15px] transition-colors'
      >
        <LogOut size={18} /> {t('profile.logout')}
      </a>
    </div>
  )

  const items = [
    {
      key: 'profile',
      label: (
        <div className='flex items-center gap-3'>
          <User size={18} />
          {t('profile.title')}
        </div>
      ),
      children: (
        <div className='md:pl-10 md:pt-2 w-full'>
          <h2 className='text-[22px] font-bold text-gray-800 mb-8'>{t('profile.updateInfo')}</h2>
          <Form layout='vertical' className='max-w-[800px]'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6'>
              <Form.Item label={t('profile.fullName')}>
                <Input
                  size='large'
                  defaultValue={user?.name || 'Tran Dinh Phong'}
                  className='rounded border-gray-300'
                />
              </Form.Item>
              <Form.Item label={t('profile.email')}>
                <Input
                  size='large'
                  defaultValue={user?.email || 'phongtd.bhsoft@gmail.com'}
                  className='rounded border-gray-300'
                />
              </Form.Item>
              <Form.Item label={t('profile.address')}>
                <Input size='large' className='rounded border-gray-300' />
              </Form.Item>
              <Form.Item label={t('profile.city')}>
                <Select
                  size='large'
                  defaultValue=''
                  className='rounded'
                  options={[
                    { value: '', label: t('profile.selectCity') },
                    { value: 'hn', label: t('profile.hanoi') },
                    { value: 'hcm', label: t('profile.hcm') }
                  ]}
                />
              </Form.Item>
              <Form.Item label={t('profile.homePhone')}>
                <Input size='large' className='rounded border-gray-300' />
              </Form.Item>
              <Form.Item label={t('profile.mobilePhone')}>
                <Input size='large' className='rounded border-gray-300' />
              </Form.Item>
              <Form.Item label={t('profile.language')} className='md:col-span-2'>
                <Select
                  size='large'
                  value={i18n.language}
                  onChange={(val) => i18n.changeLanguage(val)}
                  className='rounded max-w-[calc(50%-12px)]'
                  options={[
                    { value: 'vi', label: 'Tiếng Việt' },
                    { value: 'en', label: 'English' }
                  ]}
                />
              </Form.Item>
            </div>
            <Form.Item className='mt-2'>
              <Button type='primary' size='large' className='font-medium px-8'>
                {t('profile.save')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      )
    },
    {
      key: 'orders',
      label: (
        <div className='flex items-center gap-3 '>
          <FileText size={18} />
          {t('profile.ordersTitle')}
        </div>
      ),
      children: (
        <div className='md:pl-10 md:pt-2 w-full'>
          <h2 className='text-[22px] font-bold text-gray-800 mb-8'>{t('dashboard.manageOrders')}</h2>
          <div className='overflow-x-auto max-w-[900px]'>
            <Table
              columns={orderColumns}
              dataSource={orderData}
              pagination={false}
              size='middle'
              className='border border-gray-100 rounded-lg overflow-hidden custom-table'
            />
          </div>
        </div>
      )
    },
    {
      key: 'password',
      label: (
        <div className='flex items-center gap-3'>
          <Lock size={18} />
          {t('profile.passwordTitle')}
        </div>
      ),
      children: (
        <div className='md:pl-10 md:pt-2 w-full'>
          <h2 className='text-[22px] font-bold text-gray-800 mb-8'>{t('dashboard.changePassword')}</h2>
          <Form layout='vertical' size='large' className='custom-account-form max-w-[500px]'>
            <Form.Item label={t('dashboard.oldPassword')}>
              <Input.Password placeholder={t('dashboard.oldPasswordPh')} />
            </Form.Item>
            <Form.Item label={t('dashboard.newPassword')}>
              <Input.Password placeholder={t('dashboard.newPasswordPh')} />
            </Form.Item>
            <Form.Item label={t('dashboard.confirmPassword')}>
              <Input.Password placeholder={t('dashboard.confirmPasswordPh')} />
            </Form.Item>
            <Form.Item className='mt-4'>
              <Button type='primary' className='font-medium px-8'>
                {t('dashboard.savePassword')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      )
    }
  ]

  return (
    <div className='max-w-[1200px] mx-auto py-4 px-4 xl:px-0'>
      <div className='text-[13px] text-gray-500 mb-6'>
        <Breadcrumb
          items={[
            { title: <Link to='/'>{t('product.home')}</Link> },
            { title: <span className='text-gray-800'>{t('profile.title')}</span> }
          ]}
        />
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6 min-h-[600px] overflow-hidden relative flex'>
        <Tabs
          tabPlacement='start'
          items={items}
          tabBarExtraContent={{ left: sidebarHeader, right: sidebarFooter }}
          className='dashboard-tabs flex-1'
        />

        {/* Absolute Footer to prevent jumping on tab transition */}
      </div>
    </div>
  )
}
