import React from 'react'
import { Link ,useNavigate } from 'react-router-dom'


const Navbar = () => {
  const Navigate = useNavigate();
  const handlelogout = () =>{
    localStorage.removeItem("authToken");
    Navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1 fst-italic" to="#">
          GoFood
        </Link>
        <button
          button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item ">
              <Link className="nav-link active fs-5" to="/">
                Home{" "}
              </Link>
            </li>

            {/* display the myorder section when we are logged in */}
            {localStorage.getItem("authToken") ? (
              <li className="nav-item ">
                <Link className="nav-link active fs-5" to="/myorders">
                  My Orders
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          {/* if not logged in show these options */}
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1 fs-5" to="/login">
                LogIn
              </Link>

              <Link className="btn bg-white text-success mx-1 fs-5 " to="/signup">
                Signup
              </Link>
            </div>
          ) : (
            <>
              <Link className="btn bg-white text-success mx-1 fs-5" to ="/mycart">
                MyCart
              </Link>
              <div
                className="btn bg-white text-danger mx-1 fs-5"
                onClick={handlelogout}
              >
                Log Out
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar
