import request from "supertest";
import app from "../../../..";
import { UserModel } from "../../../../models/User";

describe("/signup", () => {
  it("201 - should create a new user", async () => {
    await request(app)
      .post("/v1/auth/signup")
      .send({
        username: "test user",
        email: "test@email.com",
        password: "Password1",
      })
      .expect(201);

    const newUser = await UserModel.findOne({
      unconfirmedEmail: "test@email.com",
    });
    expect(newUser).not.toBeNull();
    expect(newUser?.username).toBe("test user");
  });

  it("400 - should raise an error, missing username", async () => {
    await request(app)
      .post("/v1/auth/signup")
      .send({
        email: "test@email.com",
        password: "Password1",
      })
      .expect(400);
  });

  it("400 - should raise an error, missing email", async () => {
    await request(app)
      .post("/v1/auth/signup")
      .send({
        username: "test user",
        password: "Password1",
      })
      .expect(400);
  });

  it("400 - should raise an error, missing password", async () => {
    await request(app)
      .post("/v1/auth/signup")
      .send({
        username: "test user",
        email: "test@email.com",
      })
      .expect(400);
  });

  it("400 - should raise an error, invalid email", async () => {
    await request(app)
      .post("/v1/auth/signup")
      .send({
        username: "test user",
        email: "wrong_email",
        password: "Password1",
      })
      .expect(400);
  });

  it("400 - should raise an error, short password", async () => {
    await request(app)
      .post("/v1/auth/signup")
      .send({
        username: "test user",
        email: "test@email.com",
        password: "Pass1",
      })
      .expect(400);
  });

  it("400 - should raise an error, no upper case in password", async () => {
    await request(app)
      .post("/v1/auth/signup")
      .send({
        username: "test user",
        email: "test@email.com",
        password: "password1",
      })
      .expect(400);
  });

  it("400 - should raise an error, no lowercase case in password", async () => {
    await request(app)
      .post("/v1/auth/signup")
      .send({
        username: "test user",
        email: "test@email.com",
        password: "PASSWORD1",
      })
      .expect(400);
  });

  it("400 - should raise an error, no number in password", async () => {
    await request(app)
      .post("/v1/auth/signup")
      .send({
        username: "test user",
        email: "test@email.com",
        password: "Password",
      })
      .expect(400);
  });
});
