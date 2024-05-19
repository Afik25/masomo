import React from "react";
import { NavLink } from "../../routes/NavLink";
import {
  MdOutlineDashboard,
  MdMenuBook,MdQuiz,
  TiMessages,
  MdFavoriteBorder,
  PiBooksLight,
  GiLevelEndFlag,
  BiSolidBookContent,
  FiUsers,
  IoSettingsOutline,
} from "../../middlewares/icons";

const Navigation = ({ role }) => {
  return (
    <div className="navigations">
      <div className="container">
        {role === "admin" && (
          <>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/admin"
              exact={true}
            >
              <MdOutlineDashboard className="option-icon" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/admin/challenge"
            >
              <MdQuiz className="option-icon" />
              <span>Challenge</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/admin/courses"
            >
              <MdMenuBook className="option-icon" />
              <span>Courses</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/admin/messaging"
            >
              <TiMessages className="option-icon" />
              <span>Messaging</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/admin/favorite"
            >
              <MdFavoriteBorder className="option-icon" />
              <span>Favorite</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/admin/library"
            >
              <PiBooksLight className="option-icon" />
              <span>Library</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/admin/levels"
            >
              <GiLevelEndFlag className="option-icon" />
              <span>Study's Level</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/admin/programs"
            >
              <BiSolidBookContent className="option-icon" />
              <span>Programs</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/admin/users"
            >
              <FiUsers className="option-icon" />
              <span>Users</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/admin/settings"
            >
              <IoSettingsOutline className="option-icon" />
              <span>Settings</span>
            </NavLink>
          </>
        )}
        {role === "student" && (
          <>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/student"
              exact={true}
            >
              <MdOutlineDashboard className="option-icon" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/student/challenge"
            >
              <MdQuiz className="option-icon" />
              <span>Challenge</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/student/courses"
            >
              <MdMenuBook className="option-icon" />
              <span>Courses</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/student/messaging"
            >
              <TiMessages className="option-icon" />
              <span>Messaging</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/student/favorite"
            >
              <MdFavoriteBorder className="option-icon" />
              <span>Favorite</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/student/library"
            >
              <PiBooksLight className="option-icon" />
              <span>Library</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link"
              to="/student/settings"
            >
              <IoSettingsOutline className="option-icon" />
              <span>Settings</span>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
