import { Header } from "./components/Header";
import { Filters } from "./components/Filters";
import { OrderContainer } from "./components/OrderContainer";
import { CartContent } from "./components/CardContent";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./hooks/useCart";
import "./global.css";
import { FilterProvider } from "./hooks/useFilters";
import { useMediaQuery } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const matches = useMediaQuery("(min-width:960px)");
  return (
    <CartProvider>
      <FilterProvider>
        <Header />
        {matches && <Filters />}
        <OrderContainer />
        <ToastContainer position="bottom-left" autoClose={2000} />
        <CartContent />
      </FilterProvider>
    </CartProvider>
  );
}
export default App;
