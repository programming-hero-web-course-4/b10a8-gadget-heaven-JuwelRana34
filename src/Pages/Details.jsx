import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dataContext from "../datacontext/datacontext";
import Rating from "../Components/Rating/Rating";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { toast } from 'keep-react'
import { DocumentTitle } from "../pages";
function Details() {
  const { id } = useParams();
  const { datas ,setDatas, wishlist,setAddtoCart,AddtoCart,setWishlist } = useContext(dataContext);
  const [Details, setDetails] = useState("");


  useEffect(()=> {
    fetch("/public/data.json")
      .then((response) => response.json())
      .then((data) =>(setDatas(data)));
  },[setDatas]);

  const {
    product_title,
    product_image,
    price,
    availability,
    Specification,
    description,
    rating,
  } = Details;


  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  },[wishlist])

  useEffect(() => {
    localStorage.setItem('AddtoCart', JSON.stringify(AddtoCart))
  },[AddtoCart])


  DocumentTitle("Details | Gadget Heaven")



  const handelWishlist = (wishData)=>{
    
      if( !wishlist.some(itme => itme.product_id === wishData.product_id)){
        setWishlist([...wishlist, wishData])
        toast.success(`${wishData.product_title}  added to wishlist`)
      }else{
        toast.warning('already added wishlist')
      }
      

      
        
  }
  const handelAddToCart = (cart)=>{
    setAddtoCart([...AddtoCart, cart])
    toast.success(`${cart.product_title} added to Cart`)
  }


  useEffect(() => {
    const newdata = datas.find((data) => data.product_id === id);
    setDetails(newdata || []);
  }, [datas , id]);
 
  return (
    <div className=" relative  lg:bg-slate-100 z-20 py-10">
      <div className=" absolute  top-0  w-full -z-10  bg-[#9538e2] h-[80vh] md:h-[40vh]"></div>

      <div className="text-white text-center space-y-4 pt-4 w-1/2 mx-auto">
        <h1 className="text-2xl font-bold ">Product Details</h1>
        <p>
          Explore the latest gadgets that will take your experience to the next
          level. From smart devices to the coolest accessories, we have it all!
        </p>
      </div>

      <div className=" md:w-[80%] mx-auto  md:flex gap-5 bg-white p-5 border rounded-2xl mt-5">
        <div className="bg-base-200 p-5 rounded-lg">
          <img className="rounded-lg" src={product_image} alt="" />
        </div>
        <div className=" space-y-3">
          <h1 className=" text-2xl font-bold">{product_title}</h1>
          <h2 className=" font-semibold text-slate-500">price:${price} </h2>
          <button className="py-2 rounded-full px-4 font-semibold bg-[#eaf5e6] border-[#2f9c08e4] text-[#2f9c08e4]">
            {availability ? "In Stock" : "Out of Stock"}
          </button>
          <p>{description}</p>
          <div> <span className="text-lg font-semibold">Specification:</span> {
           Array.isArray(Specification) &&  Specification.map((item,index) =>{ return <p key={item}>{index + 1}. {item}</p>})

            }
            </div>
          <h1 className="flex  items-center space-x-3">
            Rating: <Rating rating={rating}></Rating>
            <span className="py-1 px-3 rounded-full bg-slate-200">
              {" "}
              {rating}
            </span>
          </h1>
          <div className="flex gap-5 items-center ">
            <Link
              className="py-2 px-3 bg-[#8d36d6] flex items-center justify-center rounded-full text-white font-semibold"
              onClick={()=>handelAddToCart(Details)}
            >
              Add to card
              <IoCartOutline className=" text-4xl p-2 " />
            </Link>
            <button className={` hover:scale-125 transition rounded-full focus:text-green-900  focus:bg-green-100`}>
              <CiHeart onClick={()=>handelWishlist(Details)} className="border  focus:bg-orange-400 rounded-full text-4xl font-bold  p-2 " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;