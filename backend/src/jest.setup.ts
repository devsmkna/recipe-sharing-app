import mongoose from "mongoose";

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections();

  if (collections) {
    collections.forEach(async (collection) => await collection.deleteMany({}));
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
