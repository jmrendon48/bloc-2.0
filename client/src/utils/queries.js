import gql from "graphql-tag";

export const QUERY_REVIEWS = gql`
  query reviews($username: String) {
    reviews(username: $username) {
      _id
      title
      gameTitle
      gameCoverUrl
      reviewBody
      rating
      createdAt
      username
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      reviews {
        _id
        title
        gameTitle
        gameCoverUrl
        reviewBody
        rating
        createdAt
        username
      }
      reviewCount
      follows {
        _id
        username
      }
      followCount
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      reviews {
        _id
        title
        gameTitle
        gameCoverUrl
        reviewBody
        rating
        createdAt
        username
      }
      reviewCount
      follows {
        _id
        username
      }
      followCount
    }
  }
`;

export const QUERY_REVIEWGAME = gql`
  query reviewGame($gameTitle: String!) {
    reviewGame(gameTitle: $gameTitle) {
      _id
      title
      gameTitle
      gameCoverUrl
      reviewBody
      rating
      createdAt
      username
    }
  }
`;

export const QUERY_GAME = gql`
  query game($name: String!){
    game(name: $name){
      _id
      name
      gameId
      coverUrl
      summary
    }
  }`