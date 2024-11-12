import styles from "./Card.module.scss";
import React from "react";
import ContentLoader from "react-content-loader";
function Card({
  name,
  price,
  imageUrl,
  onPlus,
  id,
  type,
  onFavorite,
  favorited = false,
  added,
  loading = false,
}) {
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const onClickPlus = () => {
    onPlus({ name, price, imageUrl, id, type }, added);
  };
  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite({ name, price, imageUrl, id, type });
  };

  return (
    <li className={styles.catalogItem}>
      {console.log(loading)}
      {loading ? (
        <ContentLoader
          speed={2}
          width={213}
          height={204}
          viewBox="0 0 210 260"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="30" y="36" rx="10" ry="10" width="150" height="91" />
          <rect x="30" y="143" rx="3" ry="3" width="150" height="15" />
          <rect x="30" y="162" rx="3" ry="3" width="93" height="15" />
          <rect x="30" y="195" rx="3" ry="3" width="80" height="24" />
          <rect x="158" y="191" rx="3" ry="3" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {" "}
          {onFavorite && (
            <button
              className={styles.catalogItemFavoriteButton}
              onClick={onClickFavorite}
            >
              {isFavorite ? (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="32" rx="7" fill="#FEF0F0" />
                  <path
                    d="M22.5849 12.2231C22.3615 11.7098 22.0394 11.2446 21.6365 10.8537C21.2333 10.4615 20.758 10.1499 20.2363 9.93576C19.6954 9.7128 19.1152 9.59868 18.5295 9.60002C17.7077 9.60002 16.906 9.82329 16.2092 10.245C16.0425 10.3459 15.8842 10.4567 15.7342 10.5775C15.5841 10.4567 15.4258 10.3459 15.2591 10.245C14.5624 9.82329 13.7606 9.60002 12.9388 9.60002C12.3471 9.60002 11.7737 9.71248 11.232 9.93576C10.7086 10.1508 10.2369 10.46 9.83181 10.8537C9.42843 11.2442 9.10619 11.7095 8.88337 12.2231C8.65168 12.7573 8.53333 13.3246 8.53333 13.9084C8.53333 14.4592 8.64668 15.0331 8.8717 15.6169C9.06006 16.1048 9.33009 16.6109 9.67513 17.122C10.2219 17.9307 10.9736 18.7742 11.9071 19.6293C13.4539 21.0467 14.9857 22.0258 15.0507 22.0655L15.4458 22.3169C15.6208 22.4277 15.8458 22.4277 16.0209 22.3169L16.4159 22.0655C16.4809 22.0242 18.0111 21.0467 19.5596 19.6293C20.493 18.7742 21.2448 17.9307 21.7915 17.122C22.1366 16.6109 22.4083 16.1048 22.5949 15.6169C22.82 15.0331 22.9333 14.4592 22.9333 13.9084C22.935 13.3246 22.8166 12.7573 22.5849 12.2231Z"
                    fill="#FF8585"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.8609 2.07455C13.5204 1.73389 13.1161 1.46365 12.6711 1.27927C12.2261 1.0949 11.7492 1 11.2675 1C10.7859 1 10.3089 1.0949 9.86396 1.27927C9.41898 1.46365 9.0147 1.73389 8.67419 2.07455L7.96753 2.78122L7.26086 2.07455C6.57307 1.38676 5.64022 1.00036 4.66753 1.00036C3.69484 1.00036 2.76199 1.38676 2.07419 2.07455C1.3864 2.76235 1 3.69519 1 4.66788C1 5.64057 1.3864 6.57342 2.07419 7.26122L2.78086 7.96788L7.96753 13.1546L13.1542 7.96788L13.8609 7.26122C14.2015 6.92071 14.4718 6.51643 14.6561 6.07145C14.8405 5.62648 14.9354 5.14954 14.9354 4.66788C14.9354 4.18623 14.8405 3.70929 14.6561 3.26431C14.4718 2.81934 14.2015 2.41505 13.8609 2.07455Z"
                    stroke="#EAEAEA"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          )}
          <img
            src={imageUrl}
            className={styles.catalogItemImg}
            width={133}
            height={112}
          />
          <div className={styles.catalogItemName}>{name}</div>
          <div className={styles.catalogItemBottomWrapper}>
            <div className={styles.catalogItemPriceWrapper}>
              <b>Цена:</b>
              <span className={styles.catalogItemPrice}>{price}</span>
            </div>

            {onPlus && (
              <button
                className={styles.catalogItemAddButton}
                onClick={onClickPlus}
                style={{ backgroundColor: added ? "#89F09C" : "" }}
              >
                <img src={added ? "img/added.svg" : "img/plus.svg"} alt="" />
              </button>
            )}
          </div>
        </>
      )}
      {/*  */}
    </li>
  );
}
export default Card;
