import React, { Fragment} from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFormCart } from "../../actions/cartActions";


function Cart({ history }) {
     const formatPrice = new Intl.NumberFormat("de");
     const dispatch = useDispatch();
     const { cartItems } = useSelector((state) => state.cart);

     const decreaseQty = (id, quantity ) => {
          const newQty = parseInt(quantity - 1);
          if (newQty <= 0) return;
          dispatch(addItemToCart(id, newQty));
     };

     const increaseQty = ( id, quantity, stock ) => {
          const newQty = parseInt(quantity + 1);
          if (newQty > stock) return;
          dispatch(addItemToCart(id, newQty))
     };

     const removeItemHandler = (id) => {
          dispatch(removeItemFormCart(id))
     };

     const checkoutHandler = () => {
          history.push("/login?redirect=shipping")
     }
     
     return (
          <Fragment>
               <MetaData title="Giỏ Hàng" />
               {cartItems.length === 0 ? (
                    <img src="../images/giohangrong.png" className="text-center col-6 offset-3" alt="gio hang rong"/>
               ) : (
                    <Fragment>
                         <h4 className="mt-5">
                              <b>Tất cả</b> ({cartItems.length})
                         </h4>
                         <div className="row d-flex justify-content-between">
                              <div className="col-12 col-lg-8">
                                   {cartItems.map((item) => (
                                        <Fragment>
                                             <hr />
                                             <div className="cart-item" key={item.product}>
                                                  <div className="row">
                                                       <div className="col-4 col-lg-3">
                                                            <img
                                                                 src={item.image}
                                                                 alt="Laptop"
                                                                 height="90"
                                                                 width="115"
                                                            />
                                                       </div>
                                                       <div className="col-5 col-lg-3">
                                                            <Link to={`/products/${item.product}`}>
                                                                 {item.name}
                                                            </Link>
                                                       </div>
                                                       <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                            <p id="card_item_price">
                                                                 {formatPrice.format(item.price)} đ
                                                            </p>
                                                       </div>
                                                       <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                            <div className="stockCounter d-inline">
                                                                 <span
                                                                      className="btn btn-danger minus"
                                                                      onClick={() =>
                                                                           decreaseQty(
                                                                                item.product,
                                                                                item.quantity
                                                                           )
                                                                      }
                                                                 >
                                                                      -
                                                                 </span>
                                                                 <input
                                                                      type="number"
                                                                      className="form-control count d-inline"
                                                                      value={item.quantity}
                                                                      readOnly
                                                                 />
                                                                 <span
                                                                      className="btn btn-primary plus"
                                                                      onClick={() =>
                                                                           increaseQty(
                                                                                item.product,
                                                                                item.quantity,
                                                                                item.stock
                                                                           )
                                                                      }
                                                                 >
                                                                      +
                                                                 </span>
                                                            </div>
                                                       </div>
                                                       <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                            <i
                                                                 id="delete_cart_item"
                                                                 className="fa fa-trash btn btn-danger"
                                                                 onClick={() =>
                                                                      removeItemHandler(
                                                                           item.product
                                                                      )
                                                                 }
                                                            ></i>
                                                       </div>
                                                  </div>
                                             </div>
                                        </Fragment>
                                   ))}
                              </div>
                              <div className="col-12 col-lg-3 my-4">
                                   <div id="order_summary">
                                        <h4>Tổng hóa đơn</h4>
                                        <hr />
                                        <p>
                                             Số lượng:{" "}
                                             <span className="order-summary-values">
                                                  {cartItems.reduce(
                                                       (acc, item) => acc + Number(item.quantity),
                                                       0
                                                  )}
                                                  &nbsp;(sản phẩm)
                                             </span>
                                        </p>
                                        <p>
                                             Tổng tiền:{" "}
                                             <span className="order-summary-values">
                                                  {formatPrice.format(
                                                       cartItems.reduce(
                                                            (acc, item) =>
                                                                 acc +
                                                                 Number(item.quantity * item.price),
                                                            0
                                                       )
                                                  )}
                                                  &nbsp; đồng
                                             </span>
                                        </p>

                                        <hr />
                                        <Link to="/" className="btn btn-danger btn-block">
                                             Tiếp Tục Mua
                                        </Link>
                                        <button
                                             id="checkout_btn"
                                             className="btn btn-primary btn-block"
                                             onClick={checkoutHandler}
                                        >
                                             Thanh Toán
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </Fragment>
               )}
          </Fragment>
     );
}

export default Cart;
