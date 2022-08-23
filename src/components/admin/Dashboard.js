import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { getAdminProducts } from "../../actions/productActions";
import { getAllOrder } from "../../actions/orderActions";
import { getAllUsers } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
     const formatPrice = new Intl.NumberFormat("de");
     const dispatch = useDispatch();
     const { products } = useSelector((state) => state.products);
     const { orders, totalAmount, loading } = useSelector((state) => state.allOrder);
     const { users } = useSelector((state) => state.allUsers);

     let outOfStock = 0;
     products.forEach((product) => {
          if (product.stock <= 5) {
               outOfStock += 1;
          }
     });

     useEffect(() => {
          document.getElementById("chat").style.display = "none";
          dispatch(getAdminProducts());
          dispatch(getAllOrder());
          dispatch(getAllUsers());
     }, [dispatch]);

     return (
          <Fragment>
               <div className="row">
                    <div className="col-12 col-md-2">
                         <Sidebar />
                    </div>

                    <div className="col-12 col-md-10">
                         <h1 className="my-4">
                              <i className="fas fa-chart-line"></i>Dashboard
                         </h1>
                         {loading ? (
                              <Loader />
                         ) : (
                              <Fragment>
                                   <MetaData title={"Admin Dashboard"} />
                                   <div className="row pr-4">
                                        <div className="col-xl-12 col-sm-12 mb-3">
                                             <div className="card text-white bg-primary o-hidden h-100">
                                                  <div className="card-body">
                                                       <div className="text-center card-font-size">
                                                            Tổng Doanh Thu
                                                            <br />{" "}
                                                            <b>{formatPrice.format(totalAmount)}</b>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="row pr-4">
                                        <div className="col-xl-3 col-sm-6 mb-3">
                                             <div className="card text-white bg-success o-hidden h-100">
                                                  <div className="card-body">
                                                       <div className="text-center card-font-size">
                                                            Sản Phẩm
                                                            <br />
                                                            <b>
                                                                 {products && products.length}
                                                            </b>{" "}
                                                       </div>
                                                  </div>
                                                  <Link
                                                       className="card-footer text-white clearfix small z-1"
                                                       to="/admin/products"
                                                  >
                                                       <span className="float-left">Chi tiết</span>
                                                       <span className="float-right">
                                                            <i className="fa fa-angle-right"></i>
                                                       </span>
                                                  </Link>
                                             </div>
                                        </div>

                                        <div className="col-xl-3 col-sm-6 mb-3">
                                             <div className="card text-white bg-danger o-hidden h-100">
                                                  <div className="card-body">
                                                       <div className="text-center card-font-size">
                                                            Orders
                                                            <br /> <b>{orders && orders.length}</b>
                                                       </div>
                                                  </div>
                                                  <Link
                                                       className="card-footer text-white clearfix small z-1"
                                                       to="/admin/orders"
                                                  >
                                                       <span className="float-left">Chi tiết</span>
                                                       <span className="float-right">
                                                            <i className="fa fa-angle-right"></i>
                                                       </span>
                                                  </Link>
                                             </div>
                                        </div>

                                        <div className="col-xl-3 col-sm-6 mb-3">
                                             <div className="card text-white bg-info o-hidden h-100">
                                                  <div className="card-body">
                                                       <div className="text-center card-font-size">
                                                            Users
                                                            <br /> <b>{users && users.length}</b>
                                                       </div>
                                                  </div>
                                                  <Link
                                                       className="card-footer text-white clearfix small z-1"
                                                       to="/admin/users"
                                                  >
                                                       <span className="float-left">Chi tiết</span>
                                                       <span className="float-right">
                                                            <i className="fa fa-angle-right"></i>
                                                       </span>
                                                  </Link>
                                             </div>
                                        </div>

                                        <div className="col-xl-3 col-sm-6 mb-3">
                                             <div className="card text-white bg-warning o-hidden h-100">
                                                  <div className="card-body">
                                                       <div className="text-center card-font-size">
                                                            Sản Phẩm Gần Hết
                                                            <br /> <b>{outOfStock}</b>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </Fragment>
                         )}
                    </div>
               </div>
          </Fragment>
     );
};

export default Dashboard;
