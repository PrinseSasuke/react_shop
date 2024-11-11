import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React, { createContext } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
export const AppContext = createContext({});
function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
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
    setIsLoading(true);
    Promise.all([
      axios.get("https://65c60506e5b94dfca2e0c736.mockapi.io/cart"),
      axios.get("https://66cd8a418ca9aa6c8ccab3ef.mockapi.io/favorites"),
    ])
      .then(([cartRes, favRes]) => {
        setCartItems(cartRes.data);
        setFavorites(favRes.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных", error);
      })
      .finally(() => {
        setIsLoading(false); // Ставим загрузку в false только после завершения всех запросов
      });
  }, []);

  const onRemoveItem = (id) => {
    axios.delete(`https://65c60506e5b94dfca2e0c736.mockapi.io/cart/${id}`);

    setCartItems((prev) => prev.filter((item) => item.id != id));
  };
  return (
    <AppContext.Provider
      value={{
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
        isLoading,
      }}
    >
      <div className="App">
        <Drawer
          items={cartItems}
          onClose={() => {
            setCartOpened(false);
          }}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

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
              isLoading,
            }}
          />
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
