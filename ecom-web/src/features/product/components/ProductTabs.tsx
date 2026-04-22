import { ChevronDown, Play, Star, Send } from 'lucide-react'
import type { Product } from '~/types'

interface ProductTabsProps {
  product: Product
}

export default function ProductTabs({ product }: ProductTabsProps) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
      {/* Left main content body (8 cols) */}
      <div className='lg:col-span-8 space-y-6'>
        {/* Article & Video */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-5'>
          <h2 className='uppercase text-[16px] md:text-[18px] font-bold text-gray-800 mb-4 leading-snug'>
            GIỚI THIỆU {product.name.toUpperCase()}
          </h2>
          <p className='text-[14.5px] text-gray-800 leading-relaxed mb-5'>
            <b>{product.name}</b> là sản phẩm nổi bật được phân phối chính hãng. Thiết kế hiện đại, hiệu năng cực đỉnh,
            đáp ứng hoàn hảo mọi nhu cầu. Đây là lựa chọn tuyệt vời cho môi trường làm việc cũng như giải trí với độ ổn
            định cao và thiết kế sang trọng.
          </p>

          {/* Embedded Video Mock */}
          <div className='relative rounded-lg overflow-hidden border border-gray-200 mb-5 group cursor-pointer max-w-[600px] mx-auto shadow-md'>
            <img src={product.image} alt='Video Thumbnail' className='w-full aspect-video object-contain bg-gray-50' />
            <div className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center'>
              <div className='w-[68px] h-[48px] bg-[#ff0000] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform'>
                <Play className='text-white fill-white ml-1' size={24} />
              </div>
            </div>
            <div className='absolute top-0 left-0 right-0 p-4 bg-linear-to-b from-black/80 to-transparent text-white font-medium text-[15px] flex items-center gap-3'>
              <div className='w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold'>
                RP
              </div>
              Đánh giá chi tiết {product.name}
            </div>
          </div>

          <button className='w-[200px] mx-auto border border-[#0b5edd] text-[#0b5edd] font-medium py-2 text-[14px] rounded flex justify-center items-center gap-1 hover:bg-blue-50 transition'>
            Xem tất cả <ChevronDown size={16} />
          </button>
        </div>

        {/* Reviews Area */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-5'>
          <h3 className='font-bold text-[16px] text-gray-800 mb-5'>Bình luận và đánh giá</h3>
          <div className='flex flex-col md:flex-row gap-8 items-center border border-gray-100 rounded-lg p-6 mb-6 shadow-xs'>
            {/* Score */}
            <div className='text-center w-[150px] shrink-0'>
              <div className='text-[48px] font-black leading-none text-gray-800 mb-2'>{product.rating}/5</div>
              <div className='flex justify-center gap-0.5 text-yellow-400 mb-2'>
                <Star className='fill-yellow-400' size={18} />
                <Star className='fill-yellow-400' size={18} />
                <Star className='fill-yellow-400' size={18} />
                <Star className='fill-yellow-400' size={18} />
                <Star className='fill-yellow-400' size={18} />
              </div>
              <div className='text-[13px] text-gray-500'>{product.reviews} đánh giá và nhận xét</div>
            </div>
            {/* Bars */}
            <div className='flex-1 w-full space-y-2'>
              {[5, 4, 3, 2, 1].map((num) => (
                <div key={num} className='flex items-center gap-3 text-[13px] text-gray-600'>
                  <div className='flex items-center gap-1 w-8 font-medium'>
                    {num} <Star size={12} className='text-yellow-400 fill-yellow-400' />
                  </div>
                  <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
                    {num === 5 && <div className='h-full bg-yellow-400 w-full'></div>}
                  </div>
                  <div className='w-[60px] text-right'>{num === 5 ? product.reviews : 0} đánh giá</div>
                </div>
              ))}
            </div>
          </div>

          <div className='text-center'>
            <p className='text-[14px] text-gray-600 mb-3'>Bạn đánh giá sao sản phẩm này</p>
            <button className='bg-[#0b5edd] text-white px-8 py-2.5 rounded font-bold text-[14px] shadow hover:bg-[#094ca0] transition-colors w-[220px]'>
              Đánh giá ngay
            </button>
          </div>
        </div>

        {/* Q&A Area */}
        <div className='bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-5'>
          <h3 className='font-bold text-[16px] text-gray-800 mb-4'>Hỏi và đáp</h3>
          <div className='bg-white border border-gray-200 rounded p-3 flex items-start gap-4 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400/50 transition-shadow'>
            <textarea
              placeholder='Xin mời để lại câu hỏi, chúng tôi sẽ trả lời ngay trong 1h.'
              className='flex-1 resize-none outline-none text-[13.5px] min-h-[60px] bg-transparent text-gray-800 placeholder-gray-500'
            ></textarea>
            <button className='bg-[#0b5edd] text-white rounded px-5 py-2.5 font-bold shadow hover:bg-[#094ca0] transition flex items-center gap-2'>
              <Send size={16} /> Gửi
            </button>
          </div>
          <div className='mt-3 flex items-center gap-2 text-[13px] font-medium text-gray-700 cursor-pointer hover:text-[#0b5edd]'>
            <div className='w-4 h-4 bg-gray-800 text-white rounded flex items-center justify-center font-serif leading-none shrink-0'>
              <span className='-mt-0.5'>+</span>
            </div>{' '}
            Đính kèm ảnh
          </div>
        </div>
      </div>

      {/* Right side Tech Specs (4 cols) sticky */}
      <div className='lg:col-span-4 relative'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-5 sticky top-20'>
          <h3 className='font-bold text-[16px] text-gray-800 mb-4'>Thông số kỹ thuật</h3>
          <div className='overflow-hidden border border-gray-200 rounded mb-4'>
            <table className='w-full text-[13px] border-collapse bg-white'>
              <tbody>
                {product.specs?.map((spec, index) => (
                  <tr key={index} className='border-b border-gray-200 hover:bg-gray-50 transition-colors'>
                    <td className='p-3 border-r border-gray-200 font-bold text-gray-800 whitespace-nowrap bg-gray-50'>
                      Chi tiết {index + 1}
                    </td>
                    <td className='p-3 text-[#ed1b24] font-medium leading-snug'>{spec}</td>
                  </tr>
                ))}
                {!product.specs && (
                  <tr>
                    <td colSpan={2} className='p-3 text-center text-gray-500'>
                      Chưa có thông số chi tiết
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <button className='w-full border border-[#0b5edd] text-[#0b5edd] font-bold py-2 text-[14px] rounded flex justify-center items-center gap-1 hover:bg-blue-50 transition'>
            Xem đầy đủ thông số kỹ thuật <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
