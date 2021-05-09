const reviewsService = require("./reviews.service");

// Validation Middleware

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    const { review_id, content, score, critic_id, movie_id, surname, preferred_name, organization_name, created_at, updated_at } = review;
    const detailedReview = { review_id, content, score, critic_id, movie_id, created_at, updated_at, critic: { surname, critic_id, preferred_name, organization_name } };
    res.locals.review = detailedReview;
    return next();
  }
  next({
    status: 404,
    message: `Review id ${req.params.reviewId} cannot be found`
  });
}

// Route Handlers

async function read(req, res, next) {
  res.json({ data: res.locals.review })
}

function destroy(req, res, next) {
  reviewsService
    .destroy(res.locals.review.review_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

async function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id
  }
  const data = await reviewsService.update(updatedReview);
  res.json({ data: { ...res.locals.review, ...updatedReview } })
}

module.exports = {
  read: [reviewExists, read],
  destroy: [reviewExists, destroy],
  update: [reviewExists, update]
}