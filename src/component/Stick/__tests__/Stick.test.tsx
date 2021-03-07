import React from 'react';
import Stick, { IPropTypes } from '../index';
// import STICK_TYPE from '../../../declaration_types/Stick';
import { render } from '@testing-library/react';

import { getByTestId } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect';

let props: IPropTypes = {
  stick: {
    id: 'stick-2',
    type: 'stick',
    startColor: '#67e0d7',
    endColor: '#67e0d7',
    delay: 0,
    points: 10,
  },
  active: false,
  style: {
    width: '50px',
  },
};

test('test the AnimatedStick is close', () => {
  const { container } = render(<Stick {...props} />);
  expect(getByTestId(container, 'stick-2')).toBeInTheDocument();
  expect(getByTestId(container, 'stick-2')).toHaveStyle(`transform: scaleX(0)`);
});

test('test the AnimatedStick is open', () => {
  const updatedProps: IPropTypes = { ...props, active: true };
  const { container } = render(<Stick {...updatedProps} />);
  expect(getByTestId(container, 'stick-2')).toBeInTheDocument();
  expect(getByTestId(container, 'stick-2')).toHaveStyle(`transform: scaleX(1)`);
});
