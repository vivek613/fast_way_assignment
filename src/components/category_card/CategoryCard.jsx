import React from "react";
import styles from "./Category.module.css";
import { Link } from "react-router-dom";

const CategoryCard = ({ data, onClick }) => {
  return (
    <Link to={`product/type/${data?.name?.toLowerCase()}`}>
      <div className={styles.mainCard} onClick={onClick}>
        <img
          src={data.image[1]}
          alt=""
          className={styles.mainImg}
          loading="lazy"
        />
        <span className={styles.imgTitle}>{data.name}</span>
      </div>
    </Link>
  );
};

export default CategoryCard;
