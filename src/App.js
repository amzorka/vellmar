import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.scss";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import CategoryPage from "./pages/CategoryPage";
import Brands from "./pages/Brands";
import SearchResults from "./pages/SearchResults";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import BrandCatalog from "./pages/BrandCatalog";
import Legal from "./pages/Legal";
import Delivery from "./pages/Delivery";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import SuccessPage from "./pages/SuccessPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about" element={<About />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/brand-products" element={<BrandCatalog />} />
        <Route path="/catalog/:categorySlug" element={<CategoryPage />} />
        <Route
          path="/catalog/:categorySlug/:subCategorySlug"
          element={<CategoryPage />}
        />
        <Route
          path="/catalog/:categorySlug/:subCategorySlug/:subSubCategorySlug"
          element={<CategoryPage />}
        />
        <Route
          path="/catalog/:categorySlug/:subCategorySlug/:subSubCategorySlug/:subSubCategorySlug"
          element={<CategoryPage />}
        />
        <Route path="/brands" element={<Brands />} />
        <Route path="/product/*" element={<ProductPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
