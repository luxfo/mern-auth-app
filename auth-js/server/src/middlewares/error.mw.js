function errorMw(err, req, res, next) {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: err.message });
  }

  if (err.name === "ApiError") {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      error: err.message,
    });
  }
  // default to 500 server error
  return res.status(500).json({ message: err.message });
}

export default errorMw;
