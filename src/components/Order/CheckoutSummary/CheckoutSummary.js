import React from "react";

import classes from "./CheckoutSummary.module.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>The Best Burger In The World!</h1>
      <div stlye={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.checkoutContinued} btnType="Success">
        Continue
      </Button>
      <Button clicked={props.checkoutCancelled} btnType="Danger">
        Cancel
      </Button>
    </div>
  );
};

export default checkoutSummary;
