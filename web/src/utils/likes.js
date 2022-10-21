import { LIKES_ENUM } from "~/consts/validation";

const cacheNewLike = (draft, patch) => {
  const authorCondition = (v) => v.author === patch.author;
  let like = draft.find(authorCondition);
  let likeIdx = draft.findIndex(authorCondition);

  if (!like) {
    draft.push(patch);
    return;
  }

  draft.splice(likeIdx, 1);
  if (like.type !== patch.type) {
    draft.push(patch);
  }
};

const cacheEntityRating = (draft, patch, entityId) => {
  let toModify = !Array.isArray(draft)
    ? draft
    : draft.find((v) => v.id === entityId);

  let rating = toModify.rating;
  const toDeleteLike = patch.type === patch.cachedType;
  const likeSwitched = patch.cachedType && !toDeleteLike;

  const ratingChange = (type) => (type === LIKES_ENUM[0] ? 1 : -1);

  if (toDeleteLike) {
    rating += ratingChange(patch.type) * -1;
  } else {
    const change = ratingChange(patch.type);
    rating += likeSwitched ? 2 * change : change;
  }

  Object.assign(toModify, { rating });
};

export { cacheNewLike, cacheEntityRating };
