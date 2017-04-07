import { connect } from 'react-redux';
import { showFAQModal } from '../redux/actions';

import Footer from './Footer/Footer';

const mapDispatchToProps = dispatch => ({
  onClickFAQ: () => dispatch(showFAQModal()),
});

export default connect(null, mapDispatchToProps)(Footer);
