import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  alertError,
  alertSuccess,
  alertInfo,
} from "../store/actions/alertAction";
import "react-toastify/dist/ReactToastify.css";

function Alert() {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert.info) {
      toast.info(alert.info, {
        position: "top-right",
        onClose: () => dispatch(alertInfo("")),
        hideProgressBar: true,
        theme: "colored",
      });
    }

    if (alert.success) {
      toast.success(alert.success, {
        position: "top-right",
        onClose: () => dispatch(alertSuccess("")),
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
      });
    }

    if (alert.error) {
      toast.error(alert.error, {
        position: "top-right",
        onClose: () => dispatch(alertError("")),
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
      });
    }
  }, [alert]);

  return (
    <>
      {/*
      {alert.success &&
        toast.success(alert.success, {
          position: "top-center",
          onClose: () => dispatch(alertSuccess("")),
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored",
        })}

      {alert.error &&
        toast.error(alert.error, {
          position: "top-center",
          onClose: () => dispatch(alertErrorAction),
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored",
        })}

      {alert.info &&
        toast.info(alert.info, {
          position: "top-right",
          onClose: () => dispatch(alertInfo("")),
          hideProgressBar: true,
          theme: "colored",
        })}
      */}
      <ToastContainer />
    </>
  );
}

export default Alert;
