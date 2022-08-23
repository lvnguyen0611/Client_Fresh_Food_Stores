import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateOrder, getOrderDetals } from "../../actions/orderActions";
import Sidebar from "./Sidebar";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";

const ProsessOrder = ({ history, match }) => {
     const formatPrice = new Intl.NumberFormat("de");
     const [status, setStatus] = useState("");
     const alert = useAlert();
     const dispatch = useDispatch();

     const { error, loading, order = {} } = useSelector((state) => state.orderDetails);
     const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order;
     const { error: updateError, isUpdated } = useSelector((state) => state.order);

     const orderId = match.params.id;

     useEffect(() => {
          dispatch(getOrderDetals(orderId));
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
          if (updateError) {
               alert.error(updateError);
               dispatch(clearErrors());
          }
          if (isUpdated) {
               alert.success("Cập nhật thành công !");
               dispatch({
                    type: UPDATE_ORDER_RESET,
               });
          }
     }, [dispatch, error, alert, updateError, isUpdated, orderId, history]);

     const updateOrderHandler = (id) => {
          const formData = new FormData();
          formData.set("status", status);
          dispatch(updateOrder(id, formData))
          history.push("/admin/orders");
     };

     const shippingInfoDetails =
          shippingInfo &&
          `${shippingInfo.address}, ${shippingInfo.commune}, ${shippingInfo.district}, ${shippingInfo.city}`;

     const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;

     return (
          <Fragment>
               <MetaData title="Admin - Cập nhật đơn hàng" />
               <div className="row">
                    <div className="col-12 col-md-2">
                         <Sidebar />
                    </div>
                    <div className="col-12 col-md-10">
                         <Fragment>
                              <h2 className="mt-4">
                                   <i className="fas fa-tags"></i>Cập nhật đơn hàng
                              </h2>
                              {loading ? (
                                   <Loader />
                              ) : (
                                   <Fragment>
                                        <div className="row d-flex justify-content-around">
                                             <div className="col-12 col-lg-7 order-details">
                                                  <h3 className="my-5">Đơn hàng #{order._id}</h3>
                                                  <h4 className="mb-4">Thông tin giao hàng</h4>
                                                  <p>
                                                       <b>Name: </b>
                                                       {user && user.name}
                                                  </p>
                                                  <p>
                                                       <b>Phone: </b>
                                                       { shippingInfo && shippingInfo.phoneNo}
                                                  </p>
                                                  <p className="mb-4">
                                                       <b>Địa chỉ: </b>
                                                       {shippingInfoDetails}
                                                  </p>
                                                  <p>
                                                       <b>Tổng tiền: </b>
                                                       {formatPrice.format(totalPrice)} đồng
                                                  </p>
                                                  <hr />
                                                  <h4 className="my-4">Thanh Toán</h4>
                                                  <p className="greenColor">
                                                       <b>{isPaid}</b>
                                                  </p>
                                                  <hr/>
                                                  <h4 h4className="my-4">Order Status:</h4>
                                                  <p
                                                       className={
                                                            order.orderStatus &&
                                                            String(order.orderStatus).includes(
                                                                 "Thành công"
                                                            )
                                                                 ? "greenColor"
                                                                 : "redColor"
                                                       }
                                                  >
                                                       <b>{orderStatus}</b>
                                                  </p>

                                                  <h4 className="my-4">Sản phẩm:</h4>
                                                  <hr />
                                                  <div className="cart-item my-1">
                                                       {orderItems &&
                                                            orderItems.map((item) => (
                                                                 <div
                                                                      className="row my-5"
                                                                      key={item.product}
                                                                 >
                                                                      <div className="col-4 col-lg-2">
                                                                           <img
                                                                                src={item.image}
                                                                                alt={item.name}
                                                                                height="45"
                                                                                width="65"
                                                                           />
                                                                      </div>

                                                                      <div className="col-5 col-lg-5">
                                                                           <Link
                                                                                to={`/product/${item.product}`}
                                                                           >
                                                                                {item.name}
                                                                           </Link>
                                                                      </div>

                                                                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                                           <p>{item.price}</p>
                                                                      </div>

                                                                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                                           <p>{item.quantity}</p>
                                                                      </div>
                                                                      <hr/>
                                                                 </div>
                                                            ))}
                                                  </div>
                                             </div>

                                             <div className="col-12 col-lg-3 mt-5">
                                                  <h4 className="my-4">Status</h4>

                                                  <div className="form-group">
                                                       <select
                                                            className="form-control"
                                                            name="status"
                                                            value={status}
                                                            onChange={(e) =>
                                                                 setStatus(e.target.value)
                                                            }
                                                       >
                                                            <option>thao tác</option>
                                                            <option value="Đang xử lí">
                                                                 Đang xử lí
                                                            </option>
                                                            <option value="Đang giao">
                                                                 Đang giao
                                                            </option>
                                                            <option value="Thành công">
                                                                 Thành công
                                                            </option>
                                                       </select>
                                                  </div>

                                                  <button
                                                       className="btn btn-primary btn-block"
                                                       onClick={() => updateOrderHandler(order._id)}
                                                  >
                                                       Cập nhật
                                                  </button>
                                             </div>
                                        </div>
                                   </Fragment>
                              )}
                         </Fragment>
                    </div>
               </div>
          </Fragment>
     );
};

export default ProsessOrder;
