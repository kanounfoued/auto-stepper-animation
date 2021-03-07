import React from 'react';
import Circle, { IPropTypes } from '../index';
// import STICK_TYPE from '../../../declaration_types/Stick';
import { render } from '@testing-library/react';

import { getByTestId, getByLabelText } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect';

let props: IPropTypes = {
  circle: {
    id: 'cirlce-1',
    type: 'cirlce',
    startColor: '#67e0d7',
    endColor: '#67e0d7',
    delay: 0,
    points: 10,
    title: 'Qualifié',
  },
  active: false,
};

test('test the AnimatedCircle is scaled to 0', () => {
  const { container } = render(<Circle {...props} />);
  expect(getByTestId(container, 'cirlce-1')).toBeInTheDocument();
  expect(getByTestId(container, 'cirlce-1')).toHaveStyle(`transform: scale(0)`);
});

test('test the AnimatedCircle is scaled to 1', () => {
  const updatedProps: IPropTypes = { ...props, active: true };
  const { container } = render(<Circle {...updatedProps} />);
  expect(getByTestId(container, 'cirlce-1')).toBeInTheDocument();
  expect(getByTestId(container, 'cirlce-1')).toHaveStyle(`transform: scale(1)`);
});

test('test the label of the circle is shown', () => {
  const { container } = render(<Circle {...props} />);
  expect(getByLabelText(container, 'Qualifié')).toBeInTheDocument();
});
