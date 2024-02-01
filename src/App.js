import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FrontPageForm from "./features/FrontPage/FrontPageForm";
import Registration from "./features/RegistrationForm/Registration";
import UserProfile from "./features/UserProfile/UserProfile";
import EmailVerify from "./features/EmailVerify/EmailVerify";
import ForgotPass from "./features/ForgotPassword/ForgotPass";
import EmailConfirm from "./features/ForgotPassword/EmailConfirm";
import UpdateProfile from "./features/UserProfile/UpdateProfile";
import PasswordReset from "./features/UserProfile/PasswordReset";
import EditProfile from "./features/UserProfile/EditProfile";
import Login from "./features/LoginForm/Login";
import NavbarForm from "./features/NavbarForm/NavbarForm";
import Stats from "./features/FrontPage/Stats";
import Testimonials from "./features/FrontPage/Testimonials";
import Footer from "./features/FrontPage/Footer";
import FrontPageProduct from "./features/FrontPage/FrontPageProduct";
import DiscountProduct from "./features/FrontPage/DiscountProduct";
import OtherProducts from "./features/Product/OtherProducts";
import MilkProducts from "./features/Product/MilkProducts";
import MilkType from "./features/Product/MilkType";
import QuickView from "./features/FrontPage/Quickview";
import Cart from "./features/Cart/Cart";
import News from "./features/News/News";
import ContactUs from "./features/Contact/ContactUs";
import Blog from "./features/Blog/Blog";
import Checkout from "./features/Checkout/Checkout";
import FAQs from "./features/FooterLinks/FAQs/FAQs";
import ProductOverview from "./features/Product/ProductOverview";
import AboutUs from "./features/About/AboutUs";
import Support from "./features/Support/Support";
import OrderHistory from "./features/OrderHistory/OrderHistory";
import OrderSummary from "./features/OrderSummary/OrderSummary";
import { useSelector } from "react-redux";
import PageNotFound from "./features/PageNotFound/PageNotFound";
import LoginRequired from "./features/PageNotFound/LoginRequired";
import Wishlist from "./features/Cart/Wishlist";

const App = () => {
  const loggedIn = useSelector((state) => state?.userDetails?.login);

  return (
    <Router>
      <NavbarForm />
      <Routes>
        {/* <Route path='*' element={<PageNotFound />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/milkProducts" element={<MilkProducts />} />
        <Route path="milktypes" element={<MilkType />} />
        <Route path="quickview" element={<QuickView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="news" element={<News />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQs />} />
        <Route
          path="/productOverview/:productId"
          element={<ProductOverview />}
        />
        <Route path="about" element={<AboutUs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/otherProducts" element={<OtherProducts />} />
        <Route path="/emailverify" element={<EmailVerify />} />
        <Route path="/emailConfirm" element={<EmailConfirm />} />
        <Route path="/forgotPass" element={<ForgotPass />} />
        <Route
          path="/"
          element={
            <>
              <FrontPageForm />
              <FrontPageProduct />
              <DiscountProduct />
              <Stats />
              <Testimonials />
              <Footer />
            </>
          }
        />
        {loggedIn ? (
          <>
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/userprofile" element={<UserProfile />} />

            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/changePass" element={<PasswordReset />} />
            <Route path="orderHistory" element={<OrderHistory />} />
            <Route path="orderSummary" element={<OrderSummary />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </>
        ) : (
          <Route path="*" element={<LoginRequired />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
