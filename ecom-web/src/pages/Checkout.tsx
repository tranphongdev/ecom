import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { Breadcrumb, Form, Input, AutoComplete, Button, Radio, Result, Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDebounce } from '~/hooks/useDebounce'
import { useCartStore } from '~/store'
import { useProvinces, useDistricts } from '~/hooks/useLocation'
import { usePageMeta } from '~/hooks/usePageMeta'

export default function Checkout() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [form] = Form.useForm()

  usePageMeta({
    title: t('seo.checkoutTitle'),
    description: t('checkout.title')
  })

  const selectedCityNameRaw = Form.useWatch('city', form) || ''
  const selectedDistrictNameRaw = Form.useWatch('district', form) || ''

  const selectedCityName = useDebounce(selectedCityNameRaw, 300)
  const selectedDistrictName = useDebounce(selectedDistrictNameRaw, 300)

  const { data: provinces, isLoading: loadingProvinces } = useProvinces()

  const selectedCityObj = provinces?.find((p) => p.name === selectedCityName)
  const selectedCityCode = selectedCityObj?.code

  const { data: districts, isLoading: loadingDistricts } = useDistricts(selectedCityCode)

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
    return <Navigate to='/cart' replace />
  }

  if (orderPlaced) {
    return (
      <div className='py-12 bg-white rounded shadow-sm border border-gray-100 my-8'>
        <Result
          status='success'
          title={<span className='text-2xl font-black text-gray-800 uppercase'>{t('checkout.orderSuccess')}</span>}
          subTitle={
            <div className='text-sm'>
              <p>
                {t('checkout.orderIdLabel')}: <b>#TPPC-{orderId}</b>
              </p>
              <p>{t('checkout.orderConfirmMsg')}</p>
              <p>{t('checkout.orderThankMsg')}</p>
            </div>
          }
          extra={[
            <Button
              key='console'
              type='primary'
              onClick={() => navigate('/')}
              className='bg-primary hover:bg-[#cc0016] font-bold h-10 px-8'
            >
              {t('checkout.continueShopping')}
            </Button>,
            <Button key='buy' onClick={() => navigate('/dashboard')} className='font-bold h-10 px-6'>
              {t('checkout.manageOrders')}
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
            { title: <Link to='/'>{t('product.home')}</Link> },
            { title: <Link to='/cart'>{t('checkout.breadcrumbCart')}</Link> },
            { title: <span className='font-semibold text-gray-800'>{t('checkout.title')}</span> }
          ]}
        />
      </div>

      <div className='flex flex-col lg:flex-row gap-6 items-start'>
        {/* Left Column: Form Info */}
        <div className='flex-1 space-y-6'>
          <div className='bg-white rounded shadow-sm border border-gray-100 overflow-hidden'>
            <div className='p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-800 uppercase text-sm'>
              {t('checkout.buyerInfo')}
            </div>
            <div className='p-6'>
              <Form layout='vertical' form={form} onFinish={onFinish} id='checkout-form'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Form.Item
                    name='fullName'
                    label={<span className='font-semibold'>{t('checkout.fullName')}</span>}
                    rules={[{ required: true, message: t('checkout.fullNameReq') }]}
                  >
                    <Input placeholder={t('checkout.fullNamePh')} size='large' className='rounded' />
                  </Form.Item>
                  <Form.Item
                    name='phone'
                    label={<span className='font-semibold'>{t('checkout.phone')}</span>}
                    rules={[{ required: true, message: t('checkout.phoneReq') }]}
                  >
                    <Input placeholder={t('checkout.phonePh')} size='large' className='rounded' />
                  </Form.Item>
                </div>
                <Form.Item name='email' label={<span className='font-semibold'>{t('checkout.email')}</span>}>
                  <Input placeholder={t('checkout.emailPh')} size='large' className='rounded' />
                </Form.Item>

                <h3 className='font-bold text-gray-800 mb-4 mt-6'>{t('checkout.shippingAddr')}</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Form.Item
                    name='city'
                    label={t('checkout.city')}
                    rules={[{ required: true, message: t('checkout.cityReq') }]}
                  >
                    <AutoComplete
                      placeholder={t('checkout.cityPh')}
                      size='large'
                      onChange={() => form.setFieldsValue({ district: undefined })}
                      options={provinces
                        ?.filter((p) => p.name.toLowerCase().includes(selectedCityName.toLowerCase()))
                        .map((p) => ({ value: p.name }))}
                      notFoundContent={loadingProvinces ? t('checkout.loading') : t('checkout.notFound')}
                    />
                  </Form.Item>
                  <Form.Item
                    name='district'
                    label={t('checkout.district')}
                    rules={[{ required: true, message: t('checkout.districtReq') }]}
                  >
                    <AutoComplete
                      placeholder={t('checkout.districtPh')}
                      size='large'
                      disabled={!selectedCityCode}
                      options={districts
                        ?.filter((d) => d.name.toLowerCase().includes(selectedDistrictName.toLowerCase()))
                        .map((d) => ({ value: d.name }))}
                      notFoundContent={loadingDistricts ? t('checkout.loading') : t('checkout.notFound')}
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name='address'
                  label={<span className='font-semibold'>{t('checkout.address')}</span>}
                  rules={[{ required: true, message: t('checkout.addressReq') }]}
                >
                  <Input placeholder={t('checkout.addressPh')} size='large' className='rounded' />
                </Form.Item>
                <Form.Item name='note' label={<span className='font-semibold'>{t('checkout.note')}</span>}>
                  <Input.TextArea rows={3} placeholder={t('checkout.notePh')} className='rounded' />
                </Form.Item>

                <div className='mt-2 mb-4'>
                  <Checkbox checked={showInvoice} onChange={(e) => setShowInvoice(e.target.checked)}>
                    <span className='font-semibold text-gray-800 tracking-tight'>{t('checkout.requestInvoice')}</span>
                  </Checkbox>
                </div>

                {showInvoice && (
                  <div className='space-y-3 animate-fade-in pb-2'>
                    <Form.Item
                      name='companyName'
                      rules={[{ required: true, message: t('checkout.companyNameReq') }]}
                      className='mb-0'
                    >
                      <Input placeholder={t('checkout.companyName')} size='large' className='rounded' />
                    </Form.Item>
                    <Form.Item
                      name='companyAddress'
                      rules={[{ required: true, message: t('checkout.companyAddrReq') }]}
                      className='mb-0'
                    >
                      <Input placeholder={t('checkout.companyAddr')} size='large' className='rounded' />
                    </Form.Item>
                    <Form.Item
                      name='taxCode'
                      rules={[{ required: true, message: t('checkout.taxCodeReq') }]}
                      className='mb-0'
                    >
                      <Input placeholder={t('checkout.taxCode')} size='large' className='rounded' />
                    </Form.Item>
                  </div>
                )}
              </Form>
            </div>
          </div>

          <div className='bg-white rounded shadow-sm border border-gray-100 overflow-hidden'>
            <div className='p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-800 uppercase text-sm'>
              {t('checkout.paymentMethod')}
            </div>
            <div className='p-6'>
              <Radio.Group
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className='w-full flex flex-col gap-4'
              >
                <Radio value='cod'>
                  <div>
                    <span className='font-bold text-gray-800 block'>{t('checkout.cod')}</span>
                    <span className='text-xs text-gray-500'>
                      {t('checkout.codDesc')}
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
              {t('checkout.orderSummary')}
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
                <span>{t('checkout.subtotal')}</span>
                <span className='font-bold text-gray-800'>{cartTotal.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className='flex justify-between text-gray-600'>
                <span>{t('checkout.shipping')}</span>
                <span className='font-bold text-gray-800'>0 đ</span>
              </div>
              <div className='flex justify-between text-gray-600'>
                <span>{t('checkout.discount')}</span>
                <span className='font-bold text-gray-800'>0 đ</span>
              </div>

              <div className='border-t border-gray-100 pt-4 mt-2'>
                <div className='flex justify-between items-center mb-1'>
                  <span className='font-bold text-gray-800 uppercase'>{t('checkout.total')}</span>
                  <span className='font-black text-2xl text-primary'>{cartTotal.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className='text-right text-xs text-gray-500'>{t('checkout.vatIncluded')}</div>
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
                {t('checkout.placeOrder')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
