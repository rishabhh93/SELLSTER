import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProductContext } from '../utils/Context'
import axios from '../utils/axios'
import Loading from './Loading'
import { toast } from 'react-toastify'

function Details() {
  const navigate = useNavigate();
  const [products1,setproducts1] = useContext(ProductContext);
  const [products,setproducts]= useState([]);
  const {id} = useParams();



  // const getsingleproduct=async()=>{
  //   try{
  //     const {data}=await axios(`products/${id}`);
  //     setproducts(data);
  //   }catch(error){
  //     console.log(error);
  //   }
  // }
  useEffect(()=>{
    if(products[0]===undefined){
      setproducts(products1.filter((p)=> p.id  ==  id)[0]);
    }
    // getsingleproduct();
  },[]);

  const productDeleteHandler=(id)=>{
    const filteredProducts = products1.filter((p)=>p.id !==id);
    setproducts1(filteredProducts);
    localStorage.setItem("products1",JSON.stringify(filteredProducts));
    toast.success("Product deleted successfully!");
    navigate("/");
  }
  return products ? ( 
    <div className='w-screen h-screen pl-50 flex p-20 items-center  justify-center '>
        <img  className="h-[60%] w-[50%] mt-10 object-contain  rounded-[30px]" src={products.image} alt="" />
        <div className=' w-[60%] ml-20 flex flex-col '>
                    <h1 className='p-3 text-4xl text-bold mt-5 text-5xl mb-10 mt-20'>{products.title}</h1>
                    <h3 className='p-3 text-2xl '>Category : {products.category}</h3>
                    <h2 className='p-3 text-xl text-green-500 font-bold'> Price : ${products.price}</h2>
                    <p className='p-3 text-xl'>{products.description}</p>
                    <Link to={`/edit/${products.id}`} className=' hover:scale-110 m-3 mt-10 p-3 w-20 bg-blue-500 text-white rounded-full text-s pl-6'>Edit</Link>
                    <button onClick={()=>productDeleteHandler(products.id )} className=' hover:scale-110 m-3 p-3 w-20 bg-red-500 text-white rounded-full text-s pl-4'>Delete</button>
        </div>
    </div>
  ):(
    <Loading></Loading>
  )
}

export default Details