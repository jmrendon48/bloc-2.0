import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_REVIEWS } from '../utils/queries';
import ReviewList from '../components/ReviewList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
    
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_REVIEWS);

    const reviews = data?.reviews || [];
    console.log(reviews);
    
    return (
        <div>
            <div class="jumbotron jumbotron-fluid">
                <div class="container banner">
                    <h1 class="display-4 banner">Welcome to Bloc <FontAwesomeIcon icon = 'cube' color='#4361ee'/>
                    </h1>
                    <p class="banner" >Game reviews by (real) Gamers.</p>
                </div>
            </div>
            <div>
                <h4 className='small-title'>Recent Reviews</h4>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ReviewList reviews={reviews}/>
            )}
            </div>
        </div>
    );
};
export default Home;