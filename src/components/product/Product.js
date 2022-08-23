import React from "react";
import { Link } from "react-router-dom";

export const Product = ({ product, col }) => {
  const formatPrice = new Intl.NumberFormat('de');
  return (
       <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card h-100">
                 <img
                      className="card-img-top mx-auto"
                      src={product.images[0].url}
                      alt="product_image"
                 />
                 <div className="card-body">
                      <h5 className="card-title">
                           <Link to={`/product/${product._id}`}>{product.name}</Link>
                      </h5>
                      <div className="card-text">
                           <div className="ratings mt-auto">
                                <div className="rating-outer">
                                     <div
                                          className="rating-inner"
                                          style={{ width: `${(product.rating / 5) * 100}%` }}
                                     ></div>
                                </div>
                                <span id="no_of_reviews">({product.numOfReviews} review)</span>
                           </div>
                      </div>
                      <div className="card-text gia">
                           <b>Giá: {formatPrice.format(product.price)} đồng</b>
                      </div>
                      <Link to={`/product/${product._id}`} className="btn btn-color">
                           Chi Tiết
                      </Link>
                 </div>
            </div>
       </div>
  );
};
export default Product;
