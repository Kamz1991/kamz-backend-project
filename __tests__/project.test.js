const request = require("supertest");
const db = require("../db/connection");
const app = require("../db/app");
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
