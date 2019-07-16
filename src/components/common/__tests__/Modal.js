import React from 'react'
import { render, fireEvent } from 'utils/testUtil';
import Modal from 'components/common/Modal';

it('does not render when isOpen is false', () => {
  const onCancelMock = jest.fn();

  const { queryByTestId } = render(
    <Modal isOpen={false} onCancel={onCancelMock}>
      <div data-testid="content" />
    </Modal>
  );

  expect(queryByTestId('content')).not.toBeInTheDocument();
});

it('renders when isOpen is true', () => {
  const onCancelMock = jest.fn();

  const { getByTestId } = render(
    <Modal isOpen={true} onCancel={onCancelMock}>
      <div data-testid="content" />
    </Modal>
  );

  expect(getByTestId('content')).toBeInTheDocument();
});

it('calls onCancel when clicked outside the modal', () => {
  const onCancelMock = jest.fn();

  const { container, getByTestId } = render(
    <Modal isOpen={true} onCancel={onCancelMock}>
      <div data-testid="content" />
    </Modal>
  , { container: document.body });

  expect(getByTestId('content')).toBeInTheDocument();

  fireEvent(container.querySelector('#modal-root > div > div'), new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));

  expect(onCancelMock).toHaveBeenCalledTimes(1);
});
