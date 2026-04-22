import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { FacebookOutlined, YoutubeOutlined, InstagramOutlined } from '@ant-design/icons'

interface FooterLinkSection {
  title: string
  links: { label: string; to: string }[]
}

interface SocialLink {
  icon: ReactNode
  href: string
  bgColor: string
}

const LINK_SECTIONS: FooterLinkSection[] = [
  {
    title: 'Khách hàng',
    links: [
      { label: 'Hướng dẫn mua hàng trực tuyến', to: '#' },
      { label: 'Hướng dẫn thanh toán', to: '#' },
      { label: 'Hướng dẫn mua hàng trả góp', to: '#' },
      { label: 'Tra cứu đơn hàng', to: '#' },
      { label: 'Góp ý, Khiếu nại', to: '#' }
    ]
  },
  {
    title: 'Chính sách',
    links: [
      { label: 'Chính sách quy định chung', to: '#' },
      { label: 'Chính sách bảo hành', to: '#' },
      { label: 'Chính sách đổi trả', to: '#' },
      { label: 'Bảo mật thông tin', to: '#' },
      { label: 'Giao hàng miễn phí', to: '#' }
    ]
  }
]

const SOCIAL_LINKS: SocialLink[] = [
  { icon: <FacebookOutlined />, href: '#', bgColor: 'bg-blue-600' },
  { icon: <YoutubeOutlined />, href: '#', bgColor: 'bg-red-600' },
  { icon: <InstagramOutlined />, href: '#', bgColor: 'bg-pink-600' }
]

function FooterLinkGroup({ title, links }: FooterLinkSection) {
  return (
    <div>
      <h3 className='font-bold text-lg mb-4 text-gray-800 uppercase'>{title}</h3>
      <ul className='space-y-2 text-sm text-gray-600'>
        {links.map(({ label, to }) => (
          <li key={label}>
            <Link to={to} className='hover:text-primary transition'>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterContact() {
  return (
    <div>
      <h3 className='font-bold text-lg mb-4 text-gray-800 uppercase'>Liên hệ</h3>
      <ul className='space-y-3 text-sm text-gray-600'>
        <li className='flex items-start gap-2'>
          <MapPin size={16} className='text-primary mt-1 shrink-0' />
          <span>377-379 Trương Định, Hoàng Mai, Hà Nội</span>
        </li>
        <li className='flex items-start gap-2'>
          <Phone size={16} className='text-primary mt-1 shrink-0' />
          <div>
            <span className='block font-bold'>Showroom: 1900 6666</span>
            <span className='block'>Bảo hành: 1900 6688</span>
          </div>
        </li>
        <li className='flex items-center gap-2'>
          <Mail size={16} className='text-primary' />
          <span>info@tranphongpc.vn</span>
        </li>
      </ul>
    </div>
  )
}

function FooterSocial() {
  return (
    <div>
      <h3 className='font-bold text-lg mb-4 text-gray-800 uppercase'>Kết nối với chúng tôi</h3>

      <div className='flex gap-4 mb-6'>
        {SOCIAL_LINKS.map(({ icon, href, bgColor }) => (
          <a
            key={bgColor}
            href={href}
            className={`w-10 h-10 ${bgColor} text-white rounded-full flex items-center justify-center hover:-translate-y-1 transition transform text-xl`}
          >
            {icon}
          </a>
        ))}
      </div>

      <div>
        <p className='text-sm font-bold text-gray-700 mb-2'>Đăng ký nhận tin khuyến mãi</p>
        <div className='flex'>
          <input
            type='email'
            placeholder='Nhập email của bạn'
            className='border border-gray-300 rounded-l-md px-3 py-2 text-sm w-full focus:outline-none focus:border-primary'
          />
          <button className='bg-primary text-white px-4 py-2 rounded-r-md text-sm hover:bg-red-700 transition'>
            Gửi
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className='bg-white pt-12 pb-6 border-t border-gray-200 mt-12'>
      <div className='container mx-auto px-4 max-w-[1240px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          {LINK_SECTIONS.map((section) => (
            <FooterLinkGroup key={section.title} {...section} />
          ))}
          <FooterContact />
          <FooterSocial />
        </div>

        <div className='border-t border-gray-200 pt-6 text-center text-sm text-gray-500'>
          <p>© {new Date().getFullYear()} Bản quyền thuộc về CÔNG TY TNHH MÁY TÍNH TRANPHONG</p>
        </div>
      </div>
    </footer>
  )
}
