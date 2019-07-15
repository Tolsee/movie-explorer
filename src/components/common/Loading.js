import React from 'react';
import styled from "styled-components";
import Spin from 'antd/lib/spin';


const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type LoadingProps = {
  className?: string;
  size?: string;
}

export default function Loading({ className, size }: LoadingProps) {
  return (
    <LoadingWrapper className={className}>
      <Spin size={size} />
    </LoadingWrapper>
  )
}
