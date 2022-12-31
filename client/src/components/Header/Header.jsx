import React from 'react'
import { SearchOutlined, HomeOutlined, ShoppingCartOutlined, CopyOutlined, UserOutlined, BarChartOutlined, LogoutOutlined } from '@ant-design/icons';
import { Badge, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Toggle from '../ThemeToggle';
function Header() {
    const cart = useSelector((state) => state.cart);
    return (
        <div className='border-b mb-6'>
            <header className='py-4 px-6 flex justify-between items-center gap-10'>
                <div className='logo'>
                    <Link to='/'>
                        <h2 className='text-2xl font-bold md:text-4xl dark:text-white'>LOGO</h2>
                    </Link>
                </div>
                <div className='header-search flex-1 flex justify-center'>
                    <Input className='rounded-full max-w-[800px]' size='large' placeholder='Ürün Ara' prefix={<SearchOutlined />} />
                </div>
                <div className='menu-links flex justify-between items-center gap-7 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-1'>
                    <div className='menu-link flex flex-col'>
                        <Toggle />
                    </div>
                    <Link to="/" className='menu-link flex flex-col  hover:text-[#40a9ff] transition-all'>
                        <HomeOutlined className='md:text-2xl text-xl dark:text-white' />
                        <span className='md:text-xs text-[10px] dark:text-white'>Ana Sayfa</span>
                    </Link>
                    <Badge count={cart.cartItems.length} offset={[0, 6]} className="md:flex hidden">
                        <Link to="/cart" className='menu-link flex flex-col hover:text-[#40a9ff] transition-all'>
                            <ShoppingCartOutlined className='md:text-2xl text-xl dark:text-white' />
                            <span className='md:text-xs text-[10px] dark:text-white'>Sepet</span>
                        </Link>
                    </Badge>
                    <Link to="/invoice" className='menu-link flex flex-col hover:text-[#40a9ff] transition-all'>
                        <CopyOutlined className='md:text-2xl text-xl dark:text-white' />
                        <span className='md:text-xs text-[10px] dark:text-white'>Faturalar</span>
                    </Link>
                    <Link to="/customers" className='menu-link flex flex-col hover:text-[#40a9ff] transition-all'>
                        <UserOutlined className='md:text-2xl text-xl dark:text-white' />
                        <span className='md:text-xs text-[10px] dark:text-white'>Müşteriler</span>
                    </Link>
                    <Link to="/statistic" className='menu-link flex flex-col hover:text-[#40a9ff] transition-all'>
                        <BarChartOutlined className='md:text-2xl text-xl dark:text-white' />
                        <span className='md:text-xs text-[10px] dark:text-white'>İstatistikler</span>
                    </Link>
                    <Link href="/" className='menu-link flex flex-col hover:text-[#40a9ff] transition-all'>
                        <LogoutOutlined className='md:text-2xl text-xl dark:text-white' />
                        <span className='md:text-xs text-[10px] dark:text-white'>Çıkış</span>
                    </Link>
                </div>
                <Badge count={5} offset={[0, 6]} className="md:hidden flex">
                    <Link href="/" className='menu-link flex flex-col hover:text-[#40a9ff] transition-all'>
                        <ShoppingCartOutlined className='text-2xl' />
                        <span className='md:text-xs text-[10px]'>Sepet</span>
                    </Link>
                </Badge>
            </header>
        </div>
    )
}

export default Header