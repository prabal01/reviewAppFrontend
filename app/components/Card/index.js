import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
export default function ProfileCard({name,profession,img,profileId}) {
//   const name = 'Prabal';
//   const profession = 'Software Developer';
  const profilePic = `https://i.mdel.net/i/db/${img}`;
  console.log('hereeeeee');
  return (
      <div className='outline'>

    <div className="cardContainer">
        <div className="image">
          <img src={profilePic} alt="" />
        </div>
      <div className="content">
          <div className="name">{name}</div>
        <div className="info">
          <div className="profession">{profession}</div>
        </div>
      </div>
      <div className="buttonsDiv">
          <Link to={`/review?id=${profileId}&name=${name.split(' ')[0]}`}>
        <button className='reviewButton'>✍🏻 Review</button>
        </Link>
      </div>
    </div>
      </div>
  );
}
