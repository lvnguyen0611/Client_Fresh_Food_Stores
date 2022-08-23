import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts, clearErrors, deleteProduct } from "../../actions/productActions";
import Sidebar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = ({ history }) => {
     const formatPrice = new Intl.NumberFormat("de");
     const alert = useAlert();
     const dispatch = useDispatch();
     const { loading, error, products } = useSelector((state) => state.products);
     const { error: deleteError, isDeleted } = useSelector((state) => state.product);

     useEffect(() => {
          dispatch(getAdminProducts());
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
          if (deleteError) {
               alert.error(deleteError);
               dispatch(clearErrors());
          }
          if (isDeleted) {
               alert.success("Xóa sản phẩm thành công");
               history.push("/admin/products");
               dispatch({ type: DELETE_PRODUCT_RESET })
          }
     }, [dispatch, alert, error, isDeleted, deleteError, history ]);

     const setProducts = () => {
          const data = {
               columns: [
                    {
                         label: "Mã sản phẩm",
                         field: "id",
                         sort: "asc",
                    },
                    {
                         label: "Tên sản phẩm",
                         field: "name",
                         sort: "asc",
                    },
                    {
                         label: "Giá",
                         field: "price",
                         sort: "asc",
                    },
                    {
                         label: "Số lượng",
                         field: "stock",
                         sort: "asc",
                    },
                    {
                         label: "Thao tác",
                         field: "action",
                    },
               ],
               rows: [],
          };
          products.forEach((product) => {
               data.rows.push({
                    id: product._id,
                    name: product.name,
                    price: formatPrice.format(product.price),
                    stock: product.stock,
                    action: (
                         <Fragment>
                              <Link
                                   to={`/admin/product/${product._id}`}
                                   className="btn btn-primary py-1 px-2"
                              >
                                   <i className="fa fa-pencil"></i>
                              </Link>
                              <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                                   <i className="fa fa-trash"></i>
                              </button>
                         </Fragment>
                    ),
               });
          });
          return data;
     };

     const deleteProductHandler = (id) => {
          dispatch(deleteProduct(id));
     }
     return (
          <Fragment>
               <MetaData title="Admin - Sản phẩm" />
               <div className="row">
                    <div className="col-12 col-md-2">
                         <Sidebar />
                    </div>
                    <div className="col-12 col-md-10">
                         <Fragment>
                              <h2 className="mt-4"><i className="fas fa-tags"></i>Tất cả sản phẩm</h2>
                              {loading ? (
                                   <Loader />
                              ) : (
                                   <MDBDataTableV5
                                        data={setProducts()}
                                        className="px-3"
                                        striped
                                        hover
                                        small
                                        searchTop
                                        searchBottom={false}
                                        barReverse
                                   />
                              )}
                         </Fragment>
                    </div>
               </div>
          </Fragment>
     );
};
export default ProductList;
