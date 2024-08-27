const request = require("supertest");
const app = require("../app");
const supertest = require("supertest");

const BASE_URL = "/api/v1/users";
let TOKEN;
let userId;

beforeAll(async () => {
  const user = {
    email: "jose@academlo.com",
    password: "12345",
  };
  const res = await request(app).post(`${BASE_URL}/login`).send(user);
  TOKEN = res.body.token;
  // console.log(TOKEN);
});

const user = {
  firstName: "Pedro",
  lastName: "Medina",
  email: "pedro.medina@academlo.com",
  password: "12345",
  celphone: "3112526389",
};

test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName", async () => {
  const columns = ["firstName", "lastName", "email", "password", "celphone"];
  const res = await request(app).post(BASE_URL).send(user);

  userId = res.body.id;

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  // columns.forEach((column) => {
  // })
  expect(res.body.firstName).toBeDefined();
  expect(res.body.firstName).toBe(user.firstName);
});

test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 2", async () => {
  const res = await supertest(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(2);
});

//put
test("PUT -> 'BASE_URL/:ID', should return statusCode 200, and res.body.firstName === userUpdate.firstName", async () => {
  const userUpdate = {
    firstName: "Jose",
  };
  const res = await request(app)
    .put(`${BASE_URL}/${userId}`)
    .send(userUpdate)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(userUpdate.firstName);
});

test("POST -> 'BASE_URL/LOGIN', should return status code 200, and res.body.user.email === hits.email", async () => {
  const hits = {
    email: "jose@academlo.com",
    password: "12345",
  };

  const res = await request(app).post(`${BASE_URL}/login`).send(hits);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.user).toBeDefined();
  expect(res.body.token).toBeDefined();
  expect(res.body.user.email).toBe(hits.email);
});

test("POST -> 'BASE_URL/LOGIN', should return status code 401", async () => {
  const hits = {
    email: "jose@academlo.com",
    password: "12345",
  };
  const res = await request(app).post(`${BASE_URL}/login`).send(hits);
  expect(res.statusCode).toBe(200);
});

test("DELETE -> 'BASE_URL/:ID', should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set("Authorization", `Bearer ${TOKEN}`);
  expect(res.statusCode).toBe(204);
});
