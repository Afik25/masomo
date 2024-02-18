import React, { useState } from "react";
import Head from "../components/head/Head";
import Navigation from "../components/navigation/Navigation";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../components/modal/Modal";
import CompleteRegister from "../components/complete/CompleteRegister";

const Admin = () => {
  const [open, setOpen] = useState(false);

  const user = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  return (
    <>
      <div className="user">
        <div className="container">
          <Head />
          <Navigation role={user.userInfo?.sys_role} open={open} setOpen={setOpen} />
          <div className="body">
            <Outlet />
          </div>
        </div>
      </div>
      {!user.userInfo?.is_completed && (
        <Modal
          visibility={false}
          height="95%"
          width="60%"
          title="Complete Initial Configuration"
          content={<CompleteRegister sys_role={user.userInfo?.sys_role} />}
        />
      )}
    </>
  );
};

export default Admin;
