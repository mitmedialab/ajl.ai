import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs, text, number } from '@kadira/storybook-addon-knobs';

import ProgressBar from './';

storiesOf('ProgressBar', module)
  .addDecorator(withKnobs)
  .add('0%', () => (
    <ProgressBar current={1} total={4} incrementName="Step" />
  ))
  .add('75%', () => (
    <ProgressBar current={4} total={4} incrementName="Step" />
  ))
  .add('Configurable', () => (
    <ProgressBar
      current={number('Current', 2)}
      total={number('Total', 5)}
      incrementName={text('Screen reader increment label', 'Step')}
    />
  ));
