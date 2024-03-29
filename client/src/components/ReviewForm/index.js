import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_REVIEW } from "../../utils/mutations";
import { QUERY_REVIEWS } from "../../utils/queries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ReviewForm = (props) => {
  const { gameTitle, gameId,  gameCoverUrl, setShowReviewModal  } = props
  console.log(gameTitle);
  const [addReview, { error }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      // read what's currently in the cache
      const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

      // prepend the newest thought to the front of the array
      cache.writeQuery({
        query: QUERY_REVIEWS,
        data: { reviews: [addReview, ...reviews] },
      });
    },
  });

  const [title, setTitle] = useState("");
  const [titleCharacterCount, setTitleCharacterCount] = useState(0);

  const [reviewBody, setReviewBody] = useState("");
  const [reviewBodyCharacterCount, SetReviewBodyCharacterCount] = useState(0);

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleTitleChange = (event) => {
    if (event.target.value.length <= 30) {
      setTitle(event.target.value);
      setTitleCharacterCount(event.target.value.length);
    }
  };

  const handlereviewBodyChange = (event) => {
    if (event.target.value.length <= 1000) {
      setReviewBody(event.target.value);
      SetReviewBodyCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addReview({
        variables: { title: title, gameId: gameId, gameTitle: gameTitle, gameCoverUrl: gameCoverUrl, reviewBody: reviewBody, rating: rating },
      });

      // clear form value
      
      setTitle("");
      setTitleCharacterCount(0);
      setReviewBody("");
      SetReviewBodyCharacterCount(0);
      setShowReviewModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  const StarRating = () => {
    return (
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label>
              <input 
              type='radio' 
              name='rating' 
              value={ratingValue} 
              onClick={() => setRating(ratingValue)}
              />
              <FontAwesomeIcon className='star'
                icon='star'
                size='2x'
                color= {ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          )
        })}
        <h5> {rating}/5 Stars </h5>
      </div>
    )
  }

  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Whats the title of your review?"
          value={title}
          className="form-input col-12 col-md-9"
          onChange={handleTitleChange}
        ></textarea>
        <p className={`m-0 ${titleCharacterCount === 30 ? "text-error" : ""}`}>
          Character Count: {titleCharacterCount}/30
        </p>

        <textarea
          placeholder="Here's a new review..."
          value={reviewBody}
          className="form-input col-12 col-md-9"
          onChange={handlereviewBodyChange}
        ></textarea>
        <p
          className={`m-0 ${reviewBodyCharacterCount === 1000 ? "text-error" : ""
            }`}
        >
          Character Count: {reviewBodyCharacterCount}/1000
        </p>
        <StarRating />

        {error && <span className="ml-2">Something went wrong...</span>}
        <button className="btn btn-success col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>

      

    </div>
  );
};

export default ReviewForm;
