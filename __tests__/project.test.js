const request = require("supertest");
const db = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("1. GET /api/topics", () => {
  test("status:200, responds with an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics).toBeInstanceOf(Array);
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              description: expect.any(String),
              slug: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/articles/article:id", () => {
  test("status:200, responds with requested article", async () => {
    const res = await request(app).get("/api/articles/1").expect(200);
    expect(res.body.article).toMatchObject({
      article_id: 1,
      title: expect.any(String),
      author: expect.any(String),
      body: expect.any(String),
      created_at: expect.any(String),
      votes: expect.any(Number),
    });
  });
  test("400 when article_id is not an integer", () => {
    return request(app)
      .get("/api/articles/badId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("404: for an article_id that does not exist", () => {
    return request(app)
      .get("/api/articles/1000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("article not found");
      });
  });
});

describe(" PATCH /api/articles/:article_id", () => {
  test("status:200, responds with the updated article", () => {
    const articleUpdates = {
      inc_votes: 50,
    };
    return request(app)
      .patch("/api/articles/1")
      .send(articleUpdates)
      .expect(200)
      .then((results) => {
        expect(results.body).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: 150,
          })
        );
      });
  });
  test(" 400: no inc votes on requested body", () => {
    const articleUpdates = {};
    return request(app)
      .patch("/api/articles/1")
      .send(articleUpdates)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("invalid inc votes like a string instead of a number", () => {
    const articleUpdates = {
      inc_votes: "dog",
    };
    return request(app)
      .patch("/api/articles/1")
      .send(articleUpdates)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("invalid article id request", () => {
    const articleUpdates = {
      inc_votes: 50,
    };
    return request(app)
      .patch("/api/articles/1000")
      .send(articleUpdates)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("article not found");
      });
  });
});

