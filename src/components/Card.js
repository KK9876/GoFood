import React, { useEffect, useRef, useState } from "react";
import { useCart,useDispatchCart } from "./ContextReducer";

const Card = (props) => {

  let Options = props.options;
  let priceoptions =Object.keys(Options);
  let dispatch = useDispatchCart();
  let data = useCart();
  let priceref = useRef();

  const [qty ,setqty] = useState(1);
  const [size,setsize] =useState("");

  let finalprice = qty * parseInt(Options[size]);

  const handleAddToCart = async ()=>{

    let food = [];
    for(const item of data){
      if(item.id === props.fooditem._id){
        food=item;
        
        break;
      }
    }
    
    if(food !== [])
    {
      if(food.size === size){
//update the item requires changing of item,price and quantity but keeping the size same from both requests
      await dispatch({type:"UPDATE", id:props.fooditem._id,price:finalprice,qty:qty})
      return;
      }
    }

//adding a new item will take all new entities to be added
    else if(food.size!==size){
    await dispatch({type: "ADD",id: props.fooditem._id,name: props.fooditem.name,price: finalprice,qty:qty,size:size});
    return;
  }
  
//if initially it was completely empty 
  await dispatch({type: "ADD",id: props.fooditem._id,name: props.fooditem.name,price: finalprice,qty:qty,size:size});
}
  
  useEffect(()=>{
    setsize(priceref.current.value)
  },[])

  return (
    <div>
      <div
        className="card mt-3"
        style={{ width: "18rem", "maxHeight": "360px" }}
      >
        <img className="card-img-top" src={props.fooditem.img} alt="Card cap" style={{height:"150px" , objectFit:"fill"}}/>
        <div className="card-body">
          <h5 className="card-title">{props.fooditem.name}</h5>
          <div className="container w-100">

            <select className="m-2 h-100 rounded bg-success" onChange={(e) => setqty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
              {/*using ref bcz initially need to provide a default value */}
            <select className="m-2 h-100 rounded bg-success" ref={priceref} onChange={(e) => setsize(e.target.value)}>
              {priceoptions.map((data)=>{
                return <option key={data} value={data}>
                  {data}
                </option>
              })}
            </select>

            <div className="d-inline h-100 fs-5">Rs {finalprice}/-</div>
          </div>

          <hr/>
          <button className= "btn btn-success justify-center ms-2 "  onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
