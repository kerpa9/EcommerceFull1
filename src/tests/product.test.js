require("../models");
const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const ProductImg = require("../models/ProductImg");

const BASE_URL_LOGIN = "/api/v1/users/login";
const BASE_URL = "/api/v1/products";
// const SET_IMG_BASE_URL = "/api/v1/products/:id/images";
let TOKEN;
let category;

let product;
let createImage;
let productId;
// let imagesId;

beforeAll(async () => {
  const hits = {
    email: "jose@academlo.com",
    password: "12345",
  };

  const res = await request(app).post(BASE_URL_LOGIN).send(hits);

  TOKEN = res.body.token;
  // console.log(TOKEN);

  category = await Category.create({ name: "Naked" });

  product = {
    title: "MV Augusta Dragster ",
    description:
      "La Dragster es el modelo de MV Agusta más descarado e irreverente. Su encanto salvaje y desenfrenado conquista en seguida a cualquier amante de las motos y representa un estilo de vida.",
    price: 30000,
    categoryId: category.id,
  };
});

// beforeEach(() => {
//   console.log('Me ejecute antes del test');
// })

afterAll(async () => {
  await category.destroy();
});

test("POST -> 'BASE_URL', should return status code 201, and res.body.title === product.title", async () => {
  // console.log(TOKEN);

  const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`);

  // console.log(res.body);
  productId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.title).toBe(product.title);
  expect(res.body.categoryId).toBe(category.id);
});

test("GET -> 'BASE_URL', should return status code 200, and res.body.length = 1", async () => {
  const res = await request(app).get(BASE_URL);

  // console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  // expect(res.body).toHaveLength();

  //1:n
  expect(res.body[0].category.id).toBeDefined();
  expect(res.body[0].category.id).toBe(category.id);
});

test("GET -> 'BASE_URL/:id', should return status code 200, and res.body.title === product.title", async () => {
  const res = await request(app).get(`${BASE_URL}/${productId}`);

  // console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();

  //1:n
  expect(res.body.category.id).toBeDefined();
  expect(res.body.category.id).toBe(category.id);
});

test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.title === updateProduct.title", async () => {
  const updateProduct = {
    title: "Hyper Naked",
  };
  const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .send(updateProduct)
    .set("Authorization", `Bearer ${TOKEN}`);

  // console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.title).toBe(updateProduct.title);

  //1:n
  expect(res.body.categoryId).toBeDefined();
  expect(res.body.categoryId).toBe(category.id);
});

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  // console.log(res.body);

  expect(res.status).toBe(204);
});

test("POST -> 'SET_IMG_BASE_URL', should return status code 201, and res.body.image === product.image", async () => {
  // console.log(TOKEN);
  const images = {
    url: "http://localhost:8080/uploads/MV.jpg",
    filename: "MV.jpg",
    productId: product.id,
  };

  createImage = await ProductImg.create(images);

  const res = await request(app)
    .post(`${BASE_URL}/${productId}/images`)
    .send([createImage.id]);
  // .set("Authorization", `Bearer ${TOKEN}`);
  // imagesId = res.body.id;
  // console.log(res.body);

  // expect(res.status).toBe(201);
  // expect(res.body).toBeDefined();
  // expect(res.body.title).toBe(product.title);
  // expect(res.body.categoryId).toBe(category.id);

  await createImage.destroy();
});
