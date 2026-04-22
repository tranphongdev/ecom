import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Form, message } from 'antd'
import { User, Lock, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '~/store'
import { usePageMeta } from '~/hooks/usePageMeta'
import type { UserProfile } from '~/types'

export default function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((state) => state.login)

  usePageMeta({
    title: t('seo.loginTitle'),
    description: t('auth.loginSubtitle')
  })

  const onFinish = (values: UserProfile) => {
    setLoading(true)
    setTimeout(() => {
      login({
        id: crypto.randomUUID(),
        name: 'Tran Dinh Phong',
        email: values.email || 'phongtd.bhsoft@gmail.com',
        role: 'Khách hàng'
      })
      message.success(t('auth.loginSuccess'))
      navigate('/dashboard')
    }, 1000)
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
          <div className='mb-8 text-center'>
            <h2 className='text-3xl font-black text-gray-900 tracking-tight uppercase'>{t('auth.loginTitle')}</h2>
            <p className='mt-2 text-sm text-gray-600'>{t('auth.loginSubtitle')}</p>
          </div>

          <Form name='login' onFinish={onFinish} layout='vertical' size='large'>
            <Form.Item name='email' rules={[{ required: true, message: t('auth.emailReq') }]}>
              <Input
                prefix={<User className='text-gray-400' size={18} />}
                placeholder={t('auth.emailPlaceholder')}
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

            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                />
                <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900 font-medium'>
                  {t('auth.remember')}
                </label>
              </div>
              <div className='text-sm'>
                <a href='#' className='font-semibold text-primary hover:text-red-700'>
                  {t('auth.forgotPassword')}
                </a>
              </div>
            </div>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
                className='w-full h-12 text-sm'
              >
                {t('auth.loginBtn')}
              </Button>
            </Form.Item>
          </Form>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-gray-500'>{t('auth.orContinueWith')}</span>
              </div>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-3'>
              <Button className='w-full h-10 flex items-center justify-center font-semibold text-gray-700'>
                Google
              </Button>
              <Button className='w-full h-10 flex items-center justify-center font-semibold text-gray-700'>
                Facebook
              </Button>
            </div>
          </div>

          <div className='mt-8 text-center text-sm font-medium'>
            <span className='text-gray-600'>{t('auth.noAccount')} </span>
            <Link to='/register' className='text-primary hover:text-red-700 font-bold'>
              {t('auth.registerNow')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
