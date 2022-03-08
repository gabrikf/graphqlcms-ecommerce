import { renderHook, act } from "@testing-library/react-hooks";
import { toast } from "react-toastify";
import { useCart, CartProvider } from "../../hooks/useCart";

jest.mock("react-toastify");
const mockedToastSuccess = toast.success as jest.Mock;
describe("useCart Hook", () => {
  it("should initialize with 0 products", () => {
    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });
    expect(result.current.cart.productAmount).toBe(0);
  });

  it("should increment product amount by quantity when adds some product", () => {
    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });
    act(() => {
      result.current.addProduct("1", 2, 10);
    });
    expect(result.current.cart.productAmount).toBe(2);
  });

  it("should show toast when add some product", async () => {
    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider,
    });
    act(() => {
      result.current.addProduct("1", 2, 10);
    });
    await waitFor(
      () => {
        expect(mockedToastSuccess).toHaveBeenCalledWith(
          "Added to cart successfully"
        );
      },
      { timeout: 200 }
    );
  });

  it("should only increase the product quantity if product is already in cart", () => {
    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });
    act(() => {
      result.current.addProduct("1", 2, 10);
      result.current.addProduct("1", 2, 10);
    });
    expect(result.current.cart.productsInCart.length).toBe(1);
  });

  it("should change the product amount to 0 when calls clean cart", () => {
    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });
    act(() => {
      result.current.addProduct("1", 2, 10);
      result.current.cleanCart();
    });
    expect(result.current.cart.productAmount).toBe(0);
  });
  it("should remove all products from cart when calls clean cart", () => {
    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });
    act(() => {
      result.current.addProduct("1", 2, 10);
      result.current.cleanCart();
    });
    expect(result.current.cart.productsInCart.length).toBe(0);
  });
});
