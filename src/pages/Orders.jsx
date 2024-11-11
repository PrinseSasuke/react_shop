import Card from "../components/Card";
import React from "react";
import axios from "axios";
import styles from "../components/Card/Card.module.scss";
function Orders() {
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "https://66cd8a418ca9aa6c8ccab3ef.mockapi.io/orders"
        );

        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchOrders();
  }, []);

  return (
    <section className="section-outer section-catalog">
      <div className="container">
        <div className="catalogTopWrapper">
          <h1 className="h1">Мои заказы</h1>
        </div>
        <ul className="ordersList">
          {console.log("orders", orders)}
          {orders.map((order) => (
            <div key={order.id} className="ordersItem">
              <span className="ordersItemName">Заказ {order.id}</span>
              <ul className="catalogFlex">
                {order.items.map((obj) => (
                  <Card
                    key={obj.id}
                    {...obj}
                    className={`${styles.noMarginBottom}`}
                    added={true}
                  />
                ))}
              </ul>
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Orders;
