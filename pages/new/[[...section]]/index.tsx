import { useEffect, useRef } from 'react';
import { AstraSidebar } from 'src/components/astra/astra-sidebar';
import { AstraCart } from 'src/components/astra/astra-cart';
import { useResizeDetector } from 'react-resize-detector';
import { MainDashboardGrid } from 'src/components/astra/dashboard/main-grid-dashboard';
import { useDashboardContext } from 'src/utils/context/DashboardContext';
import { DashboardAll } from 'src/components/astra/dashboard/dashboard-all';
import { Button, Navbar, Spacer, SVG } from 'src/components/common';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useAppContext } from 'src/utils/context/AppContext';

const DashboardPage = () => {
  const {
    collection,
    setCollection,
    setGridWidth,
    showCart,
    handleCheckout,
    selection,
    clearSelection,
    removeFromSelection,
    setShowCart
  } = useDashboardContext();
  const { darkMode, setDarkMode } = useAppContext();

  const gridRef = useRef<HTMLDivElement>(null);

  const { width: containerWidth, ref: containerRef } = useResizeDetector();

  useEffect(() => {
    if (containerWidth && containerWidth > 0) {
      setGridWidth(containerWidth);
    }
  }, [containerWidth]);

  useEffect(() => {
    if (selection.length > 0) {
      setShowCart(true);
    } else {
      setShowCart(false);
    }
  }, [selection]);

  useEffect(() => {
    gridRef.current?.scrollTo({ left: 0, top: 0 });
  }, [collection]);

  const sidebar = (
    <AstraSidebar
      selectedCollection={collection}
      onClick={(value) => {
        // avoid clicking if already selected (avoids a network fetch)
        if (value.address !== collection?.address) {
          setCollection(value);
        }

        // navigate(`all?col=${value.address}`);
      }}
      onLoad={(value) => {
        if (value.address !== collection?.address) {
          setCollection(value);
        }
      }}
    />
  );

  const cart = (
    <AstraCart
      tokens={selection}
      onCheckout={() => {
        clearSelection();
        handleCheckout(selection);
      }}
      onRemove={(value) => {
        removeFromSelection(value);
      }}
    />
  );

  const footer = <div>footer</div>;
  const sideNavBar = (
    <div className="flex px-2 py-4 h-full flex-col items-center ">
      {darkMode ? <SVG.miniLogoDark className="shrink-0 h-8 w-8" /> : <SVG.miniLogo className="shrink-0 h-8 w-8" />}
      <Spacer />
      <Button
        variant="plain"
        size="plain"
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        {darkMode ? <MdLightMode className="h-8 w-8" /> : <MdDarkMode className="h-8 w-8" />}
      </Button>
    </div>
  );

  return MainDashboardGrid(
    <Navbar />,
    sideNavBar,
    sidebar,
    <DashboardAll />,
    cart,
    footer,
    gridRef,
    containerRef,
    showCart
  );
};

export default DashboardPage;