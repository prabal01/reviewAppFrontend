import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the test state domain
 */

const selectHomePageDomain = state => state.homepage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Test
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );

export default makeSelectHomePage;
export { selectHomePageDomain };
