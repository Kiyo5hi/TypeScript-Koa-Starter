import request from "supertest";
import server from "../src/server";

describe("GET /", function () {
    it("should return 200 OK", function (done) {
        request(server).get("/").expect(200, done);
    });
});
