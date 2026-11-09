import { assert, expect } from "chai";
import sinon from "sinon";
import app from "../appTest";
import request from "supertest";

import { userRepository } from "../repositories/userRepository";
import { postRepository } from "../repositories/postRepository";


describe("Various Test", () => {

let createPostStub: sinon.SinonStub;
let deletePostStub: sinon.SinonStub;

beforeEach(() => {
  // findByIdStub = sinon.stub(userRepository, "findById").resolves({ id: 1, nickname: "Ken", age: 24, city: "Milan" } as any);
  // patchStub = sinon.stub(userRepository, "patch").resolves(true);
  createPostStub = sinon.stub(postRepository, "create").resolves(true);
  deletePostStub = sinon.stub(postRepository, "delete").resolves(true);
});

afterEach(() => {
  // findByIdStub.restore();
  // patchStub.restore();
  // createPostStub.restore();
  deletePostStub.restore();
});

  //Delete
  it("Should delete a post", async () => {

    const response = await request(app).delete(`/posts/4`);

    expect(response.statusCode).to.be.equal(200);
  });
});
