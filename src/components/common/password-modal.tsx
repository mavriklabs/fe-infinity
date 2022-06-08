import React, { useState } from 'react';
import { Modal } from 'src/components/common';
import { Base64, isLocalhost } from 'src/utils';
import { Button } from './button';
import { TextInputBox } from './input-box';

const LOCAL_STORAGE_KEY = 'ppp';
const PPP = 'bmZ0ODg4'; // nft888

export const isPasswordModalNeeded = () => {
  const str = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '';
  if (!isLocalhost() && str !== PPP) {
    // !isLocalhost() &&
    return true;
  }
  return false;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordModal = ({ isOpen, onClose }: Props) => {
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);

  const onClickSubmit = () => {
    if (Base64.encode(password) === PPP) {
      setIsValidPassword(true);
      localStorage.setItem(LOCAL_STORAGE_KEY, Base64.encode(password));
      window.location.reload();
    } else {
      setIsValidPassword(false);
    }
  };

  return (
    <Modal
      wide={false}
      isOpen={isOpen}
      onClose={onClose}
      okButton="Confirm"
      title="Please enter the password"
      showActionButtons={false}
    >
      <TextInputBox
        value=""
        label=""
        type={'text'}
        placeholder=""
        className={isValidPassword ? '' : 'border-red-700'}
        onChange={(text) => setPassword(text)}
      />

      <Button className="mt-6 w-32" onClick={onClickSubmit}>
        Submit
      </Button>

      <div className="mt-6">
        <a href="https://www.premint.xyz/infinity-marketplace-v2-beta-allowlist/">Click here to request for password</a>
      </div>
    </Modal>
  );
};
