import { assert, expect } from "chai";
import sinon from "sinon";
import app from "../appTest";
import request from "supertest";



describe.only("postController", () => {
  let postId: number;


  afterEach(async () => {
    const response = await request(app).get("/posts");
    console.log("\n--- Actual DB state ---");
    console.table(response.body.data);
  });



  //Create
  it("Should create a new post", async () => {
    const response = await request(app).post("/posts").send({
      user_id: 4,
      title: "Prova"
    });

    postId = response.body.data.id;

    console.log("Test begun with post Id:", postId);
    expect(response.statusCode).to.be.equal(201);
  });

//   //Update
//   it("Should update an user", async () => {
//     const response = await request(app).patch(`/users/${userId}`).send({
//       nickname: "James",
//       age: 28,
//       city: "New York",
//     });

//     expect(response.statusCode).to.be.equal(200);
//   });

  //Delete
    it("Should delete a post", async () => {

    const response = await request(app).delete(`/posts/${postId}`);

    expect(response.statusCode).to.be.equal(200);
  });
});
