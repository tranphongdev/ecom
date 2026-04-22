import { ShieldCheck, CheckCircle, RefreshCw, MapPin } from 'lucide-react'

export default function ProductTrustBox() {
  return (
    <div>
      <h3 className='uppercase font-bold text-[15px] text-gray-800 mb-3'>Yên tâm mua hàng</h3>
      <div className='grid grid-cols-2 gap-y-3 gap-x-2 text-[12.5px] text-gray-700'>
        <div className='flex items-start gap-2'>
          <div className='mt-0.5 shrink-0'>
            <ShieldCheck size={16} className='text-red-500' strokeWidth={2} />
          </div>
          <span>Cam kết giá tốt nhất thị trường.</span>
        </div>
        <div className='flex items-start gap-2'>
          <div className='mt-0.5 shrink-0'>
            <CheckCircle size={16} className='text-red-500' strokeWidth={2} />
          </div>
          <span>Sản phẩm mới 100%.</span>
        </div>
        <div className='flex items-start gap-2'>
          <div className='mt-0.5 shrink-0'>
            <RefreshCw size={16} className='text-red-500' strokeWidth={2} />
          </div>
          <span>Lỗi 1 đổi 1 ngay lập tức.</span>
        </div>
        <div className='flex items-start gap-2'>
          <div className='mt-0.5 shrink-0'>
            <MapPin size={16} className='text-red-500' strokeWidth={2} />
          </div>
          <span>Hỗ trợ trả góp - Thủ tục nhanh gọn.</span>
        </div>
      </div>
    </div>
  )
}
