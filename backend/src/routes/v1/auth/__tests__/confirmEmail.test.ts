import { UserModel } from "../../../../models/User";
import request from "supertest";
import app from "../../../..";

describe.only("GET v1/auth/confirm?code=:confirmationCode", () => {
  it("200 - should confirm an unconfirmed user", async () => {
    const emailConfirmationCodeExpDate = new Date();
    emailConfirmationCodeExpDate.setHours(
      emailConfirmationCodeExpDate.getHours() + 24
    );

    // create mock user
    const user = new UserModel({
      username: "test user",
      unconfirmedEmail: "test-confirmEmail@email.com",
      password: "Password1",
      emailConfirmationCode: "ea50fae0-9482-42b6-84bb-59f3b641ada9",
      emailConfirmationCodeExpDate,
    });
    await user.save();

    const id: string = user.id;

    // validate user
    await request(app)
      .get(`/v1/auth/confirm?code=ea50fae0-9482-42b6-84bb-59f3b641ada9`)
      .expect(200);

    const confirmedUser = await UserModel.findById(id);

    expect(confirmedUser).not.toBeNull();
    expect(confirmedUser?.email).toBe("test-confirmEmail@email.com");
    expect(confirmedUser?.unconfirmedEmail).toBeUndefined();
    expect(confirmedUser?.emailConfirmationCode).toBeUndefined();
    expect(confirmedUser?.emailConfirmationCodeExpDate).toBeUndefined();
  });

  it("400 - should raise an error, missing code", async () => {
    await request(app).get(`/v1/auth/confirm?code=`).expect(400);
  });

  it("400 - should raise an error, invalid code", async () => {
    await request(app).get(`/v1/auth/confirm?code=ciao`).expect(400);
  });

  it("404 - should raise an error, user not found", async () => {
    await request(app)
      .get(`/v1/auth/confirm?code=ea50fae0-9482-42b6-84bb-59f3b641ada9`)
      .expect(404);
  });

  it("400 - should raise an error, confirmation code expired", async () => {
    // create mock user
    const user = new UserModel({
      username: "test user",
      unconfirmedEmail: "test-confirmEmail@email.com",
      password: "Password1",
      emailConfirmationCode: "ea50fae0-9482-42b6-84bb-59f3b641ada9",
      emailConfirmationCodeExpDate: new Date(),
    });
    await user.save();

    // validate user
    await request(app)
      .get(`/v1/auth/confirm?code=ea50fae0-9482-42b6-84bb-59f3b641ada9`)
      .expect(400);
  });
});
