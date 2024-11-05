import Card from "../components/Card";
import React from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
function Home() {
  const {
    items,
    setItems,
    cartItems,
    setCartItems,
    setFavorites,
    searchValue,
    setSearchValue,
    favorites,
    onAddToFavorite,
    isLoading,
  } = useOutletContext();
  const renderItems = () => {
    const filteredItems = items.filter((item) => {
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    return (isLoading ? [...Array(10)] : filteredItems).map((obj, index) => (
      <Card
        loading={isLoading}
        key={index}
        onPlus={(obj, isAdded) => {
          onAddToCart(obj, isAdded);
        }}
        onFavorite={(obj) => onAddToFavorite(obj, obj.id)}
        {...obj}
        added={
          obj
            ? cartItems.some((item) => Number(item.type) === Number(obj.type))
            : null
        }
      />
    ));
  };
  const onAddToCart = async (obj, isAdded) => {
    if (isAdded) {
      let get_id = cartItems.find((item) => item.type == obj.type);
      await onRemoveItem(get_id.id);
    } else {
      try {
        const { data } = await axios.post(
          "https://65c60506e5b94dfca2e0c736.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, data]);
      } catch (error) {}
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
        <ul className="catalogFlex">{renderItems()}</ul>
      </div>
    </section>
  );
}
export default Home;
