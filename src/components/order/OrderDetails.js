import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetals, clearErrors } from "../../actions/orderActions";

const OrderDetails = ({ match }) => {
    const formatPrice = new Intl.NumberFormat("de");
     const dispatch = useDispatch();
     const alert = useAlert();
     const { loading, error, order = {} } = useSelector((state) => state.orderDetails);
     const { shippingInfo, orderItems, paymentInfo, user, totalPrice } = order

     useEffect(() => {
          dispatch(getOrderDetals(match.params.id));
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
     }, [dispatch, alert, error, match.params.id]);
     const shippingInfoDetails =
           shippingInfo &&
          `${shippingInfo.address}, ${shippingInfo.commune}, ${shippingInfo.district}, ${shippingInfo.city}`;

     return (
          <Fragment>
               <MetaData title="Chi tiết đặt hàng" />
               {loading ? (
                    <Loader />
               ) : (
                    <Fragment>
                         <div className="row d-flex justify-content-between">
                              <div className="col-12 col-lg-8 mt-5 order-details">
                                   <h3 className="my-5">Mã đơn hàng #{order && order._id}</h3>
                                   <h4 className="mb-4">Thông Tin Đơn Hàng</h4>
                                   <p>
                                        <b>Khách hàng: </b> {user && user.name}
                                   </p>
                                   <p>
                                        <b>Liên hệ: </b>
                                        {shippingInfo && shippingInfo.phoneNo}
                                   </p>
                                   <p className="mb-4">
                                        <b>Address: </b>
                                        {shippingInfoDetails}
                                   </p>
                                   <p>
                                        <b>Tổng hóa đơn:</b> {formatPrice.format(totalPrice)} VNĐ
                                   </p>

                                   <hr />
                                   <h4 className="my-4">Thanh toán</h4>
                                   <p className="greenColor">
                                        <b></b>
                                   </p>

                                   <h4 className="my-4">Trạng thái:</h4>
                                   <p
                                        className={
                                             order.orderStatus &&
                                             String(order.orderStatus).includes("Delivered")
                                                  ? "greenColor"
                                                  : "redColor"
                                        }
                                   >
                                        <b>{order.orderStatus}</b>
                                   </p>

                                   <h4 className="my-4">Sản phẩm:</h4>
                                   <hr />
                                   <div className="cart-item my-1">
                                        {orderItems &&
                                             orderItems.map((item) => (
                                                  <div className="row my-5" key={item.product}>
                                                       <div className="col-4 col-lg-2">
                                                            <img
                                                                 src={item.image}
                                                                 alt={item.name}
                                                                 height="45"
                                                                 width="65"
                                                            />
                                                       </div>

                                                       <div className="col-5 col-lg-5">
                                                            <Link to={`/product/${item.product}`}>
                                                                 {item.name}
                                                            </Link>
                                                       </div>

                                                       <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                            <p>{formatPrice.format(item.price)} VNĐ</p>
                                                       </div>

                                                       <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                            <p>{item.quantity}</p>
                                                       </div>
                                                  </div>
                                             ))}
                                   </div>
                                   <hr />
                              </div>
                         </div>
                    </Fragment>
               )}
          </Fragment>
     )
};

export default OrderDetails;
