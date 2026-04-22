import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDebounce } from '~/hooks/useDebounce'
import { Search, ShoppingCart, Phone, MapPin, HardDrive, Newspaper, CircleUserRound } from 'lucide-react'
import { Badge, Button, Popover } from 'antd'
import { useCartStore, useAuthStore } from '~/store'
import { MOCK_PRODUCTS } from '~/data/mockData'

export default function Header() {
  const navigate = useNavigate()
  const cartItems = useCartStore((state) => state.items)
  const { isAuthenticated, user } = useAuthStore()
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedTerm = useDebounce(searchTerm, 500)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof MOCK_PRODUCTS>([])

  // Fake API search
  useEffect(() => {
    if (debouncedTerm.trim().length > 1) {
      setTimeout(() => {
        const results = MOCK_PRODUCTS.filter((p) => p.name.toLowerCase().includes(debouncedTerm.toLowerCase())).slice(
          0,
          5
        )
        setSearchResults(results)
        setIsSearching(false)
      }, 600)
    }
  }, [debouncedTerm])

  return (
    <header className='w-full z-50'>
      {/* Top Promotional Banner */}
      <div className='w-full bg-[#031d74] hidden md:block border-b border-blue-900 overflow-hidden cursor-pointer'>
        <div className='container mx-auto px-4 max-w-[1240px] h-10 flex items-center justify-center text-white relative group'>
          {/* We simulate the banner text since it's just raw text in the mockup */}
          <div className='flex items-center gap-4 group-hover:scale-105 transition-transform'>
            <span className='font-black text-lg md:text-xl tracking-wide uppercase drop-shadow-sm'>
              TRANPHONGPC - GIẢI PHÁP MÁY TÍNH HÀNG ĐẦU
            </span>
            <span className='bg-white text-[#031d74] px-2 py-0.5 text-sm md:text-base font-black uppercase rounded shadow-sm'>
              MUA NGAY
            </span>
          </div>
          {/* Subtle glow effect left/right */}
          <div className='absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-blue-500/30 to-transparent pointer-events-none'></div>
          <div className='absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-blue-500/30 to-transparent pointer-events-none'></div>
        </div>
      </div>

      {/* Main Header */}
      <div className='bg-linear-to-b from-[#2E9BFB] to-[#1D52E7] text-white py-2.5 shadow-sm relative z-50'>
        <div className='container mx-auto px-4 max-w-[1240px]'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-3 lg:gap-5'>
            {/* Top Row for Mobile (Logo + Actions) */}
            <div className='flex items-center justify-between w-full md:w-auto'>
              <div className='flex items-center gap-3'>
                {/* Mobile Menu Toggle */}
                <div className='md:hidden cursor-pointer p-1'>
                  <div className='w-6 h-0.5 bg-white mb-1.5 rounded'></div>
                  <div className='w-6 h-0.5 bg-white mb-1.5 rounded'></div>
                  <div className='w-4 h-0.5 bg-white rounded'></div>
                </div>

                {/* Logo Mock */}
                <Link to='/' className='shrink-0 group'>
                  <div className='flex items-center gap-2'>
                    <div className='w-9 h-9 lg:w-11 lg:h-11 border-2 border-white/80 rounded-full flex items-center justify-center font-black text-lg lg:text-xl italic group-hover:scale-105 transition-transform'>
                      TP
                    </div>
                    <span className='font-bold text-sm lg:text-base tracking-wide'>TRANPHONGPC</span>
                  </div>
                </Link>
              </div>

              {/* Quick Actions (Mobile Right Side) */}
              <div className='flex items-center gap-4 md:hidden'>
                <Link to={isAuthenticated ? '/dashboard' : '/login'} className='p-1'>
                  <CircleUserRound size={22} strokeWidth={2} />
                </Link>
                <Badge count={cartItemCount} size='small'>
                  <ShoppingCart size={22} strokeWidth={2} color='white' />
                </Badge>
              </div>
            </div>

            {/* Search Box & Location - Full width on Mobile, flexible on Desktop */}
            <div className='flex-1 w-full relative z-50 order-3 md:order-0 max-w-full flex items-center gap-3'>
              <div className='hidden lg:flex w-9 h-9 border border-white/60 rounded-full items-center justify-center shrink-0 cursor-pointer hover:bg-white/10 transition'>
                <MapPin size={18} strokeWidth={2} />
              </div>

              <div className='flex items-center bg-white rounded flex-1 border border-transparent shadow-inner transition-colors h-10 relative'>
                <input
                  type='text'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder='Bạn cần tìm gì?'
                  className='w-full bg-transparent text-gray-800 py-1.5 pl-4 pr-10 text-[13.5px] focus:outline-none placeholder-gray-400 h-full rounded'
                />
                <button className='absolute right-0 top-0 bottom-0 px-3 text-gray-600 hover:text-primary transition flex items-center justify-center'>
                  <Search size={20} strokeWidth={2} />
                </button>
              </div>

              {/* Search Dropdown Results */}
              {searchTerm.length > 1 && (
                <div className='absolute top-full left-0 lg:left-12 right-0 mt-1 bg-white rounded-md shadow-card-hover border border-gray-100 text-gray-800 overflow-hidden'>
                  {isSearching ? (
                    <div className='p-5 text-center text-[13px] text-gray-500 flex justify-center items-center'>
                      <span className='inline-block animate-spin mr-2 border-2 border-primary border-t-transparent rounded-full w-4 h-4'></span>
                      Đang tìm...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <ul className='py-2'>
                      {searchResults.map((item) => (
                        <li key={item.id} className='hover:bg-gray-50 transition-colors'>
                          <Link
                            to={`/product/${item.id}`}
                            className='flex items-center gap-3 p-3 border-b border-gray-50 last:border-0'
                            onClick={() => setSearchTerm('')}
                          >
                            <div className='w-12 h-12 shrink-0 bg-white border border-gray-100 rounded-sm p-1'>
                              <img src={item.image} alt={item.name} className='w-full h-full object-contain' />
                            </div>
                            <div className='flex-1 min-w-0'>
                              <h4 className='text-[13px] font-medium line-clamp-1 mb-1'>{item.name}</h4>
                              <span className='text-primary font-bold text-[14px]'>
                                {item.price.toLocaleString('vi-VN')}đ
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                      <li className='p-0 border-t border-gray-100 bg-gray-50 hover:bg-gray-100 cursor-pointer transition'>
                        <Link
                          to='/products'
                          className='text-primary text-[13px] font-bold block w-full text-center py-2.5'
                          onClick={() => setSearchTerm('')}
                        >
                          Xem tất cả kết quả
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    <div className='p-5 text-center text-[13px] text-gray-500'>Không tìm thấy sản phẩm.</div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Actions (Desktop only - Icon top, Text bottom) */}
            <div className='hidden md:flex items-center gap-4 lg:gap-6 shrink-0'>
              <Link to='/build' className='flex flex-col items-center gap-1 transition group'>
                <div className='group-hover:-translate-y-1 transition-transform'>
                  <HardDrive size={22} strokeWidth={1.5} />
                </div>
                <span className='text-[11px] lg:text-[12px] font-medium leading-none'>Xây Dựng Cấu Hình</span>
              </Link>

              <Link to='/contact' className='flex flex-col items-center gap-1 transition group'>
                <div className='group-hover:-translate-y-1 transition-transform'>
                  <Phone size={22} strokeWidth={1.5} />
                </div>
                <span className='text-[11px] lg:text-[12px] font-medium leading-none'>Khách Hàng Liên Hệ</span>
              </Link>

              <Link to='/news' className='flex flex-col items-center gap-1 transition group'>
                <div className='group-hover:-translate-y-1 transition-transform'>
                  <Newspaper size={22} strokeWidth={1.5} />
                </div>
                <span className='text-[11px] lg:text-[12px] font-medium leading-none'>Tin Tức Công Nghệ</span>
              </Link>

              <Popover
                placement='bottomRight'
                content={
                  <div className='w-[400px] bg-white text-gray-800 cursor-default'>
                    {cartItems.length > 0 ? (
                      <>
                        <div className='max-h-[300px] overflow-y-auto custom-scrollbar p-1'>
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className='flex gap-3 p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition'
                            >
                              <div className='w-16 h-16 shrink-0 bg-white border border-gray-100 rounded p-1'>
                                <img src={item.image} alt={item.name} className='w-full h-full object-contain' />
                              </div>
                              <div className='flex-1 min-w-0 flex flex-col justify-between'>
                                <span className='text-[13px] font-medium line-clamp-2 leading-tight'>{item.name}</span>
                                <div className='flex items-center justify-between mt-1'>
                                  <span className='text-[13px] font-bold'>x {item.quantity}</span>
                                  <span className='text-primary font-bold text-[14px]'>
                                    {item.price.toLocaleString('vi-VN')}đ
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className='bg-gray-50 border-t border-gray-200'>
                          <div className='flex justify-between items-center mb-3'>
                            <span className='text-sm text-gray-600'>
                              Tổng tiền hàng <span className='italic'>({cartItemCount} sản phẩm)</span>
                            </span>
                            <span className='text-primary font-bold text-[16px]'>
                              {cartTotal.toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                          <Button onClick={() => navigate('/checkout')} type='primary' block>
                            THANH TOÁN NGAY
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className='p-8 text-center text-gray-500 flex flex-col items-center gap-3'>
                        <ShoppingCart size={48} className='text-gray-300' strokeWidth={1} />
                        <span className='text-[13px]'>Không có sản phẩm nào trong giỏ hàng của bạn.</span>
                      </div>
                    )}
                  </div>
                }
              >
                <Link to='/cart' className='flex flex-col items-center gap-1 hover:opacity-100 transition group/cart'>
                  <div className='group-hover/cart:-translate-y-1 transition-transform relative'>
                    {cartItemCount > 0 && (
                      <span className='absolute -top-1.5 -right-2.5 bg-[#ff3b30] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white shadow-sm leading-none flex items-center justify-center min-w-[18px]'>
                        {cartItemCount}
                      </span>
                    )}
                    <ShoppingCart size={22} strokeWidth={1.5} />
                  </div>
                  <span className='text-[11px] lg:text-[12px] font-medium leading-none'>Giỏ Hàng</span>
                </Link>
              </Popover>

              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                className='flex flex-col items-center gap-1 transition group ml-1'
              >
                <div className='group-hover:-translate-y-1 transition-transform relative'>
                  <CircleUserRound size={22} strokeWidth={1.5} className={isAuthenticated ? 'text-[#facc15]' : ''} />
                </div>
                <span className='text-[11px] lg:text-[12px] font-medium leading-none'>
                  {isAuthenticated ? user?.name?.split(' ').pop() : 'Tài Khoản'}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
