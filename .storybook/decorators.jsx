import React, { PropTypes } from 'react';
import { action } from '@kadira/storybook';

const router = {
  history: {
    createHref: link => `#${link}`,
    push: action('router.push'),
    replace: action('router.replace'),
  },
};

class RouterContext extends React.Component {
  getChildContext() {
    return { router };
  }

  render() {
    return this.props.children;
  }
}

RouterContext.childContextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      createHref: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

RouterContext.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export const withRouterContext = (story) => {
  return (
    <RouterContext>
      {story()}
    </RouterContext>
  );
};
