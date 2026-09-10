import {useEffect, useRef, useState} from "react";
import {Bell, CheckCheck,  ChevronRight} from "lucide-react";
import {useNavigate} from "react-router-dom";


import {
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  const notificationRef = useRef(null);

  const navigate = useNavigate();

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
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) return;

      const response = await fetch(`${API_URL}/notifications/unread-count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUnreadCount(data.count || 0);
      }
    } catch (error) {
      console.error("Fetch unread count error:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = sessionStorage.getItem("token");

      await fetch(`${API_URL}/notifications/${id}/read`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchNotifications();
      fetchUnreadCount();
    } catch (error) {
      console.error("Mark notification error:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = sessionStorage.getItem("token");

      await fetch(`${API_URL}/notifications/read-all`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchNotifications();
      fetchUnreadCount();

      setOpen(false);
    } catch (error) {
      console.error("Mark all notifications error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();

    const interval = setInterval(() => {
      fetchNotifications();
      fetchUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type) => {
  if (type === "leave_approved") {
    return (
      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
        <CheckCircle size={16} className="text-green-600" />
      </div>
    );
  }

  if (type === "leave_rejected") {
    return (
      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
        <XCircle size={16} className="text-red-600" />
      </div>
    );
  }

  if (type === "leave_request") {
    return (
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
        <FileText size={16} className="text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
      <Bell size={16} className="text-gray-600" />
    </div>
  );
};

  return (
    <div ref={notificationRef} className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Bell size={22} className="text-gray-700" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
       <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div>
              <h3 className="font-semibold text-gray-800">Notifications</h3>

              {unreadCount > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {unreadCount} unread
                </p>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1"
              >
                <CheckCheck size={15} />
                Mark all
              </button>
            )}
          </div>

          {/* Notifications */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-10 text-center">
                <Bell size={30} className="mx-auto text-gray-300" />

                <p className="text-sm text-gray-400 mt-2">No notifications</p>
              </div>
            ) : (
              notifications.slice(0, 5).map((notification) => (
                <button
                  key={notification._id}
                  onClick={() =>
                    !notification.isRead && markAsRead(notification._id)
                  }
                  className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition ${
                    !notification.isRead ? "bg-blue-50" : "bg-white"
                  }`}
                >
   <div className="flex gap-3">

  {/* Notification Icon */}
  {getNotificationIcon(notification.type)}

  <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">
                        {notification.title}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {notification.message}
                      </p>

                      <p className="text-[10px] text-gray-400 mt-2">
                        {new Date(notification.createdAt).toLocaleString(
                          "en-IN",
                        )}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
                 </div>

          {/* View All Notifications */}
          {notifications.length > 5 && (
            <button
              onClick={() => {
                setOpen(false);
                navigate("/notifications");
              }}
              className="w-full px-4 py-3 border-t border-gray-200 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-1"
            >
              View All Notifications
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      )}
      
    </div>
  );
}

export default NotificationBell;
