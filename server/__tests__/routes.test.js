//routes.test.js
const request = require("supertest");
const server = require("../app.js");

beforeAll(async () => {
    // do something before anything else runs
    console.log("Server starting!");
});
// close the server after each test
afterAll(() => {
    server.close();
    console.log("Server closed!");
});

describe("basic route tests", () => {
    test("get home route GET /", async () => {
        const response = await request(server).get("/is-alive");
        expect(response.status).toEqual(200);
        expect(response.text).toContain("YES");
    });
});
