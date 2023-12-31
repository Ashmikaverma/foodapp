import React,{useState,useRef,useEffect} from 'react'
import {useDispatchCart,useCart} from './ContextReducer';

export default function Card(props) {
  let options =props.options;
  let priceOptions=Object.keys(options);
  const priceRef=useRef();
  const [qty,setQty]=useState(1);
  const[size,setSize]=useState("")
  //let foodItem=props.foodItems;
  let data=useCart();
  let dispatch=useDispatchCart();
  const handleAddToCart = async () => {
    // Get the existing item in the cart based on _id
    const existingItem = data.find(item => item._id === props.foodItem._id);
  
    // Calculate the final price
    const finalPrice = qty * parseInt(options[size]);
  
    // Check if the item is already in the cart
    if (existingItem) {
      // Check if the size is different
      if (existingItem.size !== size) {
        // Update the existing item with a new size
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        console.log("Updated item with a new size");
      } else {
        // If size is the same, update the quantity and price
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        console.log("Updated quantity and price");
      }
    } else {
      // If the item is not in the cart, add a new item
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.foodItem.img, // Assuming img is a property of foodItem
      });
      console.log("Added a new item to the cart");
    }
  
    console.log(data);
  };
  
  //let finalPrice=qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  let finalPrice=qty*parseInt(options[size]);
  return (
    <div>
     <div className ="card mt-3" style={{"width": "18rem","maxHeight":"360 px"}}>
  <img src={props.foodItem.img} alt="..." style={{height:"150px",objectFit:"fill"}}/>
  <div className ="card-body">
    <h5 className ="card-title">{props.foodItem.name} </h5>
    <p className ="card-text"></p>
    <div className='container '>
        <select className='m-2 h-100 bg-success ' onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6),(e,i)=>{
                return(
                    <option key={i+1} value={i+1}> {i+1}</option>
                )
            })}
        </select>
        <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
        {priceOptions.map((data)=>{
return <option key={data} value={data}>{data}</option>
        })}


        </select>
        <div className='h-100 fs-5' >
        ₹{finalPrice}/-
        </div>
        <hr>

        </hr>
        <button className={"btn btn-success justify-center ms-2"} onClick={handleAddToCart}>Add  to Cart</button>
    </div>
    
  </div>
</div>
</div>
  )
}
