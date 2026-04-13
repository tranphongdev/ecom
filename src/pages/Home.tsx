import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { Zap } from 'lucide-react'
import Countdown from 'react-countdown'
import { MOCK_PRODUCTS } from '~/data/mockData'
import ProductCard, { ProductCardSkeleton } from '~/components/ProductCard'
import HomeHero from '~/components/home/HomeHero'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  // Countdown target logic (e.g. 1 day, 13 hours, 50 mins from now)
  const [targetDate] = useState(() => Date.now() + 1 * 24 * 60 * 60 * 1000 + 13 * 60 * 60 * 1000 + 50 * 60 * 1000)

  useEffect(() => {
    const apiTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(apiTimer)
  }, [])

  const countdownRenderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed
  }: {
    days: number
    hours: number
    minutes: number
    seconds: number
    completed: boolean
  }) => {
    if (completed) return <span className='font-bold text-white text-[14px]'>Đã kết thúc</span>
    const formatNum = (num: number) => num.toString().padStart(2, '0')
    return (
      <div className='flex gap-1.5 text-xs font-black text-[#e41820] items-center'>
        <span className='bg-white px-2 py-1 rounded-[3px] shadow-sm text-[16px] w-[34px] text-center'>
          {formatNum(days)}
        </span>
        <span className='text-white pb-1 font-black'>:</span>
        <span className='bg-white px-2 py-1 rounded-[3px] shadow-sm text-[16px] w-[34px] text-center'>
          {formatNum(hours)}
        </span>
        <span className='text-white pb-1 font-black'>:</span>
        <span className='bg-white px-2 py-1 rounded-[3px] shadow-sm text-[16px] w-[34px] text-center'>
          {formatNum(minutes)}
        </span>
        <span className='text-white pb-1 font-black'>:</span>
        <span className='bg-white px-2 py-1 rounded-[3px] shadow-sm text-[16px] w-[34px] text-center'>
          {formatNum(seconds)}
        </span>
      </div>
    )
  }

  // For Swiper, we might want more items, but we use what we have or duplicate
  const flashSaleProducts = MOCK_PRODUCTS.filter((p) => p.isHot).slice(0, 5)
  // Duplicate for carousel demonstration if too few items
  const extendedFlashSale = [...flashSaleProducts, ...flashSaleProducts]

  const laptopProducts = MOCK_PRODUCTS.filter((p) => p.category === 'laptop').slice(0, 5)
  const pcProducts = MOCK_PRODUCTS.filter((p) => p.category === 'pc').slice(0, 5)

  return (
    <div className='space-y-6'>
      {/* Hero Section */}
      <section className='mb-8 widescreen-hero'>
        <HomeHero />
      </section>

      {/* Flash Sale Section */}
      <section className='relative group/flash z-10'>
        {/* The entire flash sale uses a vibrant blue gradient */}
        <div
          className='px-2 md:px-4 pb-4 pt-3 rounded-lg shadow-sm'
          style={{ background: 'linear-gradient(180deg, #0001ff 0%, #a9f8ff 100%)' }}
        >
          {/* Header row */}
          <div className='flex flex-col md:flex-row md:items-center py-6 mb-3'>
            <div className='flex items-center gap-2'>
              <Zap size={30} className='text-yellow-400 fill-yellow-400' />
              <h2 className='text-[20px] md:text-2xl font-black text-yellow-400 uppercase tracking-wide leading-none'>
                GIÁ TỐT MỖI NGÀY
              </h2>
            </div>

            <div className='flex items-center gap-2 md:gap-3 text-white ml-0 md:ml-6 mt-2 md:mt-0'>
              <span className='font-bold text-[14px]'>Kết thúc sau</span>
              <Countdown date={targetDate} renderer={countdownRenderer} />
            </div>

            <div className='ml-auto mt-2 md:mt-0 hidden md:block'>
              <Link
                to='/flash-sale'
                className='text-white text-[13px] font-medium flex items-center hover:text-yellow-300 transition-colors'
              >
                Xem thêm khuyến mãi <span className='ml-1 text-[10px] mt-1'>▶</span>
              </Link>
            </div>
          </div>

          {/* Swiper Carousel */}
          <div className='relative swiper-wrapper'>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={8}
              slidesPerView={2}
              navigation
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 10 },
                1024: { slidesPerView: 5, spaceBetween: 12 }
              }}
              className='py-1 px-[2px]'
            >
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <SwiperSlide key={i}>
                      <ProductCardSkeleton />
                    </SwiperSlide>
                  ))
                : extendedFlashSale.map((product, index) => (
                    <SwiperSlide key={`${product.id}-${index}`}>
                      <ProductCard product={product} index={index} />
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Laptop Section */}
      <section className='bg-white rounded-lg shadow-sm border border-gray-100 relative'>
        <div className='px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-[#0b5edd] rounded-t-lg text-white'>
          <h2 className='text-xl font-bold uppercase tracking-wide'>Laptop Bán Chạy</h2>
          <Link
            to='/products?category=laptop'
            className='text-sm font-semibold hover:text-yellow-300 transition-colors'
          >
            Xem tất cả →
          </Link>
        </div>
        <div className='p-2 md:p-4'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 relative'>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : laptopProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
          </div>
        </div>
      </section>

      {/* PC Section */}
      <section className='bg-white rounded-lg shadow-sm border border-gray-100 relative'>
        <div className='px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-[#1777d1] rounded-t-lg text-white'>
          <h2 className='text-xl font-bold uppercase tracking-wide'>PC Xây Dựng Cấu Hình</h2>
          <Link to='/products?category=pc' className='text-sm font-semibold hover:text-yellow-300 transition-colors'>
            Xem tất cả →
          </Link>
        </div>
        <div className='p-2 md:p-4'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 relative'>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : pcProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
        </div>
      </section>

      {/* Brands Parallax / Carousel Placeholder */}
      <section className='bg-white rounded shadow-sm p-6 mb-8 flex justify-between items-center opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer'>
        <div className='text-2xl font-black'>ASUS</div>
        <div className='text-2xl font-black'>GIGABYTE</div>
        <div className='text-2xl font-black'>MSI</div>
        <div className='text-2xl font-black'>DELL</div>
        <div className='text-2xl font-black'>HP</div>
        <div className='text-2xl font-black'>INTEL</div>
        <div className='text-2xl font-black'>AMD</div>
      </section>
    </div>
  )
}
