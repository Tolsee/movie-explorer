// @flow
import styled from 'styled-components';

export const H1 = styled.h1`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.grey};
`;

export const H2 = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.grey};
`;

export const Paragraph = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.lightGrey};
`;
