import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'

import HeroMainBanner from '~/assets/images/hero_main.webp'
import Banner1 from '~/assets/images/hero1.jpg'
import Banner2 from '~/assets/images/hero2.jpg'
import Banner3 from '~/assets/images/hero3.jpg'
import Banner4 from '~/assets/images/hero4.jpg'

const SWIPER_BANNERS = [
  { id: 1, src: Banner1, alt: 'Promotional Banner 1' },
  { id: 2, src: Banner2, alt: 'Promotional Banner 2' },
  { id: 3, src: Banner3, alt: 'Promotional Banner 3' },
  { id: 4, src: Banner4, alt: 'Promotional Banner 4' }
]

const SIDE_BANNERS = [
  {
    id: 'left',
    src: 'https://nguyencongpc.vn/media/banner/09_Mar268c00753956cb52e18fbddf7ecdf6ac.jpg',
    positionClass: 'left-[calc(50%-780px)]',
    alt: 'Left Promotional Banner'
  },
  {
    id: 'right',
    src: 'https://nguyencongpc.vn/media/banner/09_Mar8a37046ffa5c6cbc93388cc5fdb94b04.jpg',
    positionClass: 'right-[calc(50%-780px)]',
    alt: 'Right Promotional Banner'
  }
]

const HomeHero: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const bannerTopPosition = isScrolled ? 'top-[60px]' : 'top-[167px]'

  return (
    <>
      {/* Fixed Side Banners */}
      {SIDE_BANNERS.map(({ id, src, positionClass, alt }) => (
        <div
          key={id}
          className={`fixed ${bannerTopPosition} ${positionClass} transition-all duration-300 max-w-[150px] rounded-lg overflow-hidden z-40 hidden 2xl:block`}
        >
          <img src={src} alt={alt} loading='lazy' />
        </div>
      ))}

      {/* Main Content Area */}
      <div className='relative'>
        <div className='rounded-lg overflow-hidden'>
          <img src={HeroMainBanner} alt='Hero Main Banner' />
        </div>

        <div className='relative z-10 -mt-[50px]'>
          <Swiper
            spaceBetween={12}
            slidesPerView={2}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className='mySwiper'
          >
            {SWIPER_BANNERS.map(({ id, src, alt }) => (
              <SwiperSlide key={id}>
                <div className='rounded-lg overflow-hidden w-full'>
                  <img src={src} alt={alt} loading='lazy' />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default HomeHero
