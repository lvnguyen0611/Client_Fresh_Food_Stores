import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Checkoutsteps from "./CheckoutSteps";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";
import Paypal from "./Paypal";

const Payment = ({ history }) => {
     const alert = useAlert();
     const dispatch = useDispatch();

     const { cartItems, shippingInfo } = useSelector((state) => state.cart);
     const { error } = useSelector((state) => state.newOrder);

     useEffect(() => {
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
     }, [dispatch, alert, error]);

     const order = {
          orderItems: cartItems,
          shippingInfo,
     };

     const payOffline = {
          status: "Thanh toán khi nhận hàng.",
     };

     const payOnline = {
          status: "Đã thanh toán",
     };

     const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

     const payoffline = (e) => {
          e.preventDefault();
          order["paymentInfo"] = payOffline;
          if (orderInfo) {
               order["itemsPrice"] = orderInfo.itemsPrice;
               order["shippingPrice"] = orderInfo.shippingPrice;
               order["totalPrice"] = orderInfo.totalPrice;
          }
          dispatch(createOrder(order));
          alert.success("Đặt hàng thành công");
          localStorage.clear();
          sessionStorage.clear();
          history.push("/");
          window.location.reload();
     };

     const payonline = () => {
          order["paymentInfo"] = payOnline;
          if (orderInfo) {
               order["itemsPrice"] = orderInfo.itemsPrice;
               order["shippingPrice"] = orderInfo.shippingPrice;
               order["totalPrice"] = orderInfo.totalPrice;
          }
          dispatch(createOrder(order));
          alert.success("Đặt hàng thành công");
          localStorage.clear();
          sessionStorage.clear();
          history.push("/");
          window.location.reload();
     };
     console.log(order);

     return (
          <Fragment>
               <MetaData title="thanh toán" />
               <Checkoutsteps shipping confirmOrder payment />
               <div className="row wrapper mb-5">
                    <div className="col-10 col-lg-5">
                         <form className="shadow-lg">
                              <h1 className="mb-4 text-center">Thanh Toán</h1>
                              <h5 className="mb-4  text-center">Chọn hình thức thanh toán</h5>
                              <div className="py-3">
                                   <Paypal
                                        paymentSuccess={payonline}
                                        price={(orderInfo.totalPrice / 22600).toFixed(2)}
                                   />
                              </div>
                              <button
                                   id="pay_btn_ofline"
                                   type="submit"
                                   className="btn btn-block"
                                   onClick={payoffline}
                              >
                                   Thanh Toán Khi Nhận Hàng
                              </button>
                         </form>
                    </div>
               </div>
          </Fragment>
     );
};

export default Payment;
