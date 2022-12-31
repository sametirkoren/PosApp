import React from 'react'
import Header from '../components/Header/Header'
import Edit from '../components/Products/Edit'

function ProductPage() {
  return (
    <>
        <Header/>
        <div className='px-6 h-screen'>
            <h1 className='text-4xl font-bold text-center mb-4 dark:text-white'>Ürünler</h1>
            <Edit />
        </div>
    </>
  )
}

export default ProductPage