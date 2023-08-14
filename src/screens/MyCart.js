import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import { useNavigate } from 'react-router-dom'

const MyCart = () => {
    
    let data = useCart();
    let dispatch = useDispatchCart();
    const navigate = useNavigate();

    if(data.length===0){
        return (
          <div>
            <Navbar />
            <div className="col-lg-7">
              <h5 className="mb-3">
                <div className="text-body" >
                  <div className="fas fa-long-arrow-alt-left me-2" onClick={()=>navigate("/")} style={{'color':"red"}}>
                  {"<--"}{" "} Add Food to your Cart
                </div>
                </div> 
              </h5>
              <hr />
            </div>
            Cart is Empty !!
          </div>
        );
    }

    let totalprice = data.reduce((total,food)=> total+food.price ,0);
    console.log(data);

    const handleCheckOut = async() =>{
      let userEmail = localStorage.getItem("userEmail");

      let response = await fetch("http://localhost:5000/api/orderData/",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({order_data:data, email:userEmail, order_date:new Date().toDateString()})
      }
    );
    if(response.status === 200){
      dispatch({type:'DROP'})
    }
  }

  return (
    <>
        <Navbar/>
        <div>

<section className="h-100 h-custom" style={{"background-color" : "#eee"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card">
          <div className="card-body p-4">

            <div className="row">

              <div className="col-lg-7">
                <h5 className="mb-3">
                  <div className="text-body">
                      <div className="fas fa-long-arrow-alt-left me-2" onClick={()=>navigate("/")} style={{'color':"red"}}>                      
                      {"<--"} Add more Food to your Cart
                      </div>
                  </div>
                </h5>
                <hr/>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="mb-1">MyCart</p>
                  </div>
                </div>
                
                <div>
                {data.map((food,index)=>{
                    return (
                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div className="ms-3">
                                <h2>
                                  <span>&#8226;</span>
                                </h2>
                              </div>

                              <div className="ms-3">
                                <h5>{food.name}</h5>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: "50px" }}>
                                <h5 className="fw-normal mb-0">{food.qty}</h5>
                              </div>
                              <div style={{ width: "50px" }}>
                                <h5 className="fw-normal mb-0">{food.size}</h5>
                              </div>
                              <div style={{ width: "80px" }}>
                                <h5 className="mb-0">{food.price}</h5>
                              </div>

                              <div>
                                <button btn btn-delete onClick={() =>dispatch({ type: "REMOVE", index: index })}>
                                  <h5 className="mb-0">delete item</h5>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );})}

                <div className='d-flex justify-content-between'>
                  <h4>
                    TotalPrice = {totalprice}
                  </h4>
                  
                <button btn btn-delete onClick={handleCheckOut} className='r-0'>
                   <h5 className="mb-0">CheckOut</h5>
                </button>
                </div>
            </div>
            </div>
            </div>
            </div>
            </div>
          </div>
        </div>
    </div>
</section>
        </div>
        <Footer/>
    </>
  )
}

export default MyCart