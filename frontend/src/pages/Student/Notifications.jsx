import { useEffect, useState, useContext } from "react";
import { getNotifications, markAsRead } from "../../services/notificationService";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotifications(user.token);
        setNotifications(data);
      } catch {
        toast.error("Failed to load notifications");
      }
    };
    fetchData();
  }, [user.token]);

  const handleRead = async (id) => {
    try {
      await markAsRead(id, user.token);
      toast.success("Marked as read!");
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch {
      toast.error("Failed to update notification");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">🔔 Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-600">No notifications at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n._id}
              className={`p-4 rounded-2xl shadow flex justify-between items-center ${
                n.read ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div>
                <p className="text-gray-800">{n.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
              {!n.read && (
                <button
                  onClick={() => handleRead(n._id)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700"
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
