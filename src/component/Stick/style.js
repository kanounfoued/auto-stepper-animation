import styled from 'styled-components';

export const StyledStick = styled.div`
  height: 5px;
  border-radius: 5px;
  width: ${(props) => (props.style.width ? props.style.width : 50)}px;
  background-color: #b2bec3;
  position: relative;
  z-index: ${(props) => (props.isActive ? 1 : 0)};
`;

export const AnimatedStick = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(90deg, ${(props) => props.startColor} 24%, ${(props) => props.endColor} 72%);
  transform: ${(props) => (props.isActive ? 'scaleX(1)' : 'scaleX(0)')};
  transform-origin: left center;
  transition: transform 200ms ease ${(props) => props.delay}s;
  border-radius: 5px;
`;
