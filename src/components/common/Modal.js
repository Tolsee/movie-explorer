// @flow
import React, {useEffect} from 'react';
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
  const el = document.createElement('div');
  useEffect(() => {
    let modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(modalRoot);
    }
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    }
  });

  return isOpen ? ReactDOM.createPortal(
    <ModalWrapper onClick={onCancel}>
      <CloseButton onClick={onCancel} type="close"/>
      <ModalContent>
        {children}
      </ModalContent>
    </ModalWrapper>, el
  ) : null;
}