describe("1. GET /api/users", () => {
  test("status:200, responds with an array usernames", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toBeInstanceOf(Array);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/articles/article:id/comment count", () => {
  test("status:200, responds with requested article", async () => {
    const res = await request(app).get("/api/articles/1").expect(200);
    expect(res.body.article).toMatchObject({
      article_id: 1,
      author: expect.any(String),
      body: expect.any(String),
      comment_count: expect.any(String),
      created_at: expect.any(String),
      title: expect.any(String),
      votes: expect.any(Number),
    });
  });
});

describe(" GET /api/articles", () => {
  test("status:200, responds with an array of articles objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toBeInstanceOf(Array);
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              author: expect.any(String),
              body: expect.any(String),
              // comment_count: expect.any(String)
              created_at: expect.any(String),
              title: expect.any(String),
              topic: expect.any(String),
              votes: expect.any(Number),
            })
          );
        });
      });
  });
});
describe(" Post /api/articles/:article_id", () => {
  test("status:201, responds with newly posted comment ", () => {
    const newComment = {
      username: "butter_bridge",
      body: "The greatest alive",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then((results) => {
        expect(results.body.comment).toEqual({
          article_id: 1,
          author: "butter_bridge",
          body: "The greatest alive",
          comment_id: 19,
          created_at: expect.any(String),
          votes: 0,
        });
      });
  });

  describe(" GET /api/articles/:article_id/comments", () => {
    test("status:200, an array of comments for the given article_id ", () => {
      return request(app)
        .get("/api/articles/3/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeInstanceOf(Array);
          comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                comment_id: expect.any(Number),
                author: expect.any(String),
                body: expect.any(String),
              })
            );
          });
        });
    });
    test("status: 204 no comments found for that article id", () => {
      return request(app)
        .get("/api/articles/4/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toEqual([]);
        });
    });
    test("404: for an article_id that does not exist ", () => {
      return request(app)
        .get("/api/articles/1000/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("article not found");
        });
    });
    test("400 when article_id is not an integer", () => {
      return request(app)
        .get("/api/articles/badId/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("bad request");
        });
    });
  });
});
// describe("GET /api/articles queries", () => {
//   test("200: sorted by date descending as default", async () => {
//     const res = await request(app).get("/api/articles").expect(200);
//     console.log(res.body);
//     expect(res.body).toBeSortedBy("created_at", { coerce: true });
//   });
//   test("200: sorted by any given column in descending order as default", async () => {
//     const res = await request(app)
//       .get("/api/articles?sort_by=article_id")
//       .expect(200);
//     console.log(res.body);
//     expect(res.body).toBeSortedBy("article_id", {
//       coerce: true,
//       descending: true,
//     });
//     const res2 = await request(app)
//       .get("/api/articles?sort_by=comment_count")
//       .expect(200);
//     expect(res2.body).toBeSortedBy("comment_count", {
//       coerce: true,
//       descending: true,
//     });
//   });
//   test("200: sorted by any given column in choice of descending/ascending order", async () => {
//     const res = await request(app)
//       .get("/api/articles?sort_by=article_id&order=asc")
//       .expect(200);
//     expect(res.body).toBeSortedBy("article_id", {
//       coerce: true,
//       ascending: true,
//     });
//     const res2 = await request(app)
//       .get("/api/articles?sort_by=comment_count&order=asc")
//       .expect(200);
//     expect(res2.body).toBeSortedBy("comment_count", {
//       coerce: true,
//       ascending: true,
//     });
//   });
//   test("200: returns in order of choice sorted by date when given no column", async () => {
//     const res = await request(app).get("/api/articles?order=asc").expect(200);
//     expect(res.body).toBeSortedBy("created_at", {
//       coerce: true,
//       ascending: true,
//     });
//     const res2 = await request(app).get("/api/articles?order=desc").expect(200);
//     expect(res2.body).toBeSortedBy("created_at", {
//       coerce: true,
//       descending: true,
//     });
//   });
//   test("200: returns articles on a given topic", async () => {
//     const res = await request(app).get("/api/articles?topic=mitch").expect(200);
//     res.body.forEach((article) => {
//       expect(article.topic).toBe("mitch");
//     });
//   });
//   test("204: returns an empty array when given a topic which exists but has no articles", async () => {
//     const res = await request(app).get("/api/articles?topic=paper").expect(204);
//   });
//   test("200: returns articles of single topic with correct sorting and ordering if given all 3 queries", async () => {
//     const res = await request(app)
//       .get("/api/articles?sort_by=comment_count&order=desc&topic=mitch")
//       .expect(200);
//     res.body.forEach((article) => {
//       expect(article.topic).toBe("mitch");
//     });
//     expect(res.body).toBeSortedBy("comment_count", {
//       coerce: true,
//       descending: true,
//     });
//   });
//   test("400: returns error when sort_by isn't a column", async () => {
//     const res = await request(app)
//       .get("/api/articles?sort_by=donkeys&order=asc")
//       .expect(400);
//     expect(res.body.message).toBe("bad request");
//   });
//   test("400: returns error when order isn't asc/desc", async () => {
//     const res = await request(app)
//       .get("/api/articles?sort_by=created_at&order=delete")
//       .expect(400);
//     expect(res.body.message).toBe("bad request");
//   });
//   test("404: returns error message when topic is not found", async () => {
//     const res = await request(app)
//       .get("/api/articles?topic=football")
//       .expect(404);
//     expect(res.body.message).toEqual("topic not found");
//   });
// });
describe("DELETE /api/comments/:comment_id", () => {
  test("204: responds with an empty response body", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
});
describe("GET /api", () => {
  test("200: responds with an object containing all endpoints", async () => {
    const res = await request(app).get("/api").expect(200);
    const expected = {
      "GET /api": expect.any(Object),
      "GET /api/topics": expect.any(Object),
      "GET /api/articles": expect.any(Object),
      "GET /api/articles/:article_id": expect.any(Object),
      "GET /api/users": expect.any(Object),
      "GET /api/articles/:article_id/comments": expect.any(Object),
      "POST /api/articles/:article_id/comments": expect.any(Object),
      "PATCH /api/articles/:article_id": expect.any(Object),
      "DELETE /api/comments/:comment_id": expect.any(Object),
    };
    expect(res.body).toEqual(expected);
  });
});
