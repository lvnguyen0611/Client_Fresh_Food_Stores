import { useEffect } from "react";
import Header from "./components/layout/Header";
import "./App.css";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import Login from "./components/user/Login";
import ProductDetails from "./components/product/ProductDetails";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import ProtectRoute from "./components/route/ProtectRoute";
import { loadUser } from "./actions/userActions";
import store from "./store";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList"
import ProsessOrder from "./components/admin/ProsessOrder";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import Buying from "./components/BuyAtStrore/Buying";
import ProductReviews from "./components/admin/ProductReviews";

function App() {
     useEffect(() => {
          store.dispatch(loadUser());
     }, []);

     return (
          <Router>
               <div className="App">
                    <Header />
                    <div class="container container-fluid">
                         <Route path="/" component={Home} exact />
                         <Route path="/search/:keyword" component={Home} />
                         <Route path="/product/:id" component={ProductDetails} exact />
                         <Route path="/login" component={Login} />
                         <Route path="/register" component={Register} />
                         <Route path="/password/reset/:token" component={NewPassword} exact />
                         <Route path="/password/forgot" component={ForgotPassword} exact />
                         <ProtectRoute path="/me" component={Profile} exact />
                         <ProtectRoute path="/me/update" component={UpdateProfile} exact />
                         <ProtectRoute path="/password/update" component={UpdatePassword} exact />
                         <Route path="/cart" component={Cart} exact />
                         <ProtectRoute path="/shipping" component={Shipping} />
                         <ProtectRoute path="/order/confirm" component={ConfirmOrder} exact />
                         <ProtectRoute path="/payment" component={Payment} />
                         <ProtectRoute path="/orders/me" component={ListOrders} exact />
                         <ProtectRoute path="/order/:id" component={OrderDetails} exact />
                    </div>
                    <ProtectRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
                    <ProtectRoute
                         path="/admin/products"
                         isAdmin={true}
                         component={ProductList}
                         exact
                    />
                    <ProtectRoute
                         path="/admin/product"
                         isAdmin={true}
                         component={NewProduct}
                         exact
                    />
                    <ProtectRoute
                         path="/admin/product/:id"
                         isAdmin={true}
                         component={UpdateProduct}
                         exact
                    />
                    <ProtectRoute path="/admin/orders" isAdmin={true} component={OrderList} exact />
                    <ProtectRoute
                         path="/admin/order/:id"
                         isAdmin={true}
                         component={ProsessOrder}
                         exact
                    />
                    <ProtectRoute path="/admin/users" isAdmin={true} component={UserList} exact />
                    <ProtectRoute
                         path="/admin/user/:id"
                         isAdmin={true}
                         component={UpdateUser}
                         exact
                    />
                    <ProtectRoute path="/admin/buying" isAdmin={true} component={Buying} exact />
                    <ProtectRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />
                    <Footer />
               </div>
          </Router>
     );
}

export default App;
