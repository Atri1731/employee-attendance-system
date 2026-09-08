// const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     // Check if token exists
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "Not authorized. Token required.",
//       });
//     }

//     // Get token
//     const token = authHeader.split(" ")[1];

//     // Verify token
//     console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);
//     console.log("TOKEN RECEIVED:", !!token);

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Store user information in request
//     req.user = decoded;

//     next();
// const token = authHeader.split(" ")[1];

// const decoded = jwt.verify(token, process.env.JWT_SECRET);

// req.user = decoded;

// next();

// } catch (error) {
//   console.error("JWT ERROR:", error.name, error.message);

//   return res.status(401).json({
//     message: "Invalid or expired token",
//   });
// }
// };

// module.exports = protect;


const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized. Token required.",
      });
    }

    // Get token
    const token = authHeader.split(" ")[1];

    console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);
    console.log("TOKEN RECEIVED:", !!token);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store user information in request
    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.name, error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = protect;