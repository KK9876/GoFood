import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";


const Home = () => {


      const [foodcat, setfoodcat] = useState([]);
      const [gofooddata, setgofooddata] = useState([]);
      const [search,setsearch] = useState("");


      const loaddata = async () => {
        let response = await fetch("http://localhost:5000/api/gofooddata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });


        response = await response.json();
        //displaying data from datadisplayjs and accessing array accordingly
        // console.log(response[0],response[1]);
        setgofooddata(response[0]);
        console.log(gofooddata);
        setfoodcat(response[1]);
      };
      

      useEffect(()=>{
        loaddata();
      },[])
      

  return (
    <div>

      <Navbar />

      {/* displaying caraosel */}

      <div>
        <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e)=>setsearch(e.target.value)}
              />
            </div>
          </div>

          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900x700/?burger"
              className="d-block w-100"
              alt="..."
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700/?pizza"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700/?food"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>


    {/* fetching data in card according to the data */}
      <div className="container">
      {
          foodcat!==[]
        ? foodcat.map((data)=>{
        
          return (
          <div className='row mb-3'>
            
            <div key={data._id} className="fs-3 m-3">
            {data.CategoryName}
            </div>

            <hr />

            {gofooddata!==[] 
            //after && check the item written in search
            ? gofooddata.filter((item)=>(item.CategoryName === data.CategoryName) && 
            (item.name.toLowerCase().includes(search.toLowerCase())))
            .map((filteritems) =>{
              return (

                <div key ={filteritems._id} className="col-12 col-md-6 col-lg-3">
                  <Card fooditem = {filteritems} options={filteritems.options[0]}></Card>
                </div>
                
              )}) 
            : <div>relevant data not found</div>}

          </div>)})
          :""
      }
        </div>
      
      <Footer />
    </div>
  );
};

export default Home;
