import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = ({ history }) => {
     const formatPrice = new Intl.NumberFormat("de");
     const { cartItems, shippingInfo } = useSelector((state) => state.cart);
     const { user } = useSelector((state) => state.auth);
     //-----------------------------------------------------
     const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
     const shippingPrice = itemsPrice > 200000 ? 0 : 15000;
     const totalPrice = itemsPrice + shippingPrice;

     const processToPayment = () => {
          const data = {
               itemsPrice,
               shippingPrice,
               totalPrice,
          };
          sessionStorage.setItem("orderInfo", JSON.stringify(data));
          history.push("/payment");
     };

     return (
          <Fragment>
               <MetaData title="xác nhận thông tin" />
               <CheckoutSteps shipping confirmOrder />
               <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-confirm">
                         <h4 className="mb-3">
                              <b>Thông tin giao hàng</b>
                         </h4>
                         <p>
                              <b>Tên: </b>
                              {user && user.name}
                         </p>
                         <p>
                              <b>SĐT: </b>
                              {shippingInfo.phoneNo}
                         </p>
                         <p className="mb-4">
                              <b>Địa chỉ: </b>
                              {`${shippingInfo.address}, ${shippingInfo.commune}, ${shippingInfo.district}, ${shippingInfo.city}`}
                         </p>
                         <p>
                              <p className="mb-4">
                                   <b>Ngày giao: </b>
                                   {shippingInfo.dateShip}
                              </p>
                         </p>
                         <hr />
                         <h4 className="mt-4">
                              <b>Sản phẩm</b>
                         </h4>
                         <hr />
                         {cartItems.map((item) => (
                              <Fragment>
                                   <div className="cart-item my-1" key={item.product}>
                                        <div className="row">
                                             <div className="col-4 col-lg-2">
                                                  <img
                                                       src={item.image}
                                                       alt="sp"
                                                       height="45"
                                                       width="65"
                                                  />
                                             </div>
                                             <div className="col-5 col-lg-6">
                                                  <Link to={`/product/${item.product}`}>
                                                       {item.name}
                                                  </Link>
                                             </div>
                                             <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                                  <p>
                                                       {item.quantity} x{" "}
                                                       {formatPrice.format(item.price)} ={" "}
                                                       <b>
                                                            {formatPrice.format(
                                                                 item.quantity * item.price
                                                            )}{" "}
                                                            đồng
                                                       </b>
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                                   <hr />
                              </Fragment>
                         ))}
                    </div>

                    <div className="col-12 col-lg-3 my-4">
                         <div id="order_summary">
                              <h4>Tổng hóa đơn</h4>
                              <hr />
                              <p>
                                   Tổng tiền:{" "}
                                   <span className="order-summary-values">
                                        {formatPrice.format(itemsPrice)} đồng
                                   </span>
                              </p>
                              <p>
                                   Phí giao hàng:{" "}
                                   <span className="order-summary-values">
                                        {formatPrice.format(shippingPrice)} đồng
                                   </span>
                              </p>
                              <hr />
                              <p>
                                   Thành tiền:{" "}
                                   <span className="order-summary-values">
                                        {formatPrice.format(totalPrice)} đồng
                                   </span>
                              </p>
                              <hr />
                              <button
                                   id="checkout_btn"
                                   className="btn btn-primary btn-block"
                                   onClick={processToPayment}
                              >
                                   Thanh Toán
                              </button>
                         </div>
                    </div>
               </div>
          </Fragment>
     );
};

export default ConfirmOrder;
