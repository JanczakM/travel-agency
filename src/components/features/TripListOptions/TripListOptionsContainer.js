import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, changeSearchPhrase, changeDuration, addTag, removeTag} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  // TODO - add more dispatchers for other filters
  changeDuration: (type, value, fromVal, toVal) => {
    if(type === 'from') {
      dispatch(changeDuration({[type]: value, to: toVal}));
    }
    else if(type === 'to') {
      dispatch(changeDuration({from: fromVal, [type]: value}));
    }
  },
  addTag: (tagsArray) => dispatch(addTag(tagsArray)),
  removeTag: (tagsArray) => dispatch(removeTag(tagsArray)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
