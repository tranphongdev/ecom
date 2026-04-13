import { Gift, Star } from 'lucide-react'
import type { Product } from '~/types'
import { formatPrice } from '~/utils/format'

interface ProductInfoProps {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <>
      <h1 className='text-[22px] font-bold text-gray-800 leading-tight mb-2'>{product.name}</h1>
      <div className='flex items-center gap-4 text-[13px] text-gray-500 mb-4 pb-4 border-b border-gray-100'>
        <div>
          Mã SP: <span className='text-gray-800 font-medium'>{product.id.toUpperCase()}</span>
        </div>
        <div className='flex items-center gap-1 text-yellow-500'>
          <Star size={14} fill='currentColor' />
          <span className='font-bold'>{product.rating}</span>
          <span className='text-gray-400'>({product.reviews} đánh giá)</span>
        </div>
      </div>

      {/* Price */}
      <div className='flex items-end gap-3 mb-6'>
        <div className='text-[#ed1b24] text-[34px] font-black leading-none'>{formatPrice(product.price)} đ</div>
        {product.originalPrice && (
          <div className='text-gray-400 line-through text-[16px] mb-1'>{formatPrice(product.originalPrice)} đ</div>
        )}
      </div>

      {/* Gift Box conditionally */}
      {product.freeGifts && product.freeGifts.length > 0 && (
        <div className='border border-red-200 rounded overflow-hidden mb-6 bg-red-50/30'>
          <div className='bg-red-100 px-3 py-1.5 flex items-center gap-2 border-b border-red-200'>
            <Gift size={16} className='text-red-500' />
            <span className='font-bold text-red-600 text-[13px] uppercase'>Quà tặng kèm</span>
          </div>
          <div className='p-3 text-[13px] space-y-2 text-gray-700'>
            {product.freeGifts.map((gift, i) => (
              <div key={i} className='flex items-start gap-2'>
                <div className='w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[10px] mt-0.5 shrink-0'>
                  {i + 1}
                </div>
                <span>{gift}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional random promotional content could go here, replacing hardcoded strings */}
      <div className='border border-gray-200 rounded p-4 text-[13px] mb-6'>
        <h3 className='font-bold text-[#0b5edd] mb-2 uppercase text-[14px] flex items-center gap-2'>
          Khuyến mãi đặc biệt
        </h3>
        <p className='flex gap-1.5 items-start'>
          <span className='shrink-0 mt-2 w-1 h-1 rounded-full bg-gray-500'></span>
          <span>Miễn phí giao hàng toàn quốc.</span>
        </p>
        <p className='flex gap-1.5 items-start'>
          <span className='shrink-0 mt-2 w-1 h-1 rounded-full bg-gray-500'></span>
          <span>Hỗ trợ trả góp online toàn quốc - linh hoạt</span>
        </p>
      </div>
    </>
  )
}
