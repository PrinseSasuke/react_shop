import Card from "../components/Card";
import React from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
function Home() {
  const {
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
  } = useOutletContext();
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
    axios
      .get("https://66cd8a418ca9aa6c8ccab3ef.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);
  return (
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
                onFavorite={(obj) => onAddToFavorite(obj)}
              />
            ))}
        </ul>
      </div>
    </section>
  );
}
export default Home;
