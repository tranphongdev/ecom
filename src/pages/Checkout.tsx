import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Breadcrumb, Form, Input, AutoComplete, Button, Radio, Result, Checkbox } from 'antd'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useDebounce } from '~/hooks/useDebounce'
import { useCartStore } from '~/store'

interface LocationData {
  name: string
  code: number
}

export default function Checkout() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const selectedCityNameRaw = Form.useWatch('city', form) || ''
  const selectedDistrictNameRaw = Form.useWatch('district', form) || ''

  const selectedCityName = useDebounce(selectedCityNameRaw, 300)
  const selectedDistrictName = useDebounce(selectedDistrictNameRaw, 300)

  const { data: provinces, isLoading: loadingProvinces } = useQuery<LocationData[]>({
    queryKey: ['provinces'],
    queryFn: async () => {
      const { data } = await axios.get('https://provinces.open-api.vn/api/p/')
      return data.sort((a: LocationData, b: LocationData) => a.name.localeCompare(b.name))
    }
  })

  const selectedCityObj = provinces?.find((p) => p.name === selectedCityName)
  const selectedCityCode = selectedCityObj?.code

  const { data: districts, isLoading: loadingDistricts } = useQuery<LocationData[]>({
    queryKey: ['districts', selectedCityCode],
    queryFn: async () => {
      const { data } = await axios.get(`https://provinces.open-api.vn/api/p/${selectedCityCode}?depth=2`)
      return data.districts.sort((a: LocationData, b: LocationData) => a.name.localeCompare(b.name))
    },
    enabled: !!selectedCityCode
  })

  const { items: cart, clearItems: clearCart } = useCartStore()
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [showInvoice, setShowInvoice] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orderId] = useState(() => Math.floor(Math.random() * 1000000))

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const onFinish = (values: Record<string, unknown>) => {
    console.log('Order Data:', { ...values, paymentMethod, cart, total: cartTotal })
    setLoading(true)
    // Fake API delay
    setTimeout(() => {
      setLoading(false)
      setOrderPlaced(true)
      clearCart() // Emtpies the cart
    }, 1500)
  }

  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart')
    return null
  }

  if (orderPlaced) {
    return (
      <div className='py-12 bg-white rounded shadow-sm border border-gray-100 my-8'>
        <Result
          status='success'
          title={<span className='text-2xl font-black text-gray-800 uppercase'>ĐẶT HÀNG THÀNH CÔNG!</span>}
          subTitle={
            <div className='text-sm'>
              <p>
                Mã đơn hàng của bạn là: <b>#TPPC-{orderId}</b>
              </p>
              <p>Nhân viên Trần Phong PC sẽ gọi điện xác nhận đơn hàng trong thời gian sớm nhất.</p>
              <p>Cảm ơn quý khách đã tin tưởng và mua sắm tại hệ thống của chúng tôi!</p>
            </div>
          }
          extra={[
            <Button
              key='console'
              type='primary'
              onClick={() => navigate('/')}
              className='bg-primary hover:bg-[#cc0016] font-bold h-10 px-8'
            >
              Tiếp tục mua sắm
            </Button>,
            <Button key='buy' onClick={() => navigate('/dashboard')} className='font-bold h-10 px-6'>
              Quản lý đơn hàng
            </Button>
          ]}
        />
      </div>
    )
  }

  return (
    <div className='space-y-4 py-4'>
      <div className='text-sm text-gray-500 mb-2'>
        <Breadcrumb
          items={[
            { title: <Link to='/'>Trang chủ</Link> },
            { title: <Link to='/cart'>Giỏ hàng</Link> },
            { title: <span className='font-semibold text-gray-800'>Thanh toán</span> }
          ]}
        />
      </div>

      <div className='flex flex-col lg:flex-row gap-6 items-start'>
        {/* Left Column: Form Info */}
        <div className='flex-1 space-y-6'>
          <div className='bg-white rounded shadow-sm border border-gray-100 overflow-hidden'>
            <div className='p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-800 uppercase text-sm'>
              1. Thông tin người mua
            </div>
            <div className='p-6'>
              <Form layout='vertical' form={form} onFinish={onFinish} id='checkout-form'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Form.Item
                    name='fullName'
                    label={<span className='font-semibold'>Họ và tên</span>}
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                  >
                    <Input placeholder='Nguyễn Văn A' size='large' className='rounded' />
                  </Form.Item>
                  <Form.Item
                    name='phone'
                    label={<span className='font-semibold'>Số điện thoại</span>}
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                  >
                    <Input placeholder='09xxxx...' size='large' className='rounded' />
                  </Form.Item>
                </div>
                <Form.Item name='email' label={<span className='font-semibold'>Email (Không bắt buộc)</span>}>
                  <Input placeholder='email@domain.com' size='large' className='rounded' />
                </Form.Item>

                <h3 className='font-bold text-gray-800 mb-4 mt-6'>Địa chỉ nhận hàng</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Form.Item
                    name='city'
                    label='Tỉnh / Thành phố'
                    rules={[{ required: true, message: 'Chọn Tỉnh/Thành' }]}
                  >
                    <AutoComplete
                      placeholder='Chọn tỉnh/thành'
                      size='large'
                      onChange={() => form.setFieldsValue({ district: undefined })}
                      options={provinces
                        ?.filter((p) => p.name.toLowerCase().includes(selectedCityName.toLowerCase()))
                        .map((p) => ({ value: p.name }))}
                      notFoundContent={loadingProvinces ? 'Đang tải...' : 'Không tìm thấy'}
                    />
                  </Form.Item>
                  <Form.Item
                    name='district'
                    label='Quận / Huyện'
                    rules={[{ required: true, message: 'Chọn Quận/Huyện' }]}
                  >
                    <AutoComplete
                      placeholder='Chọn quận/huyện'
                      size='large'
                      disabled={!selectedCityCode}
                      options={districts
                        ?.filter((d) => d.name.toLowerCase().includes(selectedDistrictName.toLowerCase()))
                        .map((d) => ({ value: d.name }))}
                      notFoundContent={loadingDistricts ? 'Đang tải...' : 'Không tìm thấy'}
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name='address'
                  label={<span className='font-semibold'>Địa chỉ cụ thể (Số nhà, tên đường...)</span>}
                  rules={[{ required: true, message: 'Nhập địa chỉ nhà' }]}
                >
                  <Input placeholder='Ví dụ: Số 377 Trương Định' size='large' className='rounded' />
                </Form.Item>
                <Form.Item name='note' label={<span className='font-semibold'>Ghi chú (Không bắt buộc)</span>}>
                  <Input.TextArea rows={3} placeholder='Giao hàng sau giờ hành chính...' className='rounded' />
                </Form.Item>

                <div className='mt-2 mb-4'>
                  <Checkbox checked={showInvoice} onChange={(e) => setShowInvoice(e.target.checked)}>
                    <span className='font-semibold text-gray-800 tracking-tight'>Yêu cầu xuất hóa đơn công ty</span>
                  </Checkbox>
                </div>

                {showInvoice && (
                  <div className='space-y-3 animate-fade-in pb-2'>
                    <Form.Item
                      name='companyName'
                      rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
                      className='mb-0'
                    >
                      <Input placeholder='Tên công ty' size='large' className='rounded' />
                    </Form.Item>
                    <Form.Item
                      name='companyAddress'
                      rules={[{ required: true, message: 'Vui lòng nhập địa chỉ công ty' }]}
                      className='mb-0'
                    >
                      <Input placeholder='Địa chỉ công ty' size='large' className='rounded' />
                    </Form.Item>
                    <Form.Item
                      name='taxCode'
                      rules={[{ required: true, message: 'Vui lòng nhập mã số thuế' }]}
                      className='mb-0'
                    >
                      <Input placeholder='Mã số thuế' size='large' className='rounded' />
                    </Form.Item>
                  </div>
                )}
              </Form>
            </div>
          </div>

          <div className='bg-white rounded shadow-sm border border-gray-100 overflow-hidden'>
            <div className='p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-800 uppercase text-sm'>
              2. Phương thức thanh toán
            </div>
            <div className='p-6'>
              <Radio.Group
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className='w-full flex flex-col gap-4'
              >
                <Radio value='cod'>
                  <div>
                    <span className='font-bold text-gray-800 block'>Thanh toán khi nhận hàng (COD)</span>
                    <span className='text-xs text-gray-500'>
                      Khách hàng thanh toán tiền mặt trực tiếp cho nhân viên giao hàng
                    </span>
                  </div>
                </Radio>
              </Radio.Group>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (Sticky) */}
        <div className='w-full lg:w-[380px] shrink-0 sticky top-24'>
          <div className='bg-white rounded shadow-sm border border-gray-100 overflow-hidden'>
            <div className='p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-800 uppercase text-sm'>
              Đơn hàng của bạn
            </div>

            <div className='p-4 border-b border-gray-100 max-h-[300px] overflow-y-auto custom-scrollbar'>
              {cart.map((item) => (
                <div key={item.id} className='flex gap-3 mb-4 last:mb-0'>
                  <div className='w-16 h-16 shrink-0 border border-gray-100 rounded p-1'>
                    <img src={item.image} alt={item.name} className='w-full h-full object-contain' />
                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='font-semibold text-gray-800 line-clamp-2 mb-1'>{item.name}</div>
                    <div className='font-bold text-primary'>{item.price.toLocaleString('vi-VN')} đ</div>
                    <div className='text-gray-500'>x {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className='p-4 space-y-3 text-sm'>
              <div className='flex justify-between text-gray-600'>
                <span>Tạm tính</span>
                <span className='font-bold text-gray-800'>{cartTotal.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className='flex justify-between text-gray-600'>
                <span>Phí vận chuyển</span>
                <span className='font-bold text-gray-800'>0 đ</span>
              </div>
              <div className='flex justify-between text-gray-600'>
                <span>Giảm giá</span>
                <span className='font-bold text-gray-800'>0 đ</span>
              </div>

              <div className='border-t border-gray-100 pt-4 mt-2'>
                <div className='flex justify-between items-center mb-1'>
                  <span className='font-bold text-gray-800 uppercase'>Thành tiền</span>
                  <span className='font-black text-2xl text-primary'>{cartTotal.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className='text-right text-xs text-gray-500'>(Đã bao gồm VAT)</div>
              </div>
            </div>

            <div className='p-4 bg-gray-50 border-t border-gray-100'>
              <Button
                type='primary'
                htmlType='submit'
                form='checkout-form'
                size='large'
                loading={loading}
                className='w-full bg-primary hover:bg-[#cc0016] h-12 uppercase font-black text-[15px] shadow-md'
              >
                ĐẶT HÀNG
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
