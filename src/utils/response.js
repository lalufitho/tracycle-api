const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    payload: {
      message,
      data,
    },
    metadata: {
      prev: '',
      next: '',
      current: '',
    },
  });
};

module.exports = response;
