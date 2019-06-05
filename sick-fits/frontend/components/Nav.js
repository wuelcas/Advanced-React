import React, { Fragment } from "react";
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";

export default function Nav() {
  return (    
    <User>
      {({ data: { me } }) => (
        <NavStyles>
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {me && (
            <Fragment>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/me">
                <a>Account</a>
              </Link>
            </Fragment>
          )}
          {!me && (
            <Fragment>
              <Link href="/signup">
                <a>Sign In</a>
              </Link>
            </Fragment>
          )}
        </NavStyles>
      )}
    </User>
  );
}
