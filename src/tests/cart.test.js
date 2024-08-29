const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");

const BASE_URL_LOGIN = "/api/v1/users/login";
const BASE_URL = "/api/v1/cart";
let TOKEN;

let cart;
let cartId;
let product;

beforeAll(async () => {
  const hits = {
    email: "jose@academlo.com",
    password: "12345",
  };

  const res = await request(app).post(BASE_URL_LOGIN).send(hits);

  TOKEN = res.body.token;

  product = await Product.create({
    title: "MV Augusta Dragster ",
    description:
      "La MV Agusta Dragster es la moto naked de cilindrada media que está revolucionando el mundo del motociclismo.",
    price: 40000,
  });

  // userc = await User.create({
  //   firstName: "Juan Jose",
  //   lastName: "Medina",
  //   email: "jose.medina@academlo.com",
  //   password: "12345",
  //   celphone: "3112762352",
  // });

  cart = {
    quantity: 1,
    productId: product.id,
  };
});

afterAll(async () => {
  await product.destroy();
});

test("POST -> 'BASE_URL', should return status code 201, and res.body.quantity === product.quantity", async () => {
  // console.log(TOKEN);

  const res = await request(app)
    .post(BASE_URL)
    .send(cart)
    .set("Authorization", `Bearer ${TOKEN}`);

  // console.log(res.body);
  cartId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.quantity).toBe(cart.quantity);
  expect(res.body.productId).toBe(product.id);
  // expect(res.body.us}erId).toBe(user.id);
});

test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 2", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);
  // console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
});

test("GET -> 'BASE_URL/:id', should return status code 200, and res.body.quantity === cart.quantity", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${cartId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  // console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();

  //1:n
  expect(res.body.product.id).toBeDefined();
  expect(res.body.product.id).toBe(product.id);
  expect(res.body.quantity).toBe(cart.quantity);
});

test("PUT-> 'BASE_URL/:id', should return status code 200, and res.body.quantity === updateCart.quantity", async () => {
  const updateQuantity = {
    quantity: 4,
  };

  const res = await request(app)
    .put(`${BASE_URL}/${cartId}`)
    .send(updateQuantity)
    .set("Authorization", `Bearer ${TOKEN}`);
  // console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.quantity).toBe(updateQuantity.quantity);
});

test("DELETE-> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${cartId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(204);
});
