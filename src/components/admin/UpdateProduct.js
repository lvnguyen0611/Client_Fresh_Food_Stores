import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProduct, getProductDetails } from "../../actions/productActions";
import Sidebar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = ({ match, history }) => {
     const [name, setName] = useState("");
     const [price, setPrice] = useState(0);
     const [description, setDescription] = useState("");
     const [category, setCategory] = useState("");
     const [stock, setStock] = useState(0);
     const [seller, setSeller] = useState("");
     const [images, setImages] = useState([]);

     const [oldImages, setOldImages] = useState([]);
     const [imagesPreview, setImagesRreview] = useState([]);

     const alert = useAlert();
     const dispatch = useDispatch();
     const { error, product } = useSelector((state) => state.productDetails);
     const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);
     const productId = match.params.id;

     const categories = [
          "chọn loại danh mục",
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

     useEffect(() => {
          if (product && product._id !== productId) {
               dispatch(getProductDetails(productId));
          } else {
               setName(product.name);
               setPrice(product.price);
               setDescription(product.description);
               setCategory(product.category);
               setStock(product.stock);
               setSeller(product.seller);
               setOldImages(product.images);
          }
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
          if (updateError) {
               alert.error(updateError);
               dispatch(clearErrors());
          }
          if (isUpdated) {
               history.push("/admin/products");
               alert.success("Cập nhật sản phẩm thành công");
               dispatch({ type: UPDATE_PRODUCT_RESET });
          }
     }, [dispatch, alert, error, isUpdated, updateError, history, product, productId]);

     const submitHandler = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.set("name", name);
          formData.set("price", price);
          formData.set("description", description);
          formData.set("category", category);
          formData.set("stock", stock);
          formData.set("seller", seller);
          images.forEach((image) => {
               formData.append("images", image);
          });
          dispatch(updateProduct(product._id, formData));
     };

     const onChangefile = (e) => {
          const files = Array.from(e.target.files);
          setImagesRreview([]);
          setImages([]);
          setOldImages([]);

          files.forEach((file) => {
               const reader = new FileReader();
               reader.onload = () => {
                    if (reader.readyState === 2) {
                         setImagesRreview((oldArray) => [...oldArray, reader.result]);
                         setImages((oldArray) => [...oldArray, reader.result]);
                    }
               };
               reader.readAsDataURL(file);
          });
     };

     return (
          <Fragment>
               <MetaData title="Admin - Cập nhật Sản phẩm" />
               <div className="row">
                    <div className="col-12 col-md-2">
                         <Sidebar />
                    </div>
                    <div className="col-12 col-md-10">
                         <Fragment>
                              <div className="wrapper my-5">
                                   <form
                                        className="shadow-lg"
                                        encType="multipart/form-data"
                                        onSubmit={submitHandler}
                                   >
                                        <h2 className="mb-4">Cập nhật Sản phẩm</h2>
                                        <table className="table-product">
                                             <tr>
                                                  <td>
                                                       <div className="form-group">
                                                            <label htmlFor="name_field">
                                                                 Tên Sản Phẩm
                                                            </label>
                                                            <input
                                                                 type="text"
                                                                 id="name_field"
                                                                 className="form-control"
                                                                 value={name}
                                                                 onChange={(e) =>
                                                                      setName(e.target.value)
                                                                 }
                                                            />
                                                       </div>
                                                  </td>
                                                  <td>
                                                       <div className="form-group">
                                                            <label htmlFor="price_field">Giá</label>
                                                            <input
                                                                 type="text"
                                                                 id="price_field"
                                                                 className="form-control"
                                                                 value={price}
                                                                 onChange={(e) =>
                                                                      setPrice(e.target.value)
                                                                 }
                                                            />
                                                       </div>
                                                  </td>
                                             </tr>
                                             <tr>
                                                  <td>
                                                       <div className="form-group">
                                                            <label htmlFor="seller_field">
                                                                 Người Nhập
                                                            </label>
                                                            <input
                                                                 type="text"
                                                                 id="seller_field"
                                                                 className="form-control"
                                                                 value={seller}
                                                                 onChange={(e) =>
                                                                      setSeller(e.target.value)
                                                                 }
                                                            />
                                                       </div>
                                                  </td>
                                                  <td>
                                                       <div className="form-group">
                                                            <label htmlFor="category_field">
                                                                 Loại
                                                            </label>
                                                            <select
                                                                 className="form-control"
                                                                 id="category_field"
                                                                 value={category}
                                                                 onChange={(e) =>
                                                                      setCategory(e.target.value)
                                                                 }
                                                            >
                                                                 {categories.map((category) => (
                                                                      <option
                                                                           key={category}
                                                                           value={category}
                                                                      >
                                                                           {category}
                                                                      </option>
                                                                 ))}
                                                            </select>
                                                       </div>
                                                  </td>
                                             </tr>
                                             <tr>
                                                  <td>
                                                       <div className="form-group">
                                                            <label htmlFor="stock_field">
                                                                 Số lượng
                                                            </label>
                                                            <input
                                                                 type="number"
                                                                 id="stock_field"
                                                                 className="form-control"
                                                                 value={stock}
                                                                 onChange={(e) =>
                                                                      setStock(e.target.value)
                                                                 }
                                                            />
                                                       </div>
                                                  </td>
                                                  <td rowSpan="2">
                                                       <div className="form-group">
                                                            <label htmlFor="description_field">
                                                                 Chi Tiết
                                                            </label>
                                                            <textarea
                                                                 className="form-control"
                                                                 id="description_field"
                                                                 rows="5"
                                                                 value={description}
                                                                 onChange={(e) =>
                                                                      setDescription(e.target.value)
                                                                 }
                                                            ></textarea>
                                                       </div>
                                                  </td>
                                             </tr>
                                             <tr>
                                                  <td>
                                                       <div className="form-group">
                                                            <label>Ảnh</label>

                                                            <div className="custom-file">
                                                                 <input
                                                                      type="file"
                                                                      name="product_images"
                                                                      className="custom-file-input"
                                                                      id="customFile"
                                                                      multiple
                                                                      onChange={onChangefile}
                                                                 />
                                                                 <label
                                                                      className="custom-file-label"
                                                                      htmlFor="customFile"
                                                                 >
                                                                      chọn ảnh
                                                                 </label>
                                                            </div>
                                                       </div>
                                                  </td>
                                             </tr>
                                             <tr>
                                                  <td>
                                                       {oldImages &&
                                                            oldImages.map((img) => (
                                                                 <img
                                                                      key={img}
                                                                      src={img.url}
                                                                      alt="image_updateProduct"
                                                                      className="mt-3 mr-2"
                                                                      width="55"
                                                                      height="52"
                                                                 />
                                                            ))}
                                                       {imagesPreview.map((img) => (
                                                            <img
                                                                 src={img}
                                                                 key={img}
                                                                 alt="image"
                                                                 className="mt-3 mr-2"
                                                                 width="55"
                                                                 height="52"
                                                            />
                                                       ))}
                                                  </td>
                                                  <td>
                                                       <button
                                                            id="login_button"
                                                            type="submit"
                                                            className="btn btn-block py-3"
                                                            disabled={loading ? true : false}
                                                       >
                                                            Cập nhật
                                                       </button>
                                                  </td>
                                             </tr>
                                        </table>
                                   </form>
                              </div>
                         </Fragment>
                    </div>
               </div>
          </Fragment>
     );
};

export default UpdateProduct;
