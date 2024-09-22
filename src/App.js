import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  React.useEffect(() => {
    axios
      .get("https://65c60506e5b94dfca2e0c736.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
    axios
      .get("https://66cd8a418ca9aa6c8ccab3ef.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);
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
  const onAddToFavorite = (obj) => {
    setFavorites((prev) => [...prev, obj]);
    axios.post("https://66cd8a418ca9aa6c8ccab3ef.mockapi.io/favorites", obj);
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
        <Outlet
          context={{
            cartOpened,
            setCartOpened,
            items,
            setItems,
            cartItems,
            setCartItems,
            favorites,
            setFavorites,
            searchValue,
            setSearchValue,
          }}
        />
      </main>
    </div>
  );
}

export default App;
