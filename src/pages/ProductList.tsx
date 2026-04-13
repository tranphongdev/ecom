import { useState, useEffect } from 'react'
import { Breadcrumb, Pagination, Select } from 'antd'
import { 
  TrendingUp, TrendingDown, MessageCircle, Star, LayoutGrid, List, Gamepad2, 
  Laptop, Cpu, MonitorPlay, Monitor, Database, Zap, Server, Printer, Tablet, 
  Camera, Wrench, Headphones, Mouse, Keyboard, Square, Mic, Radio, Briefcase, 
  Layers, Activity 
} from 'lucide-react'
import ProductCard, { ProductCardSkeleton } from '~/components/ProductCard'
import { Link, useParams } from 'react-router-dom'
import { MOCK_PRODUCTS } from '~/data/mockData'

// Constants
const FILTER_CRITERIA = [
  'Thương hiệu',
  'Trọng lượng Laptop',
  'Loại màn hình Laptop',
  'Kích thước màn hình Laptop',
  'Card đồ họa (VGA) Laptop',
  'Dung lượng ổ cứng Laptop',
  'Dung lượng RAM Laptop',
  'Bộ vi xử lý (CPU) Laptop',
  'Độ phân giải',
  'Khoảng Giá Laptop',
  'Hãng sản xuất Laptop'
]

type FilterItem = {
  title: string
  icon?: React.ReactNode
  textIcon?: string
  isActive?: boolean
}

const CATEGORY_MAP: Record<string, { title: string, filters: FilterItem[] }> = {
  'laptop': {
    title: 'Laptop Gaming',
    filters: [
      { title: 'LAPTOP GAMING', icon: <Gamepad2 size={32} strokeWidth={1.5} />, isActive: true },
      { title: 'CHỌN THEO NHU CẦU', icon: <Laptop size={32} strokeWidth={1.5} /> },
      { title: 'CHỌN THEO KHOẢNG GIÁ', textIcon: 'GIÁ' },
      { title: 'CHỌN THEO CPU', icon: <Cpu size={32} strokeWidth={1.5} /> },
      { title: 'CHỌN THEO HÃNG', textIcon: 'BRAND' }
    ]
  },
  'linh-kien-may-tinh': {
    title: 'LINH KIỆN MÁY TÍNH',
    filters: [
      { title: 'CPU - Bộ vi xử lý', icon: <Cpu size={32} strokeWidth={1.5} /> },
      { title: 'VGA - Card Màn Hình', icon: <MonitorPlay size={32} strokeWidth={1.5} /> },
      { title: 'Main - Bo mạch chủ', icon: <LayoutGrid size={32} strokeWidth={1.5} /> },
      { title: 'Ram - Bộ nhớ trong', icon: <Database size={32} strokeWidth={1.5} /> },
      { title: 'PSU - Nguồn máy tính', icon: <Zap size={32} strokeWidth={1.5} /> },
      { title: 'Case - Vỏ máy tính', icon: <Server size={32} strokeWidth={1.5} /> }
    ]
  },
  'man-hinh-may-tinh': {
    title: 'MÀN HÌNH MÁY TÍNH',
    filters: [
      { title: 'CHỌN THEO HÃNG', textIcon: 'BRAND' },
      { title: 'CHỌN THEO KÍCH THƯỚC', icon: <Monitor size={32} strokeWidth={1.5} /> },
      { title: 'CHỌN ĐỘ PHÂN GIẢI', textIcon: '1080p' },
      { title: 'CHỌN TẦN SỐ QUÉT', textIcon: 'Hz' },
      { title: 'MÀN HÌNH ĐỒ HỌA', icon: <MonitorPlay size={32} strokeWidth={1.5} /> },
      { title: 'Màn hình Gaming', textIcon: 'NC' },
      { title: 'Màn hình Oled', textIcon: 'NC' }
    ]
  },
  'thiet-bi-van-phong': {
    title: 'THIẾT BỊ VĂN PHÒNG',
    filters: [
      { title: 'Máy in', icon: <Printer size={32} strokeWidth={1.5} /> },
      { title: 'MÁY TÍNH BẢNG', icon: <Tablet size={32} strokeWidth={1.5} /> },
      { title: 'MÁY CHIẾU', icon: <Camera size={32} strokeWidth={1.5} /> },
      { title: 'GIÁ TREO MÀN HÌNH', icon: <Monitor size={32} strokeWidth={1.5} /> },
      { title: 'THIẾT BỊ CHUYỂN ĐỔI', icon: <Zap size={32} strokeWidth={1.5} /> },
      { title: 'CAMERA', icon: <Camera size={32} strokeWidth={1.5} /> }
    ]
  },
  'phim-chuot-ghe-gear': {
    title: 'PHÍM CHUỘT, GHẾ, GEAR',
    filters: [
      { title: 'Linh kiện Laptop', icon: <Wrench size={32} strokeWidth={1.5} /> },
      { title: 'THIẾT BỊ ÂM THANH', icon: <Headphones size={32} strokeWidth={1.5} /> },
      { title: 'Mouse - Chuột', icon: <Mouse size={32} strokeWidth={1.5} /> },
      { title: 'Bàn Phím', icon: <Keyboard size={32} strokeWidth={1.5} /> },
      { title: 'Ghế GAMING', icon: <LayoutGrid size={32} strokeWidth={1.5} /> },
      { title: 'Webcam', icon: <Camera size={32} strokeWidth={1.5} /> },
      { title: 'Pad di chuột', icon: <Square size={32} strokeWidth={1.5} /> },
      { title: 'Thiết bị chuyển đổi', icon: <Zap size={32} strokeWidth={1.5} /> },
      { title: 'Microphones', icon: <Mic size={32} strokeWidth={1.5} /> },
      { title: 'Tay cầm chơi Game', icon: <Gamepad2 size={32} strokeWidth={1.5} /> },
      { title: 'Bàn GAMING', icon: <Monitor size={32} strokeWidth={1.5} /> },
      { title: 'Thiết Bị Studio', icon: <Radio size={32} strokeWidth={1.5} /> },
      { title: 'Phụ Kiện GAMING', icon: <Briefcase size={32} strokeWidth={1.5} /> },
      { title: 'Combo Gear', icon: <Layers size={32} strokeWidth={1.5} /> },
      { title: 'GHẾ CÔNG THÁI HỌC', icon: <LayoutGrid size={32} strokeWidth={1.5} /> },
      { title: 'GHẾ MASSAGE', icon: <LayoutGrid size={32} strokeWidth={1.5} /> },
      { title: 'MÁY CHẠY BỘ', icon: <Activity size={32} strokeWidth={1.5} /> }
    ]
  }
}

