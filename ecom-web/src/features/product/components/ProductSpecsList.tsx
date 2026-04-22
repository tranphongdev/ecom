import { ChevronDown } from 'lucide-react'
import type { Product } from '../../../types'

interface ProductSpecsListProps {
  product: Product
}

export default function ProductSpecsList({ product }: ProductSpecsListProps) {
  if (!product.specs || product.specs.length === 0) return null

  return (
    <div className='border border-gray-200 rounded-lg p-4'>
      <h3 className='font-bold text-[15px] text-gray-800 mb-3'>Thông số sản phẩm</h3>
      <ul className='list-disc pl-5 text-[13px] text-gray-700 space-y-2 mb-3 marker:text-gray-400'>
        {product.specs.map((spec, i) => (
          <li key={i}>{spec}</li>
        ))}
      </ul>
      <div className='text-[#0b5edd] text-[13px] font-bold cursor-pointer inline-flex items-center gap-1 hover:underline'>
        Xem thêm <ChevronDown size={14} />
      </div>
    </div>
  )
}
