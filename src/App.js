import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainState from "./Context/mainState";
import Login from "./Container/Login/Login.component";
import Home from "./Container/Home/Home.component";
import Product from "./Container/Product/Product.component";
import Coupon from "./Container/Coupon/Coupon.component";

function App() {
  return (
    <MainState>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />}>
              <Route path="product" element={<Product />} />
              <Route path="coupon" element={<Coupon />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </MainState>    
  );
}

export default App;
