import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePageMeta } from '~/hooks/usePageMeta'

export default function NotFound() {
  const { t } = useTranslation()

  usePageMeta({
    title: t('seo.notFoundTitle'),
    description: t('notFound.message')
  })

  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4'>
      <div className='relative mb-8'>
        <h1 className='text-[160px] font-black text-gray-100 leading-none select-none animate-pulse'>
          404
        </h1>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='bg-primary/10 backdrop-blur-sm rounded-2xl px-8 py-4'>
            <span className='text-5xl font-black text-primary'>404</span>
          </div>
        </div>
      </div>

      <h2 className='text-2xl font-bold text-gray-800 mb-3'>{t('notFound.title')}</h2>
      <p className='text-gray-500 mb-8 max-w-md'>{t('notFound.message')}</p>

      <div className='flex gap-4'>
        <Link
          to='/'
          className='inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-hover transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5'
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/><polyline points='9 22 9 12 15 12 15 22'/></svg>
          {t('notFound.goHome')}
        </Link>
        <button
          onClick={() => window.history.back()}
          className='inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-bold border border-gray-200 hover:bg-gray-50 transition-all duration-200'
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><line x1='19' y1='12' x2='5' y2='12'/><polyline points='12 19 5 12 12 5'/></svg>
          {t('notFound.goBack')}
        </button>
      </div>

      <div className='mt-12 flex gap-2'>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className='w-2 h-2 rounded-full bg-primary/30 animate-bounce'
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}
