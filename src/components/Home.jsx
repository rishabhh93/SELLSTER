import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav';
import { Link, useLocation } from 'react-router-dom';
import { ProductContext } from '../utils/Context.jsx';
import Loading from './Loading.jsx';
import axios from '../utils/axios';

function Home() {
    const [products] = useContext(ProductContext);
    const {search}=useLocation();
    const category=decodeURIComponent(search.split("=")[1]);
    
    const [filteredProducts,setfilteredProducts] = useState(null);
    /*const getproductscategory=async()=>{
        try{
            const {data}=await axios.get(`/products/category/${category}`);
            setfilteredProducts(data);
        } catch(e){
            console.log(e);
        }
    }*/
    useEffect(() => { 
        if (!category || category === 'undefined') { 
            setfilteredProducts(products); 
        } else { 
            setfilteredProducts(products.filter((p)=>p.category==category));

           // getproductscategory(); 
        } }, [category, products]);

    return products ? (
    <>
        <Nav></Nav>
        <div className=' mt-20 p-5 pl-10 h-[100%] w-[85%] flex flex-wrap gap-5 gap-x-8 align-center overflow-x-hidden overflow-y-auto'>
            {filteredProducts && filteredProducts.map((val,index)=>(
                <Link key={index} to={`/details/${val.id}`} className='overflow-hidden w-[18%] h-[30%]  border-2 border-zinc-200 hover:shadow-lg'>
                        <div className=' overflow-hidden h-full w-full bg-white'>
                            <div className='w-full h-[65%] '>
                                <img className=" hover:scale-105 w-full h-full object-contain"src={val.image} alt="" />
                            </div>
                            <h1 className='text-xl text-bold mt-5 ml-4'>{val.title}</h1>
                        </div>

                </Link>))}
            
        </div>
    </>
    ):(
        <Loading></Loading>
    )
}
export default Home;