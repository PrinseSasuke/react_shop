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
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        await axios.delete(
          `https://66cd8a418ca9aa6c8ccab3ef.mockapi.io/favorites/${obj.id}`
        );

        setFavorites((prev) => prev.filter((favObj) => favObj.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://66cd8a418ca9aa6c8ccab3ef.mockapi.io/favorites",
          obj
        );
        console.log("data: ", data);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error("Failed to update favorites", error);
    }
  };
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
  const onRemoveItem = (id) => {
    axios.delete(`https://65c60506e5b94dfca2e0c736.mockapi.io/cart/${id}`);

    setCartItems((prev) => prev.filter((item) => item.id != id));
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
            onAddToFavorite,
          }}
        />
      </main>
    </div>
  );
}

export default App;
