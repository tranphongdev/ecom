import { Link } from 'react-router-dom'
import { Gift, Database } from 'lucide-react'
import { Popover } from 'antd'
import type { Product } from '~/types'
import { formatPrice } from '~/utils/format'

interface Props {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: Props) {
  // Mocks based on screenshot
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0
  const originalStr = product.originalPrice ? formatPrice(product.originalPrice) : ''
  const priceStr = formatPrice(product.price)

  // Popover Tooltip Content
  const TooltipContent = (
    <div className='w-[420px] min-h-[400px] bg-white border border-[#0b5edd] shadow-2xl rounded overflow-hidden text-[13px]'>
      <div className='bg-[#0b5edd] p-3 text-white'>
        <h3 className='font-bold text-[14px] uppercase leading-snug'>{product.name}</h3>
      </div>
      <div className='p-4 bg-white'>
        <div className='grid grid-cols-[100px_1fr] gap-y-2 mb-5 font-medium text-gray-800'>
          <div className='font-bold'>Giá niêm yết</div>
          <div className='flex gap-2 items-center'>
            {originalStr ? (
              <>
                <span className='line-through'>{originalStr}đ</span>
                <span className='text-red-600 font-bold text-[13px]'>-{discountPercent}%</span>
              </>
            ) : (
              <span>{priceStr}đ</span>
            )}
          </div>
          <div className='font-bold'>Giá bán</div>
          <div className='text-[#0b5edd] font-black text-[15px]'>{priceStr}đ</div>
          <div className='font-bold'>Bảo hành</div>
          <div className='text-red-600 font-bold'>12 tháng</div>
          <div className='font-bold'>Tình trạng</div>
          <div className='text-[#0b5edd] font-bold'>Còn hàng</div>
        </div>
        <div className='bg-[#0b5edd] text-white rounded px-3 py-1.5 flex items-center gap-2 font-bold mb-3 shadow-inner'>
          <Database size={16} /> Thông số sản phẩm
        </div>
        <div className='space-y-1.5 text-gray-800 mb-6 px-1'>
          <p>Hệ điều hành: NO OS</p>
          <p>CPU: Intel® Core™ Processor (bộ nhớ đệm 12M, lên đến 4,70 GHz)</p>
          <p>Ram: 8GB Soldered DDR4-3200Mhz</p>
          <p>Ổ cứng (HDD/SSD): 256GB SSD</p>
        </div>
        <div className='border border-[#0b5edd] rounded relative mt-6 pt-5 bg-white'>
          <div
            className='absolute -top-[16px] -left-px bg-[#0b5edd] text-white pr-6 pl-3 py-1.5 font-bold text-[13px] flex items-center gap-2'
            style={{ clipPath: 'polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%)' }}
          >
            <Gift size={15} /> Khuyến mãi
          </div>
          <div className='p-3 text-gray-800 space-y-1.5 text-[13px] leading-snug'>
            <div className='text-red-600 font-bold mb-1'>Quà Tặng:</div>
            <p>+ Tặng Balo TranPhongPC trị giá 200.000đ</p>
            <p>+ Tặng Chuột không dây trị giá 150.000đ</p>
            <p>+ Tặng Bàn di chuột trị giá: 50.000đ</p>
            <p>+ Tặng Bộ vệ sinh Laptop trị giá: 40.000đ</p>
          </div>
        </div>
      </div>
    </div>
  )

