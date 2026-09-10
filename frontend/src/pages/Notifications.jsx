import { useEffect, useState } from "react";
import {
  Bell,
  CheckCheck,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchNotifications = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) return;

      const response = await fetch(`${API_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error("Fetch notifications error:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/notifications/${id}/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === id
              ? { ...notification, isRead: true }
              : notification
          )
        );
      }
    } catch (error) {
      console.error("Mark notification error:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/notifications/read-all`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notification) => ({
            ...notification,
            isRead: true,
          }))
        );
      }
    } catch (error) {
      console.error("Mark all notifications error:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter(
          (notification) => !notification.isRead
        )
      : notifications;

  const getNotificationIcon = (type) => {
    if (type === "leave_approved") {
      return (
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle
            size={20}
            className="text-green-600"
          />
        </div>
      );
    }

    if (type === "leave_rejected") {
      return (
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle
            size={20}
            className="text-red-600"
          />
        </div>
      );
    }

    if (type === "leave_request") {
      return (
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <FileText
            size={20}
            className="text-blue-600"
          />
        </div>
      );
    }

    return (
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <Bell
          size={20}
          className="text-gray-600"
        />
      </div>
    );
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen">

      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Notifications
        </h1>

        <p className="text-gray-500 mt-1">
          Stay updated with your latest notifications.
        </p>
      </div>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl overflow-hidden">

        {/* Top Bar */}
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Filters */}
          <div className="flex gap-2">

            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "unread"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="ml-2">
                  ({unreadCount})
                </span>
              )}
            </button>

          </div>

          {/* Mark All */}
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold"
            >
              <CheckCheck size={17} />
              Mark all as read
            </button>
          )}

        </div>

        {/* Notifications */}
        <div>

          {loading ? (
            <div className="py-16 text-center text-gray-500">
              Loading notifications...
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="py-16 text-center">

              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Bell
                  size={26}
                  className="text-gray-400"
                />
              </div>

              <p className="text-lg font-medium text-gray-500 mt-4">
                No notifications
              </p>

              <p className="text-sm text-gray-400 mt-1">
                You're all caught up.
              </p>

            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => {
                  if (!notification.isRead) {
                    markAsRead(notification._id);
                  }
                }}
                className={`p-5 border-b border-gray-100 cursor-pointer transition hover:bg-gray-50 ${
                  !notification.isRead
                    ? "bg-blue-50"
                    : "bg-white"
                }`}
              >

                <div className="flex gap-4">

                  {/* Icon */}
                  <div className="shrink-0">
                    {getNotificationIcon(
                      notification.type
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {notification.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {notification.message}
                        </p>
                      </div>

                      {/* Unread */}
                      {!notification.isRead && (
                        <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mt-2 shrink-0" />
                      )}

                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                      <Clock size={13} />

                      {new Date(
                        notification.createdAt
                      ).toLocaleString("en-IN")}
                    </div>

                  </div>

                </div>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default Notifications;