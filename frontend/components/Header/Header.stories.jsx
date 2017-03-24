import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Header from './Header';

storiesOf('Header', module)
  .add('Top Header', () => (
    <Header />
  ));
