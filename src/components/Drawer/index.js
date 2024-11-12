import Info from "../info";
import React, { useContext } from "react";
import { useCart } from "../../hooks/useCart";
import axios from "axios";
import styles from "./Drawer.module.scss";
function Drawer({ onClose, items = [], onRemove, opened }) {
  const [isOrderComplete, setisOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { cartItems, setCartItems, totlaPrice } = useCart();
  React.useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden"; // Отключаем прокрутку при открытом Drawer
    } else {
      document.body.style.overflow = ""; // Возвращаем прокрутку в исходное состояние при закрытии Drawer
    }

    // Очистка эффекта при размонтировании компонента
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://66cd8a418ca9aa6c8ccab3ef.mockapi.io/orders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setisOrderComplete(true);
      await Promise.all(
        cartItems.map((item) =>
          axios.delete(
            `https://65c60506e5b94dfca2e0c736.mockapi.io/cart/${item.id}`
          )
        )
      );
      setCartItems([]);
    } catch (error) {
      alert("Не удалось создать заказ");
      console.log(error);
    }
    setIsLoading(false);
  };
  {
    console.log("visible", opened);
  }
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className={styles.h2}>
          Корзина{" "}
          <img src="img/delete.svg" alt="delete card" onClick={onClose} />
        </h2>

        {items.length > 0 ? (
          <>
            <ul className="cartCards">
              {items.map((obj) => (
                <li className="cartCardsItem">
                  <div className="itemImg">
                    <img
                      src={`${obj.imageUrl}`}
                      alt=""
                      width={70}
                      height={70}
                    />
                  </div>
                  <div className="itemWrapper">
                    <div className="itemName">{obj.name}</div>
                    <span className="price">{obj.price}</span>
                  </div>
                  <button
                    className="itemDeleteButton"
                    onClick={() => onRemove(obj.id)}
                  >
                    <img src="img/delete.svg" alt="delete card" />
                  </button>
                </li>
              ))}
            </ul>
            <ul className="orderInfo">
              <li>
                <span>Итого: </span>
                <div></div>
                <b>{totlaPrice()} руб.</b>
              </li>
              <li>
                <span>Налог 5%: </span>
                <div></div>
                <b>{totlaPrice() * 0.05} руб.</b>
              </li>
              <li>
                <button
                  disabled={isLoading}
                  className="btn orderCompleteButton"
                  onClick={onClickOrder}
                >
                  Оформить заказ{" "}
                  <svg
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 7H14.7143"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.71436 1L14.7144 7L8.71436 13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image_url={
              isOrderComplete ? "img/order_complete.png" : "img/empty_cart.png"
            }
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
