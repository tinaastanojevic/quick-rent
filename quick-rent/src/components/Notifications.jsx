import { useEffect, useState, useContext } from "react";
import * as signalR from "@microsoft/signalr";
import { HUB_URL } from "../urls";
import { AuthContext } from "../context/AuthContext";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [visible, setVisible] = useState(false);
  const { token, updateToken } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${HUB_URL}`, { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log("Connected to SignalR hub"))
      .catch((err) => console.error(err));

    connection.on("ReceiveNotification", (message) => {
      console.log("Poruka primljena:", message);

      setNotifications((prev) => [...prev, message]);
      setVisible(true);

      if (message.token) {
        updateToken(message.token);
      }
    });

    return () => {
      connection.stop();
    };
  }, [token, updateToken]);

  if (!visible || notifications.length === 0) return null;

  const lastNotification = notifications[notifications.length - 1];

  return (
    <div className="mt-4 mx-4">
      <div className="bg-gray-800 text-green-600 p-4 rounded-lg flex justify-between items-center shadow-lg">
        <span>{lastNotification.message}</span>
        <button
          onClick={() => setVisible(false)}
          className="ml-4 bg-transparent border-none text-white cursor-pointer font-bold text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Notifications;
