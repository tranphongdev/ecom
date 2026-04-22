import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { ChevronRight } from 'lucide-react'
import { Breadcrumb } from 'antd'
import { useTranslation } from 'react-i18next'

import { MOCK_PRODUCTS } from '../data/mockData'
import ProductCard from '../components/ProductCard'
import ProductGallery from '../features/product/components/ProductGallery'
import ProductInfo from '../features/product/components/ProductInfo'
import ProductSpecsList from '../features/product/components/ProductSpecsList'
import ProductActions from '../features/product/components/ProductActions'
import ProductTrustBox from '../features/product/components/ProductTrustBox'
import ProductTabs from '../features/product/components/ProductTabs'
import { usePageMeta } from '~/hooks/usePageMeta'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()

  // In a real app we would use react-query `useQuery` here
  const product = useMemo(() => {
    // If no ID is found, fallback to first product or handle 404
    const found = MOCK_PRODUCTS.find((p) => p.id === id)
    return found || MOCK_PRODUCTS[0]
  }, [id])

  const [quantity, setQuantity] = useState(1)

  usePageMeta({
    title: t('seo.productDetailTitle', { name: product.name }),
    description: product.name
  })

  // Demo active image
  const activeImage = product.image

  // Generating mock images array from the product
  const images = [
    product.image,
    'https://nguyencongpc.vn/media/product/250-25557-41481-rog-hyperion-gr701-a8.jpg',
    'https://nguyencongpc.vn/media/product/250-25557-41481-rog-hyperion-gr701-a3.jpg',
    'https://nguyencongpc.vn/media/product/250-25557-41481-rog-hyperion-gr701-a4.jpg'
  ]

  return (
    <div className='space-y-6 pb-12 mt-4'>
      {/* Breadcrumbs */}
      <div className='bg-white rounded p-3 text-[13px] text-gray-500 shadow-sm border border-gray-100 flex items-center mb-4'>
        <Breadcrumb
          separator="›"
          items={[
            { title: <Link to='/' className='hover:text-[#0b5edd] transition-colors'>{t('product.home')}</Link> },
            { title: <span className='text-gray-800 font-medium uppercase'>{product.category === 'pc' ? t('product.pcCategory') : t('product.productCategory')}</span> },
            { title: <span className='text-gray-800 font-medium line-clamp-1 max-w-[200px] md:max-w-none'>{product.name}</span> }
          ]}
        />
      </div>

      {/* Main Product Section */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8'>
        {/* LEFT COLUMN: Images & Info */}
        <div className='lg:col-span-5 space-y-6'>
          <ProductGallery images={images} />
          <ProductSpecsList product={product} />
        </div>

        {/* RIGHT COLUMN: Buy info */}
        <div className='lg:col-span-7'>
          <ProductInfo product={product} />

          {/* Actions & Buy logic */}
          <ProductActions product={product} quantity={quantity} setQuantity={setQuantity} activeImage={activeImage} />

          <ProductTrustBox />

          {/* Recent Buyer Notification MOCK */}
          <div className='mt-5 bg-gray-50 rounded border border-gray-100 p-3 flex gap-3 items-center'>
            <div className='w-6 h-6 rounded-full bg-[#ed1b24] text-white flex items-center justify-center font-bold text-[10px]'>
              <ChevronRight size={14} />
            </div>
            <div className='text-[13px]'>
              <div>
                <span className='font-bold text-gray-800'>Khách hàng Lương Tiến Đạt (097 478 xxxx)</span>
              </div>
              <div className='text-gray-500'>{t('product.recentBuyer')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Row */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6 overflow-hidden'>
        <h2 className='uppercase text-[20px] font-bold text-gray-800 mb-5'>{t('product.similarProducts')}</h2>
        <div className='w-full relative -mx-2 px-2'>
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={2}
            navigation
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 }
            }}
            className='similar-product-swiper py-2'
          >
            {MOCK_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 10)
              .map((p, i) => (
                <SwiperSlide key={i} className='h-auto'>
                  <ProductCard product={p} index={i} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>

      {/* Details & Specs Section */}
      <ProductTabs product={product} />
    </div>
  )
}
