import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Form } from 'antd'
import { User, Lock, Mail, Phone, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePageMeta } from '~/hooks/usePageMeta'

export default function Register() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  usePageMeta({
    title: t('seo.registerTitle'),
    description: t('auth.registerSubtitle')
  })

  const onFinish = (values: Record<string, string>) => {
    console.log('Success:', values)
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans bg-[url('https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className='absolute inset-0 bg-black/60 backdrop-blur-sm'></div>

      <div className='sm:mx-auto sm:w-full sm:max-w-md relative z-10'>
        <Link
          to='/'
          className='flex items-center gap-2 justify-center mb-6 text-white hover:text-red-400 transition-colors'
        >
          <ArrowLeft size={20} />
          <span className='font-semibold'>{t('auth.backToHome')}</span>
        </Link>
        <div className='bg-white py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border-t-4 border-primary'>
          <div className='mb-6 text-center'>
            <h2 className='text-3xl font-black text-gray-900 tracking-tight uppercase'>{t('auth.registerTitle')}</h2>
            <p className='mt-2 text-sm text-gray-600'>{t('auth.registerSubtitle')}</p>
          </div>

          <Form name='register' onFinish={onFinish} layout='vertical' size='large'>
            <Form.Item name='fullName' rules={[{ required: true, message: t('auth.fullNameReq') }]}>
              <Input
                prefix={<User className='text-gray-400' size={18} />}
                placeholder={t('auth.fullNamePh')}
                className='rounded-lg h-12 text-sm'
              />
            </Form.Item>

            <Form.Item name='email' rules={[{ required: true, type: 'email', message: t('auth.emailRegReq') }]}>
              <Input
                prefix={<Mail className='text-gray-400' size={18} />}
                placeholder='Email'
                className='rounded-lg h-12 text-sm'
              />
            </Form.Item>

            <Form.Item name='phone' rules={[{ required: true, message: t('auth.phoneReq') }]}>
              <Input
                prefix={<Phone className='text-gray-400' size={18} />}
                placeholder={t('auth.phonePh')}
                className='rounded-lg h-12 text-sm'
              />
            </Form.Item>

            <Form.Item name='password' rules={[{ required: true, message: t('auth.passwordReq') }]}>
              <Input.Password
                prefix={<Lock className='text-gray-400' size={18} />}
                placeholder={t('auth.passwordPlaceholder')}
                className='rounded-lg h-12 text-sm'
              />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='w-full h-12 bg-primary hover:bg-red-700 rounded-lg text-base font-bold shadow-md hover:shadow-lg transition-all mt-2'
              >
                {t('auth.registerBtn')}
              </Button>
            </Form.Item>
          </Form>

          <div className='mt-6 text-center text-sm font-medium'>
            <span className='text-gray-600'>{t('auth.hasAccount')} </span>
            <Link to='/login' className='text-primary hover:text-red-700 font-bold'>
              {t('auth.loginNow')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
