import ApiError from "../error-handling/api.error";

export default function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({
    message: "Не предвиденная ошибка сервера",
    errorMessage: err.message,
  });
}
