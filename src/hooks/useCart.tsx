import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

interface ICartProviderProps {
  children: ReactNode;
}

interface ICartContextData {
  cart: ICart;
  addProduct: (id: string, quantity: number, price: number) => void;
}

interface ICart {
  productAmount: number;
  productsTotalPrice: number;
  productsInCart: IProductOrder[];
}

interface IProductOrder {
  id: string;
  quantity: number;
  priceForEach: number;
  totalPrice: number;
}

const CartContext = createContext({} as ICartContextData);

export function CartProvider({ children }: ICartProviderProps): JSX.Element {
  const [cart, setCart] = useState<ICart>(() => {
    const storagedCart = localStorage.getItem("@neo:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return {
      productAmount: 0,
      productsTotalPrice: 0,
      productsInCart: [],
    };
  });

  function addProduct(id: string, quantity: number, price: number) {
    const productQuantity = cart.productAmount;
    if (!cart.productsInCart.some((product) => product.id === id)) {
      setCart((prev) => {
        return {
          ...prev,
          productAmount: productQuantity + 1,
        };
      });
      setCart((prev) => {
        return {
          ...prev,
          productsInCart: [
            ...prev.productsInCart,
            {
              id,
              quantity,
              totalPrice: price * +quantity,
              priceForEach: price,
            },
          ],
        };
      });
    } else {
      setCart((prev) => {
        return {
          ...prev,
          productsInCart: prev.productsInCart.map((product) =>
            product.id === id
              ? {
                  ...product,
                  quantity: quantity + product.quantity,
                  totalPrice: product.totalPrice + price * +quantity,
                }
              : product
          ),
        };
      });
    }
    setCart((prev) => {
      return {
        ...prev,
        productsTotalPrice: prev.productsTotalPrice + price * quantity,
      };
    });
    localStorage.setItem("@neo:cart", JSON.stringify(cart));
    toast.success("Added to cart successfully");
  }

  useEffect(() => {
    localStorage.setItem("@neo:cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ addProduct, cart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
