import { ShoppingCart } from 'lucide-react'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { Product } from '~/types'
import { useCartStore } from '~/store'

interface ProductActionsProps {
  product: Product
  quantity: number
  setQuantity: (q: number) => void
  activeImage: string
}

export default function ProductActions({ product, quantity, setQuantity, activeImage }: ProductActionsProps) {
  const addToCart = useCartStore((state) => state.addItem)
  const navigate = useNavigate()

  const handleAddToCart = (redirect: boolean) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: activeImage
    })

    if (redirect) {
      navigate('/checkout')
    } else {
      message.success('Đã thêm sản phẩm vào giỏ hàng')
    }
  }

  return (
    <div className='mb-4'>
      <div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-4'>
        <div className='flex items-center gap-3'>
          <span className='text-[14px] text-gray-700'>Số lượng:</span>
          <div className='flex items-center border border-gray-300 rounded overflow-hidden'>
            <button
              className='w-10 h-10 flex items-center justify-center border-r border-gray-300 hover:bg-gray-100 bg-gray-50 text-gray-600 transition'
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              –
            </button>
            <input
              type='text'
              value={quantity}
              readOnly
              className='w-12 h-10 text-center outline-none font-bold text-[14px]'
            />
            <button
              className='w-10 h-10 flex items-center justify-center border-l border-gray-300 hover:bg-gray-100 bg-gray-50 text-gray-600 transition'
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <button
          className='flex flex-1 items-center justify-center gap-2 border border-[#0b5edd] text-[#0b5edd] bg-blue-50/30 rounded h-10 px-6 font-bold hover:bg-[#0b5edd] hover:text-white transition-colors'
          onClick={() => handleAddToCart(false)}
        >
          <ShoppingCart size={18} /> Thêm vào giỏ hàng
        </button>
      </div>

      <button
        className='w-full bg-[#ed1b24] text-white rounded text-center py-3 mb-3 shadow hover:bg-[#cd0016] hover:shadow-md transition-all flex flex-col items-center justify-center'
        onClick={() => handleAddToCart(true)}
      >
        <span className='font-black text-[20px] uppercase tracking-wide'>Đặt Mua Ngay</span>
        <span className='text-[13px] font-medium opacity-90'>Giao hàng tận nơi nhanh chóng</span>
      </button>

      <div className='grid grid-cols-2 gap-3 mb-6'>
        <button className='bg-[#0b5edd] text-white rounded p-2.5 flex flex-col items-center justify-center shadow hover:bg-[#094ca0] transition-colors'>
          <span className='uppercase font-bold text-[14px]'>Trả Góp Qua Hồ Sơ</span>
          <span className='text-[11px] opacity-90 mt-0.5'>Lãi suất ưu đãi</span>
        </button>
        <button className='bg-[#0b5edd] text-white rounded p-2.5 flex flex-col items-center justify-center shadow hover:bg-[#094ca0] transition-colors'>
          <span className='uppercase font-bold text-[14px]'>Trả Góp Qua Thẻ</span>
          <span className='text-[11px] opacity-90 mt-0.5'>Không phí ẩn</span>
        </button>
      </div>
    </div>
  )
}
