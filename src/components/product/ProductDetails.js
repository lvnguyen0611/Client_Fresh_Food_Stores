import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors, newReview } from "../../actions/productActions";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import { Carousel } from "react-bootstrap";
import MetaData from "../layout/MetaData";
import { addItemToCart } from "../../actions/cartActions";
import { Link } from "react-router-dom";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ListReview from "../review/ListReview";


const ProductDetails = ({ match }) => {
     const [quantity, setQuantity] = useState(1);
     const [rating, setRating] = useState(0);
     const [comment, setComment] = useState('');
     const dispatch = useDispatch();
     const alert = useAlert();
     const { loading, error, product } = useSelector((state) => state.productDetails);
     const { user } = useSelector((state) => state.auth);
     const { error:revewError, success } = useSelector((state) => state.newReview)
     const formatPrice = new Intl.NumberFormat("de");

     useEffect(() => {
          dispatch(getProductDetails(match.params.id));
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
          if (revewError) {
               alert.error(revewError);
               dispatch(clearErrors());
          }
          if (success) {
               alert.success("Đánh giá thành công");
               dispatch({
                    type: NEW_REVIEW_RESET,
               });
          }
     }, [dispatch, alert, error, revewError, success, match.params.id]);

     const addToCart = () => {
          dispatch(addItemToCart(match.params.id, quantity));
          alert.success("Đã thêm sản phẩm vào giỏ hàng");
     };

     const decreaseQty = () => {
          const count = document.querySelector(".count").value;
          if (parseInt(count) <= 1) return;
          const qty = parseInt(count) - 1;
          setQuantity(qty);
          // console.log(qty);
     };

     const increaseQty = () => {
          const count = document.querySelector(".count").value;
          if (parseInt(count) >= product.stock) return;
          const qty = parseInt(count) + 1;
          setQuantity(qty);
          // console.log(qty);
     };

     function setUserRating() {
          const stars = document.querySelectorAll('.star');
          stars.forEach((star, index) => {
               star.starValue = index + 1;
               [ 'click', 'mouseover', 'mouseout'].forEach(function (e) {
                    star.addEventListener(e, showRatings);
               })
          })

          function showRatings(e) {
               stars.forEach((star, index) => {
                    if (e.type === 'click') {
                         if(index < this.starValue) {
                              star.classList.add("yellow-true");
                              setRating(this.starValue)
                         } else {
                              star.classList.remove("yellow-true");
                         }
                    }
                    if (e.type === 'mouseover') {
                         if (index < this.starValue) {
                              star.classList.add('yellow');
                         } else {
                              star.classList.remove('yellow');
                         }
                    }
                    if (e.type === 'mouseout') {
                         star.classList.remove('yellow');
                    }
               });
          }
     }

     const reviewHandler = () => {
          const formData = new FormData();
          formData.set('rating', rating);
          formData.set("comment", comment);
          formData.set("productId", match.params.id);
          dispatch(newReview(formData));
     }

     return (
          <Fragment>
               {loading ? (
                    <Loader />
               ) : (
                    <Fragment>
                         <MetaData title={product.name} />
                         <div className="row f-flex justify-content-around">
                              <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                   <Carousel pause="hover">
                                        {product.images &&
                                             product.images.map((image) => (
                                                  <Carousel.Item key={image.public_id}>
                                                       <img
                                                            className="d-block w-100 carosel"
                                                            src={image.url}
                                                            alt={product.title}
                                                       />
                                                  </Carousel.Item>
                                             ))}
                                   </Carousel>
                              </div>
                              <div className="col-12 col-lg-5 mt-5">
                                   <h3>
                                        <b>{product.name}</b>
                                   </h3>
                                   <p id="product_id">Mã Sản Phẩm: {product._id}</p>
                                   <hr />
                                   <div className="rating-outer">
                                        <div
                                             className="rating-inner"
                                             style={{ width: `${(product.rating / 5) * 100}%` }}
                                        ></div>
                                   </div>
                                   <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                                   <hr />
                                   <p id="product_price">
                                        {formatPrice.format(product.price)} <b>đồng</b>
                                   </p>
                                   <div className="stockCounter d-inline">
                                        <span
                                             className="btn btn-danger minus"
                                             onClick={decreaseQty}
                                        >
                                             -
                                        </span>
                                        <span>
                                             <input
                                                  type="Text"
                                                  className="form-control count d-inline"
                                                  value={quantity}
                                                  readonly
                                             />
                                        </span>
                                        <span
                                             className="btn btn-primary plus"
                                             onClick={increaseQty}
                                        >
                                             +
                                        </span>
                                   </div>
                                   <button
                                        type="button"
                                        id="cart_btn"
                                        className="btn btn-primary d-inline ml-4"
                                        disabled={product.stock === 0}
                                        onClick={addToCart}
                                   >
                                        Mua
                                   </button>
                                   <Link to="/" className="btn btn-danger ml-3">
                                        Tiếp Tục Mua
                                   </Link>
                                   <hr />
                                   <p>
                                        Status:{" "}
                                        <span
                                             id="stock_status"
                                             className={
                                                  product.stock > 0 ? "greenColor" : "redColor"
                                             }
                                        >
                                             {product.stock > 0 ? "Còn Hàng" : "Hết Hàng"}
                                        </span>
                                   </p>
                                   <hr />
                                   <h4 className="mt-2">Chi Tiết:</h4>
                                   <p>{product.description}</p>
                                   <hr />
                                   {user ? (
                                        <button
                                             id="review_btn"
                                             type="button"
                                             className="btn btn-color mt-4"
                                             data-toggle="modal"
                                             data-target="#ratingModal"
                                             onClick={setUserRating}
                                        >
                                             Đánh Giá
                                        </button>
                                   ) : (
                                        <div className="alert alert-danger mt-5" type="alert">
                                             Vui lòng đăng nhập để đánh giá
                                        </div>
                                   )}
                                   <div className="row mt-2 mb-5">
                                        <div className="rating w-50">
                                             <div
                                                  className="modal fade"
                                                  id="ratingModal"
                                                  tabIndex="-1"
                                                  role="dialog"
                                                  aria-labelledby="ratingModalLabel"
                                                  aria-hidden="true"
                                             >
                                                  <div className="modal-dialog" role="document">
                                                       <div className="modal-content">
                                                            <div className="modal-header">
                                                                 <h5
                                                                      className="modal-title"
                                                                      id="ratingModalLabel"
                                                                 >
                                                                      Đánh Giá
                                                                 </h5>
                                                                 <button
                                                                      type="button"
                                                                      className="close"
                                                                      data-dismiss="modal"
                                                                      aria-label="Close"
                                                                 >
                                                                      <span aria-hidden="true">
                                                                           &times;
                                                                      </span>
                                                                 </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                 <ul className="stars">
                                                                      <li className="star">
                                                                           <i className="fa fa-star"></i>
                                                                      </li>
                                                                      <li className="star">
                                                                           <i className="fa fa-star"></i>
                                                                      </li>
                                                                      <li className="star">
                                                                           <i className="fa fa-star"></i>
                                                                      </li>
                                                                      <li className="star">
                                                                           <i className="fa fa-star"></i>
                                                                      </li>
                                                                      <li className="star">
                                                                           <i className="fa fa-star"></i>
                                                                      </li>
                                                                 </ul>
                                                                 <textarea
                                                                      name="review"
                                                                      id="review"
                                                                      className="form-control mt-3"
                                                                      value={comment}
                                                                      onChange={(e) =>
                                                                           setComment(
                                                                                e.target.value
                                                                           )
                                                                      }
                                                                 ></textarea>
                                                                 <button
                                                                      className="btn my-3 float-right review-btn px-4 text-white"
                                                                      data-dismiss="modal"
                                                                      aria-label="Close"
                                                                      onClick={reviewHandler}
                                                                 >
                                                                      Đánh giá
                                                                 </button>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </Fragment>
               )}
               {product.reviews && product.reviews.length > 0 && (
                    <ListReview reviews={product.reviews} />
               )}
          </Fragment>
     );
}

export default ProductDetails;
