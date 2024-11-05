import React, { useContext } from "react";
import { AppContext } from "../App"; // Импортируй контекст
const Info = ({ title, description, image_url }) => {
  const { setCartOpened } = useContext(AppContext);

  return (
    <div className="cartEmpty">
      <img src={image_url} alt="order completed" />
      <p className="title">{title}</p>
      <p className="text">{description}</p>
      <button className="btn toBackBtn" onClick={() => setCartOpened(false)}>
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.7144 7L1.00007 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 13L1 7L7 1"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
