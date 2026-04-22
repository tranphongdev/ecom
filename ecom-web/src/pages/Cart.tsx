import { Link } from 'react-router-dom'
import { Empty, message, Button } from 'antd'
import { Trash2, ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useCartStore } from '~/store'
import { usePageMeta } from '~/hooks/usePageMeta'

export default function Cart() {
  const { t } = useTranslation()
  const { items: cart, updateItemQuantity: updateQuantity, removeItem: removeFromCart, clearItems: clearCart } = useCartStore()

  usePageMeta({
    title: t('seo.cartTitle'),
    description: t('cart.title')
  })

  if (cart.length === 0) {
    return (
      <div className='max-w-[700px] mx-auto py-12 flex flex-col items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 min-h-[50vh] mt-6'>
        <Empty description={t('cart.empty')} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        <Link to='/' className='mt-6'>
          <Button type='primary' size='large'>
            {t('cart.continueShopping')}
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='max-w-[800px] mx-auto bg-white rounded-md shadow-sm border border-gray-200 mt-6 mb-12'>
      {/* Header */}
      <div className='flex justify-between items-center px-4 md:px-6 py-4 border-b border-gray-200 bg-gray-50/50 rounded-t-md'>
        <h1 className='text-[17px] font-bold text-gray-800 m-0'>{t('cart.title')}</h1>
        <Link to='/' className='text-[14px] text-gray-700 hover:text-[#0b5edd] flex items-center font-medium'>
          <ChevronLeft size={16} className='mr-1' /> {t('cart.buyMore')}
        </Link>
      </div>

      <div className='p-4 md:p-6 pb-2'>
        {/* Cart Action Top */}
        <div className='flex justify-end mb-4'>
          <button
            onClick={() => {
              clearCart()
              message.success(t('cart.cleared'))
            }}
            className='px-4 py-1.5 border border-gray-300 text-gray-700 text-[13px] rounded hover:bg-gray-50 transition-colors'
          >
            {t('cart.clearCart')}
          </button>
        </div>

        {/* Cart Items List */}
        <div className='space-y-4 mb-6'>
          {cart.map((item) => (
            <div
              key={item.id}
              className='flex gap-4 items-start relative pb-6 border-b border-gray-100 last:border-0 last:pb-0'
            >
              {/* Product Image */}
              <div className='w-[100px] h-[100px] shrink-0 relative'>
                <div className='absolute top-0 -left-1 bg-[#ed1b24] text-white text-[8px] font-black uppercase px-1 py-0.5 transform -rotate-45 -translate-x-2 translate-y-1 shadow-sm'>
                  DEAL
                </div>
                <img src={item.image} alt={item.name} className='w-full h-full object-contain mix-blend-multiply' />
              </div>

              {/* Product Info */}
              <div className='flex-1 min-w-0 pr-4'>
                <Link
                  to={`/product/${item.id}`}
                  className='text-[14px] text-gray-800 font-medium hover:text-[#0b5edd] leading-snug line-clamp-2'
                >
                  {item.name}
                </Link>
                <div className='mt-1'>
                  <span className='text-[#ed1b24] text-[13px] font-medium mr-1'>{t('cart.promotion')}</span>
                  <span className='text-[#0b5edd] text-[13px] hover:underline cursor-pointer'>{t('cart.details')}</span>
                </div>
              </div>

              {/* Controls & Price */}
              <div className='w-[130px] shrink-0 text-right space-y-2'>
                <div className='flex justify-end mb-2'>
                  {/* Custom Input Number UI mimicking screenshot */}
                  <div className='flex items-center border border-gray-200 rounded text-[14px]'>
                    <button
                      className='w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 border-r border-gray-200'
                      onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <div className='w-9 h-7 flex items-center justify-center font-bold'>{item.quantity}</div>
                    <button
                      className='w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 border-l border-gray-200'
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <div className='text-[#ed1b24] font-bold text-[15px]'>{item.price.toLocaleString('vi-VN')} đ</div>
                  {/* Mock original price for illustration (similar to screenshot) */}
                  <div className='text-gray-400 text-[13px] line-through'>
                    {(item.price * 1.15).toLocaleString('vi-VN')} đ
                  </div>
                </div>
              </div>

              {/* Trash Icon Button Bottom Right */}
              <div
                className='absolute right-0 bottom-6 text-gray-400 hover:text-red-500 cursor-pointer p-1 rounded-full hover:bg-gray-100'
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
