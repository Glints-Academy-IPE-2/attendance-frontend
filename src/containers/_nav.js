import React from "react";
import CIcon from "@coreui/icons-react";

function navigation(isAdmin = false) {
  if (!isAdmin) {
    return [
      {
        _tag: "CSidebarNavItem",
        name: "Dashboard",
        to: "/dashboard",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavItem",
        name: "Attendance",
        to: "/attendance",
        icon: <CIcon name="cil-calendar" customClasses="c-sidebar-nav-icon" />,
      },
      {
        _tag: "CSidebarNavDivider",
        className: "m-2",
      },
    ];
  }
  return [
    {
      _tag: "CSidebarNavItem",
      name: "Dashboard Admin",
      to: "/dashboard",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: "CSidebarNavTitle",
      _children: ["Users"],
    },
    {
      _tag: "CSidebarNavItem",
      name: "Users Attendance",
      to: "/usersattendance",
      icon: <CIcon name="cil-calendar" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: "CSidebarNavItem",
      name: "Approve Users",
      to: "/approve",
      icon: <CIcon name="cil-check" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: "CSidebarNavDivider",
      className: "m-2",
    },
  ];
}

export default navigation;
