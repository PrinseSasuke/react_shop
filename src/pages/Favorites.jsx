import Card from "../components/Card";
import React from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
function Favorites() {
  const favorites = useOutletContext();

  return (
    <section className="section-outer section-catalog">
      <div className="container">
        <div className="catalogTopWrapper">
          <h1 className="h1">Мои закладки</h1>
        </div>

        <ul className="catalogFlex">
          {/* {favorites.map((obj) => (
            <Card
              type={obj.type}
              name={obj.name}
              price={obj.price}
              imageUrl={obj.imageUrl}
              id={obj.id}
            />
          ))} */}
        </ul>
      </div>
    </section>
  );
}
export default Favorites;
