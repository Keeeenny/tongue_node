import { expect } from "chai";
import app from "../appTest";
import request from "supertest";

describe("UserController", () => {
  let userId: number;

  const createPayload = {
    nickname: "John Doe",
    age: 67,
    city: "Canada",
  };

  const updateNicknamePayload = {
    nickname: "Mario",
  };

  const updateAgePayload = {
    age: 34,
  };

  const updateCityPayload = {
    city: "Milano",
  };

  afterEach(async () => {
    const response = await request(app).get("/users");
    console.log("\n--- Actual DB state ---");
    console.table(response.body.data);
  });

  //Create
  it("Should create a new user", async () => {
    const response = await request(app).post("/users").send(createPayload);

    userId = response.body.data.id;

    console.log("Test begun with user Id:", userId);
    expect(response.statusCode).to.be.equal(201);
  });

  //Updates
  it("Should update only the user's nickname", async () => {
    const response = await request(app)
      .patch(`/users/${userId}`)
      .send(updateNicknamePayload);

    expect(response.statusCode).to.be.equal(200);
  });

  it("Should update only the user's age", async () => {
    const response = await request(app)
      .patch(`/users/${userId}`)
      .send(updateAgePayload);

    expect(response.statusCode).to.be.equal(200);
  });

  it("Should update only the user's city", async () => {
    const response = await request(app)
      .patch(`/users/${userId}`)
      .send(updateCityPayload);

    expect(response.statusCode).to.be.equal(200);
  });

  //Delete
  it("Should delete an user", async () => {
    if (!userId) {
      expect.fail("There is no user to delete");
    }

    const response = await request(app).delete(`/users/${userId}`);

    expect(response.statusCode).to.be.equal(200);
  });
});
