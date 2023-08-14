import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Myorders() {
  const [orderdata, setOrderdata] = useState({});

  const fetchMyOrder = async () => {
    await fetch("http://localhost:5000/api/myordersData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail')
      })
    }).then(async (res) => {
      let response = await res.json();
      await setOrderdata(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          {Object.keys(orderdata).length !== 0 ? orderdata.OrderData.order_data.map((data, index) => {
            const orderDate = data[0].Order_date;
            const items = data.slice(1);

            return (
              <div key={index}>
                {orderDate && (
                  <div className="m-auto mt-5">
                    {orderDate}
                    <hr />
                  </div>
                )}

                {items.map((arrayData, idx) => (
                  <div className="col-12 col-md-6 col-lg-3" key={idx}>
                    <div
                      className="card mt-3"
                      style={{ width: "16rem", maxHeight: "360px" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{arrayData.name}</h5>
                        <div
                          className="container w-100 p-0"
                          style={{ height: "38px" }}
                        >
                          <span className="m-1">{arrayData.qty}</span>
                          <span className="m-1">{arrayData.size}</span>
                          <span className="m-1">{orderDate}</span>
                          <div className=" d-inline ms-2 h-100 w-20 fs-5">
                            ₹{arrayData.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          }) : ""}
        </div>
      </div>
      <Footer />
    </div>
  );
}
