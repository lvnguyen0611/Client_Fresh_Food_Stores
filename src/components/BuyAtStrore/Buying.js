import React, { Fragment, useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../admin/Sidebar";
import { clearErrors, getAdminProducts } from "../../actions/productActions";
import { MDBDataTableV5 } from "mdbreact";
import { createOrder} from "../../actions/orderActions";

const Buying = ({ history }) => {
     const formatPrice = new Intl.NumberFormat("de");
     const { loading, error, products } = useSelector((state) => state.products);
     const dispatch = useDispatch();
     const alert = useAlert();
     const [arrayItem] = useState([]);

     useEffect(() => {
          document.getElementById("chat").style.display = "none";
          dispatch(getAdminProducts());
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
     }, [dispatch, alert, error, history]);


     // orderItems, 
     // shippingInfo, 
     // itemsPrice, 
     // shippingPrice, 
     // totalPrice, 
     // paymentInfo;

     const orderAtStore = {}

     const shippingInfo = {
          address: "at store",
          commune: "at store",
          district: "at store",
          city: "at store",
          phoneNo: "at store",
          dateShip: "01/01/2021",
     };
             

     const payOffline = {
          status: "Thanh toán thành công",
     };

     const thanhtoan = (e) => {
          e.preventDefault();
          let tongPrice = 0;
          arrayItem.forEach((item) => {
               tongPrice = tongPrice + item.price * item.quantity;
          });
          orderAtStore["paymentInfo"] = payOffline;
          orderAtStore["itemsPrice"] = tongPrice;
          orderAtStore["shippingPrice"]= 0;
          orderAtStore["totalPrice"] = tongPrice;
          orderAtStore["shippingInfo"] = shippingInfo;
          orderAtStore["orderItems"] = arrayItem;
          orderAtStore["orderStatus"] = "Thành công";
          dispatch(createOrder(JSON.stringify(orderAtStore)));
          localStorage.clear();
          sessionStorage.clear();
          window.location.reload();
          alert.success("Thành công");
     }

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
                         label: "Còn",
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
                              <button
                                   className="btn btn-primary"
                                   onClick={() => AddProduct(product._id, product.name, product.price, product.images[0].url)}
                                   //onClick={() => test(product)}
                              >
                                   <i className="fas fa-plus"></i>
                              </button>
                         </Fragment>
                    ),
               });
          });
          return data;
     };

     // const test = (product) => {
     //      console.log(product.images[0].url)
     // // }

     const nameExists = (name) => {
          return arrayItem.some(function(el){
               return el.name === name;
          });
     }

     const arrayRemove = (value) => {
          for(let j = 0; j<arrayItem.length; j++) {
               if(arrayItem[j].name === value){
                    arrayItem.splice(j, 1);
               }
          }
     }

     // const obj = {
     //      name:"",
     //      price:0,
     //      soluong:0,
     // };

     const AddProduct = (product, name, price, image) => {
          if(nameExists(name)) {
               let item = arrayItem.find((o) => o.name === name);
               let soluong = item.quantity + 1
               arrayRemove(name);
               arrayItem.push({
                    product: product,
                    name: name,
                    price: price,
                    image: image,
                    quantity: soluong,
               });
          } else {
               arrayItem.push({
                    product: product,
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1,
               });
          }    
          deleteAndPrint()
          tinhtong()
          console.log(arrayItem);
     };

     const tinhtong = () => {
          let tong = 0
          arrayItem.forEach((item) => {
               tong = tong + (item.price * item.quantity);
          });
          document.getElementById("tongtien").innerHTML = formatPrice.format(tong);
     }

     const deleteAndPrint = () => {
          deleteRows();
          arrayItem.forEach((item) => {
               printTable(item.name, item.quantity, item.price, item.price * item.quantity);
          });
     }
     
     const deleteRows = () => {
          let tableHeaderRowCount = 1;
          let table = document.getElementById("tableOrder");
          let rowCount = table.rows.length;
          for (var i = tableHeaderRowCount; i < rowCount; i++) {
               table.deleteRow(tableHeaderRowCount);
          }
     }

     const printTable = (cel1, cel2, cel3, cel4) => {
          const table = document.getElementById("tableOrder");
          const row = table.insertRow(-1);
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          const cell3 = row.insertCell(2);
          const cell4 = row.insertCell(3);
          cell1.innerHTML = cel1;
          cell2.innerHTML = cel2;
          cell3.innerHTML = formatPrice.format(cel3);
          cell4.innerHTML = formatPrice.format(cel4);
     };
 

     return (
          <Fragment>
               <MetaData title="Admin - Quản lí bán hàng" />
               <div className="row">
                    <div className="col-12 col-md-2">
                         <Sidebar />
                    </div>
                    <div className="col-12 col-md-10">
                         <Fragment>
                              <h2 className="mt-4">
                                   <i className="fas fa-shopping-cart"></i>Quản lí bán hàng
                              </h2>
                              {loading ? (
                                   <Loader />
                              ) : (
                                   <Fragment>
                                        <div className="row">
                                             <div className="col-sm-6 bg-col">
                                                  <h3 className="mt-4 text-center">
                                                       Tất cả sản phẩm
                                                  </h3>
                                                  <MDBDataTableV5
                                                       data={setProducts()}
                                                       className="px-3"
                                                       striped
                                                       hover
                                                       small
                                                       searchTop
                                                       searchBottom={false}
                                                       barReverse
                                                       entries={5}
                                                       entriesOptions={[5, 20, 25]}
                                                  />
                                                  {/* <button className="btn btn-primary mb-4 mr-4 float-right" onClick={()=>addOrder()}>
                                                       <i className="fas fa-plus"></i> Thêm hóa đơn
                                                  </button> */}
                                             </div>
                                             <div className="col-sm-6 bg-col-2">
                                                  <h3 className="mt-4 text-center">Hóa Đơn</h3>
                                                  <table className="table" id="tableOrder">
                                                       <thead>
                                                            <tr>
                                                                 <th scope="col">Tên sản phẩm</th>
                                                                 <th scope="col">Số lượng</th>
                                                                 <th scope="col">Đơn giá</th>
                                                                 <th scope="col">Thành tiền</th>
                                                            </tr>
                                                       </thead>
                                                  </table>
                                                  <div>
                                                       <span className="mt-2 ml-5 mb-2">
                                                            <b>Tổng tiền: </b>
                                                            <b>
                                                                 <span id="tongtien"></span>
                                                            </b>
                                                            <b> VNĐ</b>
                                                       </span>
                                                       <button
                                                            className="btn btn-primary float-right mt-2 mr-2 mb-2"
                                                            onClick={thanhtoan}
                                                       >
                                                            <i className="fas fa-shopping-cart"></i>{" "}
                                                            Thanh toán
                                                       </button>
                                                  </div>
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
export default Buying;
