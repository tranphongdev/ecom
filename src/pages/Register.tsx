import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Form } from 'antd'
import { User, Lock, Mail, Phone, ArrowLeft } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()

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
          <span className='font-semibold'>Quay lại trang chủ</span>
        </Link>
        <div className='bg-white py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border-t-4 border-primary'>
          <div className='mb-6 text-center'>
            <h2 className='text-3xl font-black text-gray-900 tracking-tight uppercase'>Đăng Ký</h2>
            <p className='mt-2 text-sm text-gray-600'>Tạo tài khoản mới để mua sắm dễ dàng hơn</p>
          </div>

          <Form name='register' onFinish={onFinish} layout='vertical' size='large'>
            <Form.Item name='fullName' rules={[{ required: true, message: 'Vui lòng nhập Họ tên!' }]}>
              <Input
                prefix={<User className='text-gray-400' size={18} />}
                placeholder='Họ và tên'
                className='rounded-lg h-12 text-sm'
              />
            </Form.Item>

            <Form.Item name='email' rules={[{ required: true, type: 'email', message: 'Vui lòng nhập Email hợp lệ!' }]}>
              <Input
                prefix={<Mail className='text-gray-400' size={18} />}
                placeholder='Email'
                className='rounded-lg h-12 text-sm'
              />
            </Form.Item>

            <Form.Item name='phone' rules={[{ required: true, message: 'Vui lòng nhập Số điện thoại!' }]}>
              <Input
                prefix={<Phone className='text-gray-400' size={18} />}
                placeholder='Số điện thoại'
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

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='w-full h-12 bg-primary hover:bg-red-700 rounded-lg text-base font-bold shadow-md hover:shadow-lg transition-all mt-2'
              >
                Đăng Ký Tài Khoản
              </Button>
            </Form.Item>
          </Form>

          <div className='mt-6 text-center text-sm font-medium'>
            <span className='text-gray-600'>Bạn đã có tài khoản? </span>
            <Link to='/login' className='text-primary hover:text-red-700 font-bold'>
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
