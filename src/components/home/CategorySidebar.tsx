import {
  Cpu,
  Monitor,
  Laptop,
  ChevronRight,
  MonitorPlay,
  HardDrive,
  Keyboard,
  MousePointer2,
  Headphones
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CategorySidebar() {
  const categories = [
    { name: 'PC Mới, PC Khuyến Mãi', icon: MonitorPlay, hasMegaMenu: true, path: '/laptop' },
    { name: 'Linh Kiện Máy Tính', icon: Cpu, path: '/linh-kien-may-tinh' },
    { name: 'Màn hình máy tính', icon: Monitor, path: '/man-hinh-may-tinh' },
    { name: 'Laptop, Máy Tính Xách Tay', icon: Laptop, hasMegaMenu: true, path: '/laptop' },
    { name: 'Ổ Cứng SSD, HDD', icon: HardDrive, path: '/linh-kien-may-tinh' },
    { name: 'Bàn Phím Máy Tính', icon: Keyboard, path: '/phim-chuot-ghe-gear' },
    { name: 'Chuột, Lót Chuột', icon: MousePointer2, path: '/phim-chuot-ghe-gear' },
    { name: 'Tai Nghe, Loa', icon: Headphones, path: '/phim-chuot-ghe-gear' }
  ]

  return (
    <div className='bg-white rounded-b-md shadow-card-hover w-[280px] shrink-0 border border-t-0 border-gray-100 absolute top-full left-0 z-50 animate-fade-in origin-top'>
      {/* Set UL to relative so the absolute children align correctly! */}
      <ul className='flex flex-col bg-white py-2 relative'>
        {categories.map((cat, index) => {
          const Icon = cat.icon
          return (
            <li key={index} className='px-5 hover:bg-gray-50 group/sidebarItem transition-colors cursor-pointer'>
              <Link
                to={cat.path}
                className='flex items-center justify-between py-2.5 border-b border-gray-100 group-last/sidebarItem:border-0 text-[13px] font-semibold text-gray-700 group-hover/sidebarItem:text-primary transition-colors'
              >
                <div className='flex items-center gap-3.5'>
                  <Icon
                    size={18}
                    className='text-gray-400 group-hover/sidebarItem:text-primary transition-colors'
                    strokeWidth={1.5}
                  />
                  <span>{cat.name}</span>
                </div>
                <ChevronRight
                  size={14}
                  className='text-gray-300 group-hover/sidebarItem:text-primary transition-colors'
                />
              </Link>

              {/* Mega Menu Flyout */}
              {cat.hasMegaMenu && (
                <div className='hidden group-hover/sidebarItem:flex absolute left-full top-0 bottom-0 min-h-full w-[800px] bg-white shadow-card-hover rounded-r-md border border-gray-100 p-6 z-50 origin-left animate-fade-in gap-8 cursor-default'>
                  <div className='w-[200px]'>
                    <h3 className='font-bold mb-3 text-[14px] uppercase border-b border-gray-100 pb-2 text-gray-800'>
                      DANH MỤC PHỔ BIẾN
                    </h3>
                    <ul className='space-y-2.5 text-[13px] text-gray-600'>
                      <li className='hover:text-primary cursor-pointer transition'>Phân khúc cao cấp</li>
                      <li className='hover:text-primary cursor-pointer transition'>Phân khúc tầm trung</li>
                      <li className='hover:text-primary cursor-pointer transition'>Giá rẻ sinh viên</li>
                      <li className='hover:text-primary cursor-pointer transition'>Hàng mới về</li>
                    </ul>
                  </div>

                  <div className='w-[200px]'>
                    <h3 className='font-bold mb-3 text-[14px] uppercase border-b border-gray-100 pb-2 text-gray-800'>
                      THƯƠNG HIỆU
                    </h3>
                    <ul className='space-y-2.5 text-[13px] text-gray-600'>
                      <li className='hover:text-primary cursor-pointer transition'>ASUS</li>
                      <li className='hover:text-primary cursor-pointer transition'>MSI</li>
                      <li className='hover:text-primary cursor-pointer transition'>GIGABYTE</li>
                      <li className='hover:text-primary cursor-pointer transition'>DELL</li>
                    </ul>
                  </div>

                  <div className='flex-1 bg-gray-50 p-4 rounded-md'>
                    <h3 className='font-bold mb-3 text-[14px] border-b border-gray-200 pb-2 text-gray-800'>
                      Sản phẩm nổi bật
                    </h3>
                    <div className='flex flex-col gap-3'>
                      <Link
                        to='/products'
                        className='flex gap-3 items-center bg-white p-2 rounded border border-gray-100 hover:border-primary cursor-pointer transition group/item'
                      >
                        <img
                          src='https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=150&q=80'
                          className='w-12 h-12 object-cover rounded'
                          alt='Mock'
                        />
                        <div>
                          <div className='text-[12px] font-medium line-clamp-2 leading-tight text-gray-700 group-hover/item:text-primary transition-colors'>
                            Sản phẩm cao cấp hiệu năng vượt trội
                          </div>
                          <div className='text-primary font-bold text-[13px] mt-1'>25.990.000đ</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
