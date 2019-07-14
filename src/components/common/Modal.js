// @flow
import React from 'react';
import type {Node} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Icon from 'antd/lib/icon';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999; 
  transform: translateZ(0);
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  height: auto;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled(Icon)`
  && {
    position: fixed;
    cursor: pointer;
    right: 5%;
    top: 5%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 24px;
  }
`;

type ModalProps = {
  isOpen: boolean;
  children: Node;
  onCancel: Function;
}

export default function Modal({ isOpen, children, onCancel }: ModalProps) {
  return isOpen ? ReactDOM.createPortal(
    <ModalWrapper onClick={onCancel}>
      <CloseButton onClick={onCancel} type="close"/>
      <ModalContent>
        {children}
      </ModalContent>
    </ModalWrapper>, document.body
  ) : null;
}
