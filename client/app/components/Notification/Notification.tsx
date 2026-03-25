import clsx from "clsx";
import "./Notification.scss";

import SuccessIcon from "~/assets/icons/success.svg?react";
import ErrorIcon from "~/assets/icons/error.svg?react";

interface NotificationProps {
  className: string;
  type: "success" | "error";
  message: string;
}

const Notification = ({ className, type, message }: NotificationProps) => {
  return (
    <div className={clsx(`notification notification--${type}`, className)}>
      {type === "success" ? <SuccessIcon /> : <ErrorIcon />}

      <div className="notification__body">
        <p className="notification__title">
          {type === "success" ? "Изменения сохранены" : "Ошибка сохранения"}
        </p>
        {type === "error" && (
          <p className="notification__message"> {message}</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
