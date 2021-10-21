import React from "react";

// All
const Profile = React.lazy(() => import("./views/profile/Profile"));
const ChangePassword = React.lazy(() =>
  import("./views/changepassword/ChangePassword")
);

function routes(isAdmin = false) {
  let route = [
    { path: "/profile", name: "Profile", component: Profile },
    {
      path: "/changepassword",
      name: "Change Password",
      component: ChangePassword,
    },
  ];

  if (!isAdmin) {
    // User Routes
    const Dashboard = React.lazy(() =>
      import("./views/role/user/dashboard/Dashboard")
    );
    const Attendance = React.lazy(() =>
      import("./views/role/user/attendance/Attendance")
    );

    return [
      ...route,
      { path: "/", exact: true, name: "Home" },
      { path: "/dashboard", name: "Dashboard", component: Dashboard },
      { path: "/attendance", name: "Attendance", component: Attendance },
    ];
  } else {
    // Admin Routes
    const DashboardAdmin = React.lazy(() =>
      import("./views/role/admin/dashboard/DashboardAdmin")
    );
    const ApproveUsers = React.lazy(() =>
      import("./views/role/admin/approve/ApproveUsers")
    );
    const UsersAttendance = React.lazy(() =>
      import("./views/role/admin/usersattendance/UsersAttendance")
    );

    return [
      ...route,
      { path: "/", exact: true, name: "Dashboard Admin" },
      { path: "/dashboard", name: "Dashboard", component: DashboardAdmin },

      {
        path: "/approve",
        exact: true,
        name: "Approve Users",
        component: ApproveUsers,
      },
      {
        path: "/usersattendance",
        exact: true,
        name: "Users Attendance",
        component: UsersAttendance,
      },
    ];
  }
}

export default routes;