export default function ProductList() {
  const { category } = useParams<{ category: string }>()
  const currentCategory = category && CATEGORY_MAP[category] ? CATEGORY_MAP[category] : CATEGORY_MAP['laptop']
  
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState(MOCK_PRODUCTS)
  const [sortOrder, setSortOrder] = useState('newest')

  const handleSortChange = (order: string) => {
    if (order !== sortOrder) {
      setIsLoading(true)
      setSortOrder(order)
    }
  }

  const [prevCategory, setPrevCategory] = useState(category)

  if (category !== prevCategory) {
    setPrevCategory(category)
    setIsLoading(true)
  }

  useEffect(() => {
    // Simulate loading data based on category and sorting
    const timer = setTimeout(() => {
      const sorted = [...MOCK_PRODUCTS]
      if (sortOrder === 'price_asc') sorted.sort((a, b) => a.price - b.price)
      if (sortOrder === 'price_desc') sorted.sort((a, b) => b.price - a.price)
      setProducts(sorted)
      setIsLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [sortOrder, category])

  return (
    <div className='w-full pb-8'>
      <div className='text-sm text-gray-500 mb-6'>
        <Breadcrumb
          items={[
            {
              title: (
                <Link to='/' className='hover:text-primary'>
                  Trang chủ
                </Link>
              )
            },
            { title: <span className='font-semibold text-gray-800 uppercase'>{currentCategory.title}</span> }
          ]}
        />
      </div>

      <h1 className='text-center text-[#0b5edd] text-2xl md:text-[28px] font-bold uppercase mb-6 mt-2 tracking-wide'>
        {currentCategory.title}
      </h1>

      {/* Quick Filter Bubbles */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-100 mb-6 p-6'>
        <div className='flex flex-wrap items-start justify-center gap-6 md:gap-12'>
          {currentCategory.filters.map((item, idx) => (
            <div key={idx} className='flex flex-col items-center gap-3 cursor-pointer group w-[100px] md:w-[130px]'>
              <div
                className={`w-[68px] h-[68px] md:w-[80px] md:h-[80px] rounded-full flex items-center justify-center transition-all duration-300 ${
                  item.isActive
                    ? 'bg-blue-50 border-2 border-[#0b5edd] text-[#0b5edd]'
                    : 'bg-[#f4f4f4] border border-transparent text-gray-800 group-hover:bg-blue-50 group-hover:text-[#0b5edd]'
                }`}
              >
                {item.icon ? (
                  item.icon
                ) : (
                  <span className='font-black text-[16px] md:text-[20px] uppercase tracking-tighter'>
                    {item.textIcon}
                  </span>
                )}
              </div>
              <span
                className={`text-[12px] md:text-[13px] text-center font-bold uppercase leading-snug tracking-tight ${
                  item.isActive ? 'text-[#0b5edd]' : 'text-gray-800 group-hover:text-[#0b5edd]'
                }`}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Options block giống nguyencongpc */}
      <div className='bg-white p-5 rounded-lg shadow-sm border border-gray-100 mb-4'>
        <div className='flex flex-col xl:flex-row items-start gap-4'>
          <span className='font-bold text-gray-800 whitespace-nowrap pt-1'>Chọn theo tiêu chí:</span>
          <div className='flex flex-wrap gap-3 flex-1'>
            {FILTER_CRITERIA.map((item, idx) => (
              <Select
                key={idx}
                defaultValue={item}
                className='w-auto min-w-[180px]'
                options={[{ value: item, label: item }]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sort Options block */}
      <div className='bg-white p-2 md:p-3 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4'>
        <div className='flex gap-2 md:gap-3 flex-wrap'>
          <button
            onClick={() => handleSortChange('price_asc')}
            className={`px-3 py-1.5 rounded text-[13px] border ${
              sortOrder === 'price_asc'
                ? 'border-primary text-primary bg-primary/5'
                : 'border-gray-200 text-gray-700 hover:border-gray-300'
            } flex items-center gap-1.5 transition whitespace-nowrap`}
          >
            <TrendingUp size={16} /> Giá tăng dần
          </button>
          <button
            onClick={() => handleSortChange('price_desc')}
            className={`px-3 py-1.5 rounded text-[13px] border ${
              sortOrder === 'price_desc'
                ? 'border-primary text-primary bg-primary/5'
                : 'border-gray-200 text-gray-700 hover:border-gray-300'
            } flex items-center gap-1.5 transition whitespace-nowrap`}
          >
            <TrendingDown size={16} /> Giá giảm dần
          </button>
          <button className='px-3 py-1.5 rounded text-[13px] border border-gray-200 text-gray-700 hover:border-gray-300 flex items-center gap-1.5 transition whitespace-nowrap sm:flex'>
            <MessageCircle size={16} /> Trao đổi
          </button>
          <button className='px-3 py-1.5 rounded text-[13px] border border-gray-200 text-gray-700 hover:border-gray-300 flex items-center gap-1.5 transition whitespace-nowrap sm:flex'>
            <Star size={16} /> Đánh giá
          </button>
          <button className='px-3 py-1.5 rounded text-[13px] border border-gray-200 text-gray-700 hover:border-gray-300 flex items-center transition whitespace-nowrap'>
            Tên A&rarr;Z
          </button>
        </div>

        <div className='hidden lg:flex items-center gap-2 pr-2'>
          <button className='p-1.5 bg-gray-100 text-gray-600 rounded hover:text-primary transition'>
            <LayoutGrid size={20} />
          </button>
          <button className='p-1.5 text-gray-400 hover:text-primary transition'>
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Product Grid Area (Full Width) */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4 min-h-[500px]'>
        <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4 mb-8'>
          {isLoading
            ? Array(10)
                .fill(0)
                .map((_, i) => <ProductCardSkeleton key={`sk-${i}`} />)
            : products.map((product) => <ProductCard key={product.id} product={product} />)}

          {!isLoading && products.length === 0 && (
            <div className='col-span-full py-20 text-center text-gray-500 font-medium'>
              Không có sản phẩm nào phù hợp với bộ lọc hiện tại.
            </div>
          )}
        </div>

        {!isLoading && products.length > 0 && (
          <div className='flex justify-center mt-6 mb-2 pt-6 border-t border-gray-100'>
            <Pagination defaultCurrent={1} total={products.length > 20 ? 50 : 0} showSizeChanger={false} />
          </div>
        )}
      </div>
    </div>
  )
}