  // ================= FLASH SALE (HOT) CARD =================
  if (product.isHot) {
    return (
      <div className='group/card relative flex flex-col h-full z-10 hover:z-50 bg-white p-3 rounded shadow-sm hover:shadow-card-hover transition-all duration-200 border border-gray-100/50'>
        {/* HOT / NEW Ribbon */}
        <div
          className='absolute top-0 right-2 z-20 w-[32px] h-[40px] bg-[#e30019] text-white flex justify-center pt-1.5 shadow-sm'
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%)' }}
        >
          <span className='text-[10px] font-black tracking-tight'>{index % 2 === 0 ? 'HOT' : 'NEW'}</span>
        </div>

        <div className='flex flex-col h-full overflow-hidden relative'>
          {/* Main Flash Sale Image Area */}
          <Popover
            content={TooltipContent}
            placement={'right'}
            mouseEnterDelay={0.15}
            styles={{ container: { padding: 0, borderRadius: '8px', border: 'none', boxShadow: 'none' } }}
          >
            <Link to={`/product/${product.id}`} className='block relative mb-4'>
              <div className='w-full h-[180px] xl:h-[200px] relative flex justify-center items-center px-2'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='absolute inset-0 w-full h-full object-contain p-2 group-hover/card:-translate-y-1 transition-transform duration-300'
                />
                {product.frameUrl && (
                  <img
                    src={product.frameUrl}
                    alt='frame'
                    className='absolute inset-0 w-full h-full object-fill pointer-events-none z-10'
                  />
                )}
              </div>
            </Link>
          </Popover>

          <div className='flex flex-col flex-1'>
            <Link
              to={`/product/${product.id}`}
              className='text-xs xl:text-sm text-gray-800 hover:text-[#0b5edd] line-clamp-3 leading-snug mb-2 font-medium'
            >
              {product.name}
            </Link>

            <div className='mt-auto'>
              {/* Pricing */}
              <div className='flex items-center gap-1.5 mb-1 h-[20px]'>
                {originalStr && (
                  <>
                    <span className='text-gray-500 text-[12px] xl:text-[13px] line-through decoration-gray-400 font-medium tracking-tight'>
                      {originalStr} đ
                    </span>
                    <span className='bg-[#c51f28] text-white text-[11px] px-1.5 py-px rounded font-bold tracking-tight whitespace-nowrap shadow-sm ml-1'>
                      -{discountPercent}%
                    </span>
                  </>
                )}
              </div>

              <div className='text-[#e30019] font-black text-[18px] xl:text-[20px] tracking-tight leading-none mb-3 whitespace-nowrap'>
                {priceStr}đ
              </div>

              {/* Progress Bar Sold Section */}
              <div className='relative h-[20px] bg-gray-200 rounded-full flex items-center shadow-inner mt-2 mb-3 w-[95%] ml-auto mr-1'>
                <div
                  className='absolute left-0 top-0 bottom-0 bg-linear-to-r from-yellow-500 to-yellow-400 rounded-full'
                  style={{ width: '40%' }}
                ></div>
                <div className='absolute -left-[10px] top-1/2 -translate-y-1/2 flex items-center justify-center text-[22px] drop-shadow-sm z-20 leading-none pb-[2px]'>
                  🔥
                </div>
                <span className='relative z-10 w-full text-center text-[10px] font-medium text-gray-800 tracking-tight whitespace-nowrap pl-[10px]'>
                  Còn <span className='font-bold'>3</span>/ 5 sản phẩm
                </span>
              </div>

              {/* Promo Gift Footer */}
              <div className='text-[11px] xl:text-[12px] leading-tight text-gray-600 mt-2 line-clamp-2'>
                {index % 2 === 0 ? (
                  <>
                    Giảm ngay <span className='text-red-600 font-bold'>500.000đ</span> khi khách hàng mua cùng 1...
                  </>
                ) : (
                  <>
                    - <span className='text-red-600 font-bold whitespace-nowrap'>Tặng Màn Hình:</span> Màn hình{' '}
                    {index === 1 ? 'Gigabyte GS25F2...' : 'VSP IP2408SG (23...'}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ================= NORMAL CARD =================
  return (
    <div className='bg-white p-3 border border-gray-100 hover:border-gray-200 hover:shadow-card-hover transition-all duration-200 group/card relative flex flex-col h-full z-10 hover:z-50'>
      {/* Image Area */}
      <Popover
        content={TooltipContent}
        placement={'right'}
        mouseEnterDelay={0.15}
        styles={{ container: { padding: 0, borderRadius: '8px', border: 'none', boxShadow: 'none' } }}
      >
        <Link to={`/product/${product.id}`} className='block relative mb-3 bg-white pt-2'>
          <div className='w-full h-[180px] xl:h-[200px] relative bg-white flex justify-center items-center'>
            <img
              src={product.image}
              alt={product.name}
              className='absolute inset-0 w-full h-full object-contain p-3 group-hover/card:-translate-y-1 transition-transform duration-300'
            />
            {product.frameUrl && (
              <img
                src={product.frameUrl}
                alt='frame'
                className='absolute inset-0 w-full h-full object-fill pointer-events-none z-10'
              />
            )}
          </div>
        </Link>
      </Popover>

      <div className='flex flex-col flex-1 mt-1'>
        {/* Title */}
        <Link
          to={`/product/${product.id}`}
          className='text-sm text-gray-800 hover:text-[#0b5edd] line-clamp-3 leading-snug mb-2 font-medium'
        >
          {product.name}
        </Link>

        {/* Pricing Area */}
        <div className='mt-auto'>
          <div className='flex flex-wrap items-center gap-1.5 mb-1 min-h-[20px]'>
            {originalStr && (
              <>
                <span className='text-gray-500 text-[13px] line-through decoration-gray-400 font-medium tracking-tight'>
                  {originalStr}đ
                </span>
                <span className='bg-[#c51f28] text-white text-[11px] px-1.5 py-0.5 rounded font-black tracking-tight whitespace-nowrap shrink-0 shadow-sm'>
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          <div className='text-[#c51f28] font-black text-[18px] tracking-tight leading-none mb-3'>{priceStr}đ</div>

          {/* Footer Quà Tặng & Bán */}
          <div className='text-[12px] text-gray-500 leading-tight'>
            <div className='text-red-500 font-bold mb-0.5'>Quà Tặng:</div>
            <div className='truncate w-full'>+ Tặng Balo TranPhongPC trị...</div>
            <div className='mt-1 font-bold text-gray-700'>
              Đã bán: <span className='font-medium text-gray-600'>{product.sold || 11}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className='bg-white rounded p-3 border border-gray-100 shadow-sm flex flex-col h-[380px]'>
      <div className='skeleton w-full h-[180px] xl:h-[200px] rounded mb-4'></div>
      <div className='skeleton h-[16px] w-full mb-2 rounded'></div>
      <div className='skeleton h-[16px] w-2/3 mb-4 rounded'></div>
      <div className='mt-auto'>
        <div className='skeleton h-[14px] w-1/3 mb-2 rounded'></div>
        <div className='skeleton h-[24px] w-1/2 mb-4 rounded'></div>
        <div className='border-t border-gray-100 pt-2 flex justify-between'>
          <div className='skeleton h-[12px] w-1/2 rounded'></div>
        </div>
      </div>
    </div>
  )
}
