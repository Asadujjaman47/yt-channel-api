// utils/response.js

const response = (res, statusCode, data, message = 'OK', error = null) => {
  const timestamp = new Date().toISOString();
  const responseType = statusCode >= 200 && statusCode < 300 ? 'success' : 'error';

  const responseObj = {
    timestamp,
    responseType,
    statusCode,
    message,
    data,
    error,
  };

  res.status(statusCode).json(responseObj);
};

module.exports = response;