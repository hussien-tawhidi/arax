import { addToCart } from "@/store/slice/cartSlice";
import { IconType } from "react-icons/lib";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useToast } from "../ToastContext";

interface AddToCartButtonProps {
  _id: string;
  name: string;
  price: number;
  Icon: IconType;
  image: string[];
  color: { name: string; hex: string }[];
  discountPrice: number;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  text?: string;
  productCode?: string;
}

const AddToCartButton = ({
  _id,
  Icon,
  name,
  type,
  image,
  color,
  price,
  discountPrice,
  productCode,
  className = "",
  text,
}: AddToCartButtonProps) => {
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const existItem = cartItems.find((item) => item._id === _id);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id,
        name,
        price,
        quantity: 1,
        image,
        color,
        discountPrice,
        productCode,
      })
    );
    addToast(`${name} به سبد خرید اضافه شد`, "success");
  };

  return (
    <div className={existItem ? "hidden" : "block"}>
      <button
        disabled={color.length === 0}
        type={type}
        className={`group relative flex gap-1.5 items-center text-tusi transition ${className}`}
        onClick={handleAddToCart}>
        {Icon && <Icon />}
        {text}
      </button>
    </div>
  );
};

export default AddToCartButton;
