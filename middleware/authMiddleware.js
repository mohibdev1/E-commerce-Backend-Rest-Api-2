const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.query.apiKey;

  if (!apiKey) {
    return res.status(401).json({
      status: false,
      message: "API Key is required",
    });
  }

  if (apiKey !== "123456") {
    return res.status(401).json({
      status: false,
      message: "Invalid API Key",
    });
  }

  next();
};

module.exports = apiKeyMiddleware;