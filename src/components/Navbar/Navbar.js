import React from "react";
import classes from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.leftSection}>
        <Link to={"/"} className={classes.homeLink}>
          Home
        </Link>
      </div>
      <div className={classes.rightSection}>
        <NavLink
          className={({ isActive }) => {
            const tempClasses = [classes.newPostLink];
            isActive && tempClasses.push(classes.activeLink);
            return tempClasses.join(" ");
          }}
          to="/add-post"
        >
          <p className={classes.newPostSection}>Add Post</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
