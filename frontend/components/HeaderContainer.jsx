import { connect } from 'react-redux';
import { showFeedbackModal } from '../redux/actions';

import Header from './Header/Header';

const mapDispatchToProps = dispatch => ({
  onClickFeedback: () => dispatch(showFeedbackModal()),
});

export default connect(null, mapDispatchToProps)(Header);
