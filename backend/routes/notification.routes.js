const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  getMyNotifications,
  getUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
} = require("../controllers/notification.controller");


// Get notifications
router.get("/", protect, getMyNotifications);


// Get unread count
router.get("/unread-count", protect, getUnreadCount);


// Mark all as read
router.put("/read-all", protect, markAllNotificationsRead);


// Mark one as read
router.put("/:id/read", protect, markNotificationRead);


module.exports = router;