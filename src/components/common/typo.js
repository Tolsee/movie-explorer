// @flow
import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';
import Typography from 'antd/lib/typography';

const { Title } = Typography;

const StyledTitle = styled(Title)`
  && {
    color: ${({theme}) => theme.colors.grey};
  }
`;

type TypoProp = {
  children: Node;
  className?: string;
}

export function H1({ children, className }: TypoProp) {
  return <StyledTitle className={className}>{children}</StyledTitle>
}

export function H2({ children, className }: TypoProp) {
  return <StyledTitle
    level={2}
    className={className}>{children}</StyledTitle>
}

export const Paragraph = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.lightGrey};
`;
