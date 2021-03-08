import PIECE_COMPONENT_TYPE from '../../declaration_types/PieceComponent';

export const mockData: PIECE_COMPONENT_TYPE[] = [
  {
    id: 'stick-',
    type: 'stick',
    startColor: '#ff0e00',
    endColor: '#be3a32',
    style: {
      width: 100,
    },
    delay: 1.6,
    points: 100,
  },
  {
    id: 'circle-',
    type: 'circle',
    title: 'Perdu',
    icon: '',
    startColor: '#be3a32',
    endColor: '#be3a32',
    delay: 1.8,
    points: 100,
  },
];
