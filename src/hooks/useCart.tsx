import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

interface ICartProviderProps {
  children: ReactNode;
}

interface ICartContextData {
  productAmount: number;
  addProduct: (id: string, quantity: number, price: number) => void;
  productsInCart: IProductOrder[];
  productsTotalPrice: number;
}

interface IProductOrder {
  id: string;
  quantity: number;
  priceForEach: number;
  totalPrice: number;
}

const CartContext = createContext({} as ICartContextData);

export function CartProvider({ children }: ICartProviderProps): JSX.Element {
  const [productAmount, setProductAmount] = useState(0);
  const [productsInCart, setProductsInCart] = useState<IProductOrder[]>([]);
  const [productsTotalPrice, setProductsTotalPrice] = useState(0);

  function addProduct(id: string, quantity: number, price: number) {
    const productQuantity = productAmount;
    if (!productsInCart.some((product) => product.id === id)) {
      setProductAmount(productQuantity + 1);
      setProductsInCart((prev) => [
        ...prev,
        { id, quantity, totalPrice: price * +quantity, priceForEach: price },
      ]);
    } else {
      setProductsInCart((prev) =>
        prev.map((product) =>
          product.id === id
            ? {
                ...product,
                quantity: quantity + product.quantity,
                totalPrice: product.totalPrice + price * +quantity,
              }
            : product
        )
      );
    }
    setProductsTotalPrice((prev) => prev + price * quantity);
  }

  return (
    <CartContext.Provider
      value={{ addProduct, productAmount, productsInCart, productsTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
