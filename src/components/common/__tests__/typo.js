import React from 'react'
import { render } from 'utils/testUtil';
import { H1, H2, Paragraph } from 'components/common/typo';

it('render h1 element', () => {
  const headerText = 'Test text';
  const { container } = render(<H1>{headerText}</H1>);
  expect(container.querySelector('h1')).toBeInTheDocument();
  expect(container.querySelector('h1').textContent).toEqual(headerText);
});

it('render h2 element', () => {
  const headerText = 'Test text';
  const { container } = render(<H2>{headerText}</H2>);
  expect(container.querySelector('h2')).toBeInTheDocument();
  expect(container.querySelector('h2').textContent).toEqual(headerText);
});

it('render paragraph element', () => {
  const paragraphText = 'Test text';
  const { container } = render(<Paragraph>{paragraphText}</Paragraph>);
  expect(container.querySelector('p')).toBeInTheDocument();
  expect(container.querySelector('p').textContent).toEqual(paragraphText);
});
