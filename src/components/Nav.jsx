import React, { useContext } from 'react'
import { ProductContext } from '../utils/Context.jsx';
import { Link } from 'react-router-dom';
function Nav() {
  const products = useContext(ProductContext);
  let distinct_cat= products[0] && products[0].reduce((acc,cv)=>[...acc,cv.category],[ ]);
  distinct_cat= [...new Set(distinct_cat)];
  return (
        <nav className='h-full w-[15%] bg-green-200 flex flex-col p-5 pt-10 '>
                <a  className='w-fit p-2 h-10 bg-green-700 text-white rounded-full mb-5 text-center hover:scale-105 ' href="/create">Add New Product</a>
                <hr className='w-full h-0.5 bg-green-950 mb-3' />
                <h1 className='text-2xl font-bold mb-5'>Categories</h1>
                <div className='mt-3 ml-5 flex flex-col gap-5'>
                  {distinct_cat.map((val,index)=> <Link key={index} to={`/?category=${val}`}className=' hover:bg-green-300 hover:scale-110 capitalize'>{index+1}.  {val} <br /></Link>)}
                </div>
        </nav>
  )
}

export default Nav