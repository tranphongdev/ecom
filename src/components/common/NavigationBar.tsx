import { Link } from 'react-router-dom'
import { Menu, Zap, MonitorPlay, Mouse, Wrench, ShieldCheck, ChevronDown, Cpu } from 'lucide-react'
import CategorySidebar from '../home/CategorySidebar'

export default function NavigationBar() {
  const navItems = [
    { name: 'Laptop', icon: MonitorPlay, path: '/laptop', hasMegaMenu: true },
    { name: 'PC', icon: Cpu, path: '/linh-kien-may-tinh' },
    { name: 'PC AI', icon: Zap, path: '/linh-kien-may-tinh' },
    { name: 'Linh kiện PC', icon: Wrench, path: '/linh-kien-may-tinh' },
    { name: 'Màn hình', icon: MonitorPlay, path: '/man-hinh-may-tinh' },
    { name: 'Thiết bị văn phòng', icon: ShieldCheck, path: '/thiet-bi-van-phong' },
    { name: 'Phím chuột ghế gear', icon: Mouse, path: '/phim-chuot-ghe-gear' }
  ]

  return (
    <div className='bg-[#2366EF] border-t border-blue-600 shadow-sm sticky top-0 z-40 hidden md:block'>
      <div className='container mx-auto max-w-[1240px] px-4 flex items-center h-11 relative'>
        {/* Category Menu Button as Dropdown Trigger */}
        <div className='bg-white text-primary flex items-center gap-2 px-5 h-full cursor-pointer w-[280px] shrink-0 font-bold hover:bg-gray-100 transition text-[14px] group'>
          <Menu size={20} className='mr-1' />
          <span>DANH MỤC SẢN PHẨM</span>
          {/* Dropdown Container */}
          <div className='hidden group-hover:block absolute top-full left-4 pt-0 z-50'>
            <CategorySidebar />
          </div>
        </div>

        {/* Nav Links */}
        <nav className='flex-1 px-2 md:px-4 flex items-center h-full min-w-0'>
          <ul className='flex items-center w-full gap-5 h-full overflow-x-auto hide-scrollbar whitespace-nowrap'>
            {navItems.map((item, index) => {
              const Icon = item.icon
              return (
                <li key={index} className='h-full inline-block group/nav'>
                  <Link
                    to={item.path}
                    className='flex items-center gap-1.5 text-[13px] font-bold text-white h-full px-1 transition-colors relative'
                  >
                    <Icon size={16} className='text-white/80 group-hover/nav:text-white transition-colors shrink-0' />
                    <span className='whitespace-nowrap'>{item.name}</span>
                    <ChevronDown size={14} className='text-white/80 group-hover/nav:text-white transition-colors' />
                    <div className='absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover/nav:scale-x-100 transition-transform origin-center'></div>
                  </Link>

                  {/* Mega Menu Dropdown Mock for Laptop */}
                  {item.hasMegaMenu && (
                    <div className='absolute top-full left-[300px] w-[800px] bg-white text-gray-800 shadow-card-hover rounded-b-md p-6 hidden group-hover/nav:flex gap-8 z-50 border border-gray-100 animate-fade-in origin-top'>
                      <div className='w-[200px]'>
                        <h3 className='font-bold mb-3 text-[14px] uppercase border-b border-gray-100 pb-2'>
                          CHỌN THEO NHU CẦU
                        </h3>
                        <ul className='space-y-2.5 text-[13px]'>
                          <li className='hover:text-primary cursor-pointer transition'>Laptop Gaming</li>
                          <li className='hover:text-primary cursor-pointer transition'>Laptop Đồ Họa - Kiến Trúc</li>
                          <li className='hover:text-primary cursor-pointer transition'>Laptop Văn Phòng</li>
                          <li className='hover:text-primary cursor-pointer transition'>Laptop Mỏng Nhẹ</li>
                        </ul>
                      </div>

                      <div className='w-[200px]'>
                        <h3 className='font-bold mb-3 text-[14px] uppercase border-b border-gray-100 pb-2'>
                          CHỌN THEO KHOẢNG GIÁ
                        </h3>
                        <ul className='space-y-2.5 text-[13px]'>
                          <li className='hover:text-primary cursor-pointer transition'>Dưới 10 Triệu</li>
                          <li className='hover:text-primary cursor-pointer transition'>10 Triệu - 15 Triệu</li>
                          <li className='hover:text-primary cursor-pointer transition'>15 Triệu - 20 Triệu</li>
                        </ul>

                        <h3 className='font-bold mt-5 mb-3 text-[14px] uppercase border-b border-gray-100 pb-2'>
                          CHỌN THEO HÃNG
                        </h3>
                        <ul className='space-y-2.5 text-[13px]'>
                          <li className='hover:text-primary cursor-pointer transition'>Laptop Dell</li>
                          <li className='hover:text-primary cursor-pointer transition'>Laptop Asus</li>
                        </ul>
                      </div>

                      <div className='flex-1 bg-gray-50 p-4 rounded-md'>
                        <h3 className='font-bold mb-3 text-[14px] border-b border-gray-200 pb-2'>Bán chạy nhất</h3>
                        <div className='flex flex-col gap-3'>
                          <div className='flex gap-3 items-center bg-white p-2 rounded border border-gray-100 hover:border-primary cursor-pointer transition'>
                            <img
                              src='https://nguyencongpc.vn/media/product/250_30303_latitude_3420.jpg'
                              className='w-12 h-12 object-contain'
                              alt='Dell'
                            />
                            <div>
                              <div className='text-[12px] font-medium line-clamp-2 leading-tight'>
                                Laptop Dell PV 15250 Essential
                              </div>
                              <div className='text-primary font-bold text-[13px] mt-1'>11.690.000đ</div>
                            </div>
                          </div>
                          <div className='flex gap-3 items-center bg-white p-2 rounded border border-gray-100 hover:border-primary cursor-pointer transition'>
                            <img
                              src='https://nguyencongpc.vn/media/product/250_25089_gf63_thin_11sc.jpg'
                              className='w-12 h-12 object-contain'
                              alt='Asus'
                            />
                            <div>
                              <div className='text-[12px] font-medium line-clamp-2 leading-tight'>
                                Laptop Asus TUF Dash F15
                              </div>
                              <div className='text-primary font-bold text-[13px] mt-1'>18.990.000đ</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
