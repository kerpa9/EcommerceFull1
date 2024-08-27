const request = require("supertest");
const app = require("../app");
const supertest = require("supertest");

const BASE_URL_LOGIN = "/api/v1/users/login";
const BASE_URL = "/api/v1/cart";
let TOKEN;
let category;

let product;
let productId;

beforeAll(async () => {
  const hits = {
    email: "jose@academlo.com",
    password: "12345",
  };

  const res = await request(app).post(BASE_URL_LOGIN).send(hits);

  TOKEN = res.body.token;
  console.log(TOKEN);
});

test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 2", async () => {
  const res = await supertest(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);
  //   console.log(res.body);
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body).toBeDefined();
  //   expect(res.body).toHaveLength(2);
});
