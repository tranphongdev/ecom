import type { LucideIcon } from 'lucide-react'
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

interface FeaturedProduct {
  name: string
  price: string
  image: string
  link: string
}

interface MegaMenuData {
  popularCategories: string[]
  brands: string[]
  featuredProducts: FeaturedProduct[]
}

interface CategoryItem {
  id: string
  name: string
  icon: LucideIcon
  path: string
  megaMenu?: MegaMenuData
}

const MEGA_MENU_PC: MegaMenuData = {
  popularCategories: ['Phân khúc cao cấp', 'Phân khúc tầm trung', 'Giá rẻ sinh viên', 'Hàng mới về'],
  brands: ['ASUS', 'MSI', 'GIGABYTE', 'DELL'],
  featuredProducts: [
    {
      name: 'Sản phẩm cao cấp hiệu năng vượt trội',
      price: '25.990.000đ',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=150&q=80',
      link: '/products'
    }
  ]
}

const CATEGORIES: CategoryItem[] = [
  { id: 'pc-new', name: 'PC Mới, PC Khuyến Mãi', icon: MonitorPlay, path: '/laptop', megaMenu: MEGA_MENU_PC },
  { id: 'components', name: 'Linh Kiện Máy Tính', icon: Cpu, path: '/linh-kien-may-tinh' },
  { id: 'monitors', name: 'Màn hình máy tính', icon: Monitor, path: '/man-hinh-may-tinh' },
  { id: 'laptops', name: 'Laptop, Máy Tính Xách Tay', icon: Laptop, path: '/laptop', megaMenu: MEGA_MENU_PC },
  { id: 'storage', name: 'Ổ Cứng SSD, HDD', icon: HardDrive, path: '/linh-kien-may-tinh' },
  { id: 'keyboards', name: 'Bàn Phím Máy Tính', icon: Keyboard, path: '/phim-chuot-ghe-gear' },
  { id: 'mice', name: 'Chuột, Lót Chuột', icon: MousePointer2, path: '/phim-chuot-ghe-gear' },
  { id: 'audio', name: 'Tai Nghe, Loa', icon: Headphones, path: '/phim-chuot-ghe-gear' }
]

const MENU_ITEM_CLASS = 'hover:text-primary cursor-pointer transition'

function MegaMenuColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className='w-[200px]'>
      <h3 className='font-bold mb-3 text-sm uppercase border-b border-gray-100 pb-2 text-gray-800'>{title}</h3>
      <ul className='space-y-2.5 text-[13px] text-gray-600'>
        {items.map((item) => (
          <li key={item} className={MENU_ITEM_CLASS}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FeaturedProductCard({ product }: { product: FeaturedProduct }) {
  return (
    <Link
      to={product.link}
      className='flex gap-3 items-center bg-white p-2 rounded border border-gray-100 hover:border-primary cursor-pointer transition group/item'
    >
      <img src={product.image} className='w-12 h-12 object-cover rounded' alt={product.name} />
      <div>
        <div className='text-xs font-medium line-clamp-2 leading-tight text-gray-700 group-hover/item:text-primary transition-colors'>
          {product.name}
        </div>
        <div className='text-primary font-bold text-[13px] mt-1'>{product.price}</div>
      </div>
    </Link>
  )
}

function MegaMenu({ data }: { data: MegaMenuData }) {
  return (
    <div className='hidden group-hover/sidebarItem:flex absolute left-full top-0 bottom-0 min-h-full w-[800px] bg-white shadow-card-hover rounded-r-md border border-gray-100 p-6 z-50 origin-left animate-fade-in gap-8 cursor-default'>
      <MegaMenuColumn title='DANH MỤC PHỔ BIẾN' items={data.popularCategories} />
      <MegaMenuColumn title='THƯƠNG HIỆU' items={data.brands} />

      <div className='flex-1 bg-gray-50 p-4 rounded-md'>
        <h3 className='font-bold mb-3 text-sm border-b border-gray-200 pb-2 text-gray-800'>Sản phẩm nổi bật</h3>
        <div className='flex flex-col gap-3'>
          {data.featuredProducts.map((product) => (
            <FeaturedProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CategorySidebar() {
  return (
    <div className='bg-white rounded-b-md shadow-card-hover w-[280px] shrink-0 border border-t-0 border-gray-100 absolute top-full left-0 z-50 animate-fade-in origin-top'>
      <ul className='flex flex-col bg-white py-2 relative'>
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          return (
            <li key={cat.id} className='px-5 hover:bg-gray-50 group/sidebarItem transition-colors cursor-pointer'>
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

                {cat.megaMenu && (
                  <ChevronRight
                    size={14}
                    className='text-gray-300 group-hover/sidebarItem:text-primary transition-colors'
                  />
                )}
              </Link>

              {cat.megaMenu && <MegaMenu data={cat.megaMenu} />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
