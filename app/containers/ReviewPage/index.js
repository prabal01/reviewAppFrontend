/**
 *
 * ReviewPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import './stylesheets/style.css'
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectReviewPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchReviews, postReview } from './actions';
import { Link } from 'react-router-dom';

export function ReviewPage(props) {
  const [ratingState, setRating] = useState(5)
  const [reviewState, setReview] = useState('')
  const [showWarning, setShowWarning] = useState(false)
  const [disableButton, setDisableButton] = useState(false)
  useInjectReducer({ key: 'reviewPage', reducer });
  useInjectSaga({ key: 'reviewPage', saga });
  const {fetchReviews} = props
  useEffect(()=>{
    const {location:{search}} = props ;
    const profileId = search.split("?")[1].split("&")[0].split('=')[1];
    fetchReviews(profileId)
  },[])
  const {reviewPage:{reviews,isReviewFetching,err}} = props
  const {location:{search}} = props ;
  const profileId = search.split("?")[1].split("&")[0].split('=')[1];
  const name = search.split("?")[1].split("&")[1].split('=')[1]
  const {postReviewData} =props
  return (
    <div className='reviewContainer'>
      <Link to='/' style={{textDecoration:'none'}}> 
      <div style={{color:'white',textAlign:'center'}}>Home</div>
      <h1 className="reviewerName" style={{margin:0}}> {`${name}'s Reviews`} </h1>
      </Link>
      <div className='topBar'>
      <input type="text" placeholder='Write Review' value={reviewState} onChange={(e)=>setReview(e.target.value)}/>
      <input type="text" placeholder='Rating' value={ratingState} onChange={(e)=>{
        if((e.target.value >=1 && e.target.value <=5)||e.target.value==''){
          console.log(e.target.value)
          if(e.target.value == ''){
            setDisableButton(true)
            setRating(e.target.value)
          }else{
            setRating(e.target.value)
            setShowWarning(false)
            setDisableButton(false)
          }
        }else{
          setShowWarning(true)
        }
        return 
      }}/><br/>
      {showWarning&&<p style={{color:'red'}}>Please enter a rating between 1 and 5</p>}
      <button className='reviewButton' disabled={disableButton} onClick={()=>postReviewData({profileId,review:reviewState,rating:ratingState})}>Post Review</button>
      </div>
      <div className = 'reviews'> 
      {isReviewFetching ?  <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div> : reviews.length ==0 && !err ? <div className='reviewerName'>No Reviews!</div> : err ? <div className='reviewerName'>Something went wrong, Try reloading the app</div>:
      reviews.map((reviewObj)=>{
        return(
            <div className='reviewWrapper' key={reviewObj.reviewId}>
            <div className= 'reviewerName'>anonymous </div>
            <div className = 'rating'>{'⭐️'.repeat(parseInt(reviewObj.rating)) }</div>
            <div className = 'review'>{reviewObj.review}</div>
            </div>

        )
      })}
       </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  reviewPage: makeSelectReviewPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchReviews:(id)=>dispatch(fetchReviews(id)),
    postReviewData:(data)=>{dispatch(postReview(data))}
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ReviewPage);
