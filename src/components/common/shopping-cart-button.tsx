import React from 'react';

import { Button } from './button';
import { FaShoppingBag } from 'react-icons/fa';
import { useOrderContext } from 'src/utils/context/OrderContext';
import { useAppContext } from 'src/utils/context/AppContext';
import { useRouter } from 'next/router';

export const ShoppingCartButton: React.FC = () => {
  const { user } = useAppContext();
  const { orderDrawerOpen, setOrderDrawerOpen, ordersInCart } = useOrderContext();
  const router = useRouter();

  const connected = user?.address ? true : false;

  const handleClick = async () => {
    if (connected) {
      setOrderDrawerOpen(!orderDrawerOpen);
    } else {
      router.push('/connect');
    }
  };

  return (
    <Button variant="outline" onClick={handleClick} className="py-3 relative">
      <FaShoppingBag />
      {ordersInCart && ordersInCart.length > 0 ? (
        <span className="px-1 py-0.5 absolute top-0 right-2.5 bg-theme-grey-200 rounded-lg text-xs">
          {ordersInCart.length}
        </span>
      ) : null}
    </Button>
  );
};
