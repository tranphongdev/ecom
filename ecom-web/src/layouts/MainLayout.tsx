import { Outlet } from 'react-router-dom'
import Footer from '~/components/common/Footer'
import Header from '~/components/common/Header'
import NavigationBar from '~/components/common/NavigationBar'

export default function MainLayout() {
  return (
    <div className='flex flex-col min-h-screen bg-background text-secondary font-sans'>
      <Header />
      <NavigationBar />
      <main className='grow container mx-auto p-4 w-full max-w-[1240px]'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
