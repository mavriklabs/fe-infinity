import { useRouter } from 'next/router';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

import { useOrderContext } from './OrderContext';

export type DrawerContextType = {
  orderDrawerOpen: boolean;
  setOrderDrawerOpen: (flag: boolean) => void;

  cancelDrawerOpen: boolean;
  setCancelDrawerOpen: (flag: boolean) => void;

  sendDrawerOpen: boolean;
  setSendDrawerOpen: (flag: boolean) => void;

  cartItemCount: number;
  setCartItemCount: (n: number) => void;

  hasOrderDrawer: () => boolean;
};

const DrawerContext = React.createContext<DrawerContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const DrawerContextProvider = ({ children }: Props) => {
  const [orderDrawerOpen, setOrderDrawerOpen] = useState<boolean>(false);
  const [cancelDrawerOpen, setCancelDrawerOpen] = useState<boolean>(false);
  const [sendDrawerOpen, setSendDrawerOpen] = useState<boolean>(false);
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  const router = useRouter();

  const hasOrderDrawer = () => {
    return router.asPath.indexOf('tab=Orders') === -1 && router.asPath.indexOf('tab=Send') === -1;
  };

  // =========================================================

  const { ordersInCart, cartItems } = useOrderContext();

  useEffect(() => {
    if (hasOrderDrawer()) {
      setCartItemCount(cartItems.length || ordersInCart.length);
    }
  }, [ordersInCart, cartItems]);

  // =========================================================

  const providerValue: DrawerContextType = {
    orderDrawerOpen,
    setOrderDrawerOpen,

    cancelDrawerOpen,
    setCancelDrawerOpen,

    sendDrawerOpen,
    setSendDrawerOpen,

    cartItemCount,
    setCartItemCount,

    hasOrderDrawer
  };

  return <DrawerContext.Provider value={providerValue}>{children}</DrawerContext.Provider>;
};

export const useDrawerContext = (): DrawerContextType => {
  return useContext(DrawerContext) as DrawerContextType;
};
