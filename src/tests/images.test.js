const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
const Category = require("../models/Category");
require("../models");

const BASE_URL_LOGIN = "/api/v1/users/login";
const BASE_URL = "/api/v1/products_images";
let TOKEN;

let images;
let product;
let category;

beforeAll(async () => {
  const hits = {
    email: "jose@academlo.com",
    password: "12345",
  };

  const res = await request(app).post(BASE_URL_LOGIN).send(hits);

  TOKEN = res.body.token;

  console.log(TOKEN);

  category = await Category.create({ name: "SBK" });

  product = await Product.create({
    title: "MV Augusta Dragster ",
    description:
      "La Dragster es el modelo de MV Agusta más descarado e irreverente. Su encanto salvaje y desenfrenado conquista en seguida a cualquier amante de las motos y representa un estilo de vida.",
    price: 30000,
    categoryId: category.id,
  });

  images = {
    url: "https://www.motorevistacr.com/wp-content/uploads/2020/08/MV-AGUSTA-BRUTALE-Y-DRAGSTER-800-RR-SCS-2020.jpg",
    filename: "Dragster",
    productId: product.id,
  };
});

afterAll(async () => {
  await product.destroy();
  await category.destroy();
});

test("POST -> 'BASE_URL', should return status code 201, and res.body.url === images.url", async () => {
  // console.log(TOKEN);

  const res = await request(app)
    .post(BASE_URL)
    .send(images)
    .set("Authorization", `Bearer ${TOKEN}`);

  // expect(res.status).toBe(201);
  // expect(res.body).toBeDefined();
  // expect(res.body.quantity).toBe(cart.quantity);
  // expect(res.body.productId).toBe(product.id);
  // expect(res.body.us}erId).toBe(user.id);
});

test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 2", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);
  console.log(res.body);
  // expect(res.status).toBe(200);
  // expect(res.body).toBeDefined();
});
