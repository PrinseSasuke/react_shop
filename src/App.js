import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";
function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const onAddToCart = (obj, isAdded) => {
    if (isAdded) {
      let get_id = cartItems.find((item) => item.type == obj.id);
      console.log(get_id);
      console.log(get_id.id);
      onRemoveItem(get_id.id);
    } else {
      setCartItems((prev) => [...prev, obj]);
      axios.post("https://65c60506e5b94dfca2e0c736.mockapi.io/cart", obj);
    }
  };
  const onRemoveItem = (id) => {
    axios.delete(`https://65c60506e5b94dfca2e0c736.mockapi.io/cart/${id}`);

    setCartItems((prev) => prev.filter((item) => item.id != id));
  };
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  const clearSeacthInput = (event) => {
    setSearchValue("");
  };

  React.useEffect(() => {
    axios
      .get("https://65c60506e5b94dfca2e0c736.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://65c60506e5b94dfca2e0c736.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  return (
    <div className="App">
      {cartOpened && (
        <div className="overlay">
          <Drawer
            items={cartItems}
            onClose={() => {
              setCartOpened(false);
            }}
            onRemove={onRemoveItem}
          />
        </div>
      )}

      <Header onClickCart={() => setCartOpened(true)} />
      <main>
        <section className="section-outer section-catalog">
          <div className="container">
            <div className="catalogTopWrapper">
              <h1 className="h1">
                {searchValue ? `Поиск по ${searchValue}` : "Все кроссовки"}
              </h1>
              <div className="topWrapper">
                <input
                  placeholder="Поиск..."
                  id="search"
                  className="catalogSearch"
                  onChange={onChangeSearchInput}
                  value={searchValue}
                />
                {searchValue && (
                  <img
                    src="/img/delete.svg"
                    alt=""
                    className="deleteSeacrh"
                    onClick={clearSeacthInput}
                  />
                )}
              </div>
            </div>
            <ul className="catalogFlex">
              {items
                .filter((item) => {
                  return item.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
                })
                .map((obj) => (
                  <Card
                    type={obj.type}
                    name={obj.name}
                    price={obj.price}
                    imageUrl={obj.imageUrl}
                    id={obj.id}
                    onPlus={(obj, isAdded) => {
                      onAddToCart(obj, isAdded);
                    }}
                  />
                ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
