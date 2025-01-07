module.exports = (error, req, res, next) => {
  console.error(error);
  response(res, 500, null, "Internal Server Error", error);
};