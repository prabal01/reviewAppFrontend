import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SmoothList from 'react-smooth-list';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getProfiles } from './actions';
import './stylesheets/style.css';
import ProfileCard from '../../components/Card';
export function HomePage(props) {
  useInjectReducer({ key: 'homepage', reducer });
  useInjectSaga({ key: 'homepage', saga });

  useEffect(() => {
    const { getProfilesData } = props;
    getProfilesData();
  }, []);
  const {
    homepage: { isHomePageLoading, profiles },
  } = props;

  return (
    <SmoothList className="homePageDiv">
      {isHomePageLoading ? (
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
          profiles.map((profile,index) => {
            return (
              <ProfileCard
                key={profile.slug+index}
                name={profile.name}
                profession={profile.type}
                img={profile.image}
                profileId={profile.uid}
              />
            );
          })
      )}
    </SmoothList>
  );
}

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProfilesData: () => dispatch(getProfiles()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
