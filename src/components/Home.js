import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

//.........................................................................................................

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
     const [currentPage, setCurrentPage] = useState(1);
     const [category, setcategory] = useState("");
     const [price, setPrice] = useState([10000, 5000000]);
     const [rating, setRating] = useState(0);
     const categories = [
          "Thịt",
          "Cá",
          "Trứng",
          "Rau",
          "Trái Cây",
          "Gia Vị",
          "Gạo",
          "Thức Uống",
          "Dụng Cụ Nhà Bếp",
     ];

     const alert = useAlert();
     const disptach = useDispatch();

     const { loading, products, error, productsCount, resPerPage, filteredProductsCount } =
          useSelector((state) => state.products);

     const keyword = match.params.keyword;

     useEffect(() => {
          document.getElementById("chat").style.display = "block";
          if (error) {
               return alert.error(error);
          }
          disptach(getProducts(keyword, currentPage, price, category, rating));
     }, [disptach, alert, error, keyword, currentPage, price, category, rating]);

     function setCurrentPageNo(pageNumber) {
          setCurrentPage(pageNumber);
     }

     let count = productsCount;
     if (keyword) {
          count = filteredProductsCount;
     }
     const showmenu = () => {
          document.getElementById('menu-right').style.display = "block";
          document.getElementById("btn-menu-right").style.display = "none";
     };
     const closemenu = () => {
          document.getElementById("menu-right").style.display = "none";
          document.getElementById("btn-menu-right").style.display = "block";   
     }
     return (
          <Fragment>
               {loading ? (
                    <Loader />
               ) : (
                    <Fragment>
                         <MetaData title={"Sản phẩm bán chạy nhất"} />
                         <hr />
                         <h2 className="banner-name">Các sản phẩm thiết yếu</h2>
                         <hr />
                         <section id="products" className="container"></section>
                         <div className="row">
                              <Fragment>
                                   <button
                                        className="btn menu-mobi"
                                        onClick={showmenu}
                                        id="btn-menu-right"
                                   >
                                        <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="20"
                                             height="20"
                                             fill="currentColor"
                                             class="bi bi-list"
                                             viewBox="0 0 16 16"
                                        >
                                             <path
                                                  fill-rule="evenodd"
                                                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                             />
                                        </svg>
                                   </button>
                                   <div className="col col-lg-2 mt-5 mb-5" id="menu-right">
                                        <button
                                             className="btn-danger btn-exit-menu-right"
                                             onClick={closemenu}
                                             id="exit-menu-right"
                                        >
                                             <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16"
                                                  height="16"
                                                  fill="currentColor"
                                                  class="bi bi-x"
                                                  viewBox="0 0 16 16"
                                             >
                                                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                             </svg>
                                        </button>
                                        <div className="px-5 mt-5">
                                             <Range
                                                  marks={{
                                                       10000: `10.000đ`,
                                                       5000000: `5.000.000đ`,
                                                  }}
                                                  min={10000}
                                                  max={5000000}
                                                  step={5000}
                                                  defaultValue={[10000, 5000000]}
                                                  tipFormatter={(value) => `${value}đ`}
                                                  tipProps={{
                                                       placement: "top",
                                                       visible: true,
                                                  }}
                                                  value={price}
                                                  onChange={(price) => setPrice(price)}
                                             />
                                        </div>
                                        <hr className="my-css" />
                                        <div>
                                             <h4 className="mb-3">Danh Mục</h4>
                                             <hr />
                                             <ul className="pl-0">
                                                  {categories &&
                                                       categories.map((category) => (
                                                            <li
                                                                 style={{
                                                                      cursor: "pointer",
                                                                      listStyle: "none",
                                                                 }}
                                                                 key={category}
                                                                 onClick={() =>
                                                                      setcategory(category)
                                                                 }
                                                            >
                                                                 {category}
                                                            </li>
                                                       ))}
                                             </ul>
                                        </div>
                                        <hr />
                                        <div>
                                             <h4 className="mb-3">Đánh Giá</h4>
                                             <hr />
                                             <ul className="pl-0">
                                                  {[5, 4, 3, 2, 1].map((star) => (
                                                       <li
                                                            style={{
                                                                 cursor: "pointer",
                                                                 listStyle: "none",
                                                            }}
                                                            key={star}
                                                            onClick={() => setRating(star)}
                                                       >
                                                            <div className="rating-outer">
                                                                 <div
                                                                      className="rating-inner"
                                                                      style={{
                                                                           width: `${star * 20}%`,
                                                                      }}
                                                                 ></div>
                                                            </div>
                                                       </li>
                                                  ))}
                                             </ul>
                                        </div>
                                   </div>
                                   <div className="col">
                                        <div className="row">
                                             {products &&
                                                  products.map((product) => (
                                                       <Product
                                                            key={product._id}
                                                            product={product}
                                                            col={3}
                                                       />
                                                  ))}
                                        </div>
                                   </div>
                              </Fragment>
                         </div>
                         {resPerPage <= count && (
                              <div className="d-flex justify-content-center">
                                   <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resPerPage}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText={">"}
                                        prevPageText={"<"}
                                        firstPageText={"<<"}
                                        lastPageText={">>"}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                   />
                              </div>
                         )}
                    </Fragment>
               )}
          </Fragment>
     );
};
export default Home;
