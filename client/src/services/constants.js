const apiUrl = {
  development: "http://localhost:7101/api/v1",
  production: "http://localhost:7101/api/v1",
};

export const HTTP = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE"
};

export const keys = {
  Token: "TODO__JWT",
  User: "TODO__USER"
};

export const endPoint =
  process.env.NODE_ENV === "development"
    ? apiUrl.development
    : apiUrl.production;
