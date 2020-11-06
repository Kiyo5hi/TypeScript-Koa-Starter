import request from "supertest";
import server from "../src/server";

describe("GET /", function () {
    it("should return 200 OK", function (done) {
        request(server).get("/").expect(200, done);
    });
});

describe("POST /user", function () {
    it("should return 422 Unprocessable Entity", function (done) {
        request(server).post("/user").send({email:"{}}"}).expect(422, done);
    });
});

describe("POST /user", function () {
    it("should return 201 Created", function (done) {
        request(server).post("/user").send({email:"jesttest@k1yoshi.com", password: "testAccount123"}).expect(201, done);
    });
});

describe("GET /user", function () {
    it("should return 200 User Document", function (done) {
        request(server).get("/user").send({email:"jesttest@k1yoshi.com"}).expect(200, done);
    });
});

describe("POST /user", function () {
    it("should return 400 Duplicate Email", function (done) {
        request(server).post("/user").send({email:"jesttest@k1yoshi.com", password: "123123123"}).expect(400, done);
    });
});

describe("DELETE /user", function () {
    it("should return 204 No Content", function (done) {
        request(server).delete("/user").send({email:"jesttest@k1yoshi.com"}).expect(204, done);
    });
});

describe("GET /user", function () {
    it("should return 422 Unprocessable Entity", function (done) {
        request(server).get("/user").expect(422, done);
    });
});
