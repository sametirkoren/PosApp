import React from 'react'
import { SearchOutlined, HomeOutlined, ShoppingCartOutlined, CopyOutlined, UserOutlined, BarChartOutlined, LogoutOutlined } from '@ant-design/icons';
import { Badge, Input, message } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Toggle from '../ThemeToggle';
function Header({setSearch}) {
    const cart = useSelector((state) => state.cart);
    const {pathname} = useLocation();
    console.log(pathname);
    const navigate = useNavigate() 
    const logOut = () => {
        localStorage.removeItem("user");
        navigate("/login")
        message.success("Çıkış işlemi başarılı")
    }
    return (
        <div className='border-b mb-6'>
            <header className='py-4 px-6 flex justify-between items-center gap-10'>
                <div className='logo'>
                    <Link to='/'>
                        <h2 className='text-2xl font-bold md:text-4xl dark:text-white'>BATTIK.COM</h2>
                    </Link>
                </div>
                <div className='header-search flex-1 flex justify-center'>
                    <Input onClick={() => {
                        pathname !== "/" && navigate("/")
                    }} onChange={(e) => setSearch(e.target.value.toLowerCase())} className='rounded-full max-w-[800px]' size='large' placeholder='Ürün Ara' prefix={<SearchOutlined />} />
                </div>
                <div className='menu-links flex justify-between items-center gap-7 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-1'>
                    <div className='sm:hidden md:flex menu-link flex flex-col'>
                        <Toggle />
                    </div>
                    <Link to="/"  className={`menu-link ${pathname === "/" ? "!text-red-600" : "!text-brand-darkblue"}  hover:text-[#40a9ff] transition-all`}>
                        <HomeOutlined className='md:text-2xl text-xl dark:text-white' />
                        <span className='md:text-xs text-[10px] dark:text-white'>Ana Sayfa</span>
                    </Link>
                    <Badge count={cart.cartItems.length} offset={[0, 0]} className="md:flex hidden">
                        <Link to="/cart" className={`menu-link  ${pathname === "/cart" ? "!text-red-600" : "!text-brand-darkblue"} hover:text-[#40a9ff] transition-all`}>
                            <ShoppingCartOutlined className='md:text-2xl text-xl dark:text-white' />
                            <span className='md:text-xs text-[10px] dark:text-white'>Sepet</span>
                        </Link>
                    </Badge>
                    <Link to="/invoice" className={`menu-link ${pathname === "/invoice" ? "!text-red-600" : "!text-brand-darkblue"}  hover:text-[#40a9ff] transition-all`}>
                        <CopyOutlined className='md:text-2xl text-xl dark:text-white' />
                        <span className='md:text-xs text-[10px] dark:text-white'>Faturalar</span>
                    </Link>
                    <Link to="/customers" className={`menu-link ${pathname === "/customers" ? "!text-red-600" : "!text-brand-darkblue"} hover:text-[#40a9ff] transition-all`}>
                        <UserOutlined className='md:text-2xl text-xl dark:text-white' />
                        <span className='md:text-xs text-[10px] dark:text-white'>Müşteriler</span>
                    </Link>
                    <Link to="/statistic" className={`menu-link ${pathname === "/statistic" ? "!text-red-600" : "!text-brand-darkblue"}  hover:text-[#40a9ff] transition-all`}>
                        <BarChartOutlined className='md:text-2xl text-xl dark:text-white' />
                        <span className='md:text-xs text-[10px] dark:text-white'>İstatistikler</span>
                    </Link>
                    <div onClick={logOut}>
                        <Link className={`menu-link  hover:text-[#40a9ff] transition-all`}>
                            <LogoutOutlined className='md:text-2xl text-xl dark:text-white' />
                            <span className='md:text-xs text-[10px] dark:text-white'>Çıkış</span>
                        </Link>
                    </div>

                </div>
                <Badge count={cart.cartItems.length} offset={[0, 0]} className="md:hidden flex">
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