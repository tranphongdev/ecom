import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

interface ProductGalleryProps {
  images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0])

  return (
    <>
      <div className='border border-gray-100 rounded-lg overflow-hidden bg-white flex items-center justify-center p-6 mx-auto relative group mb-6'>
        <img src={activeImage} alt='Product' className='w-full object-contain aspect-square mix-blend-multiply' />
      </div>

      <div className='w-full relative px-2'>
        <Swiper
          spaceBetween={8}
          slidesPerView={4.5}
          breakpoints={{
            640: { slidesPerView: 5.5 }
          }}
          className='thumb-swiper pb-2'
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div
                className={`w-[70px] h-[70px] mx-auto shrink-0 border rounded cursor-pointer overflow-hidden transition-all ${
                  activeImage === img ? 'border-[#0b5edd]' : 'border-gray-200 hover:border-gray-300'
                } p-1 bg-white`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} className='w-full h-full object-contain mix-blend-multiply' />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
