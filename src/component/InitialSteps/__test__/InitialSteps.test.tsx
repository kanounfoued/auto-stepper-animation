import React from 'react';
import InitialSteps, { IPropTypes } from '../index';
import PIECE_COMPONENT_TYPE from '../../../declaration_types/PieceComponent';
import { render } from '@testing-library/react';
import { getByTestId, getByLabelText } from '@testing-library/dom';
import { mockData } from '../mock';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect';

let props: IPropTypes = {
  state: {
    status: 'Qualified',
    points: 10,
  },
};

test('test the InitialSteps component is in the DOM', async () => {
  const { container } = render(<InitialSteps {...props} />);
  expect(getByTestId(container, 'initial-step-container')).toBeInTheDocument();
});

test('test the existance of all Stick, Circles with their labels', () => {
  const { container } = render(<InitialSteps {...props} />);
  const listItemsLabels: (string | null)[] = [];

  mockData.forEach((item: PIECE_COMPONENT_TYPE) => {
    expect(getByTestId(container, item.id)).toBeInTheDocument();

    if (item.type === 'circle' && item.title) {
      const itemNode: HTMLElement = getByLabelText(container, item.title);
      expect(itemNode).toBeInTheDocument();
      listItemsLabels.push(itemNode.textContent);
    }
  });

  expect(listItemsLabels).toEqual(['Qualifié', 'Contacté', 'Présentation effectuée', 'Devis envoyé']);
});

test('test the list of component being colored based on the props value', () => {
  const { container } = render(<InitialSteps {...props} />);

  mockData.forEach((item: PIECE_COMPONENT_TYPE) => {
    expect(getByTestId(container, item.id)).toBeInTheDocument();

    if (item.type === 'circle') {
      const circleItem: HTMLElement = getByTestId(container, item.id);
      const isActive = item.points <= props.state.points;

      if (isActive) {
        expect(circleItem).toHaveStyle(`transform: scale(1)`);
      } else {
        expect(circleItem).toHaveStyle(`transform: scale(0)`);
      }
    }
  });
});
