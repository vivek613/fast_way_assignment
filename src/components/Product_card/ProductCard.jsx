import React from "react";

import {
  Card,
  CardActionArea,
  CardActions,
  Rating,
  CardContent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import styles from "./ProductCard.module.css";

export default function ProductCard({ prod }) {
  return (
    <Card
      className={styles.main_card}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <CardActionArea className={styles.card_action}>
        <Box className={styles.cart_box}>
          <img
            alt={prod.title}
            src={prod.images[0]}
            loading="lazy"
            className={styles.cart_img}
          />
        </Box>
        <CardContent sx={{ padding: 0 }}>
          <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
            {prod.title.length > 20
              ? prod.title.slice(0, 20) + "..."
              : prod.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" color="primary">
          ₹{prod.price}
        </Typography>
        <Typography variant="h6" fontSize={"14px"} color="primary">
          Discount: {prod.discountPercentage}%
        </Typography>
        <Typography variant="h6" fontSize={"14px"} color="primary">
          Stock: {prod.stock}
        </Typography>

        <Typography>
          <Rating
            precision={0.5}
            name="read-only"
            value={prod.rating}
            readOnly
          />
        </Typography>
      </CardActions>
    </Card>
  );
}
