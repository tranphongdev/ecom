import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Form, message } from 'antd'
import { User, Lock, ArrowLeft } from 'lucide-react'
import { useStore } from '../store'
import type { UserProfile } from '~/types'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const login = useStore((state) => state.login)

  const onFinish = (values: UserProfile) => {
    setLoading(true)
    setTimeout(() => {
      login({
        name: 'Tran Dinh Phong',
        email: values.email || 'phongtd.bhsoft@gmail.com',
        role: 'Khách hàng'
      })
      message.success('Đăng nhập thành công!')
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
          <span className='font-semibold'>Quay lại trang chủ</span>
        </Link>
        <div className='bg-white py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border-t-4 border-primary'>
          <div className='mb-8 text-center'>
            <h2 className='text-3xl font-black text-gray-900 tracking-tight uppercase'>Đăng Nhập</h2>
            <p className='mt-2 text-sm text-gray-600'>Đăng nhập tài khoản TranPhongPC để nhận nhiều ưu đãi</p>
          </div>

          <Form name='login' onFinish={onFinish} layout='vertical' size='large'>
            <Form.Item name='email' rules={[{ required: true, message: 'Vui lòng nhập Email!' }]}>
              <Input
                prefix={<User className='text-gray-400' size={18} />}
                placeholder='Email hoặc Số điện thoại'
                className='rounded-lg h-12 text-sm'
              />
            </Form.Item>

            <Form.Item name='password' rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu!' }]}>
              <Input.Password
                prefix={<Lock className='text-gray-400' size={18} />}
                placeholder='Mật khẩu'
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
                  Ghi nhớ
                </label>
              </div>
              <div className='text-sm'>
                <a href='#' className='font-semibold text-primary hover:text-red-700'>
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
                className='w-full h-12 bg-primary hover:bg-red-700 rounded-lg text-base font-bold shadow-md hover:shadow-lg transition-all'
              >
                Đăng Nhập
              </Button>
            </Form.Item>
          </Form>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-gray-500'>Hoặc tiếp tục với</span>
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
            <span className='text-gray-600'>Bạn chưa có tài khoản? </span>
            <Link to='/register' className='text-primary hover:text-red-700 font-bold'>
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
