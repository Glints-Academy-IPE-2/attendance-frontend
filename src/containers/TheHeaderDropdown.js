import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from "@coreui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser, faKey } from "@fortawesome/free-solid-svg-icons";

import AuthServices from "../services/auth.service";
import { useHistory } from "react-router-dom";

const TheHeaderDropdown = () => {
  const history = useHistory();

  const logout = () => {
    AuthServices.logout();
    history.push("/login");
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/default-avatar.png"}
            className="c-avatar-img"
            alt="user-avatar"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="py-0" placement="bottom-end">
        <CDropdownItem to="/profile">
          <FontAwesomeIcon icon={faUser} className="mfe-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem to="/changepassword">
          <FontAwesomeIcon icon={faKey} className="mfe-2" />
          Change Password
        </CDropdownItem>
        <CDropdownItem onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
