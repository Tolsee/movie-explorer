// @flow
import React from 'react';
import type { Node } from 'react';

type Props = {
  children: Node
}

export function H1({ children }: Props) {
  return <h1>{children}</h1>
}
