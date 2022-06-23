import React from "react";
import { useContext } from "react";
import useScroll from "src/hooks/useScroll";

interface ImageContextValue {
  numOfPages: number;
  currentPage: number;
}

interface Props {
  children: React.ReactNode;
  numOfPages: number;
}

export const ImageContext = React.createContext<ImageContextValue>({
  numOfPages: 0,
  currentPage: 0,
});

export const ImageWrapper = ({ children, numOfPages }: Props) => {
  const { scrollY } = useScroll();

  const refContainer = React.useRef<HTMLDivElement>(null);
  const currentPageRef = React.useRef<number>(0);

  const { current: elContainer } = refContainer;

  React.useEffect(() => {
    if (elContainer) {
      const { clientHeight, offsetTop } = elContainer;
      const screenH = window.innerHeight;
      const halfH = screenH / 2;
      const perfectY =
        Math.min(
          clientHeight + halfH,
          Math.max(-screenH, scrollY - offsetTop) + halfH
        ) / clientHeight;

      currentPageRef.current = perfectY * numOfPages;
    }
  }, [elContainer, scrollY, numOfPages]);
  return (
    <ImageContext.Provider
      value={{ numOfPages, currentPage: currentPageRef.current }}
    >
      <div ref={refContainer} className="relative bg-black text-white">
        {children}
      </div>
    </ImageContext.Provider>
  );
};

export const ImageBackground = ({ children }: React.ReactNode) => (
  <div className="absolute h-full w-full">{children}</div>
);

export const ImageContent = ({ children }: React.FC) => (
  <div className="sticky top-0 h-screen overflow-hidden">{children}</div>
);

interface ImageProps {
  page: number;
  renderContent: (props: { progress: number }) => any;
}

export const Image: React.FC<ImageProps> = ({ page, renderContent }) => {
  const { currentPage, numOfPages } = useContext(ImageContext);
  const refContiner = React.useRef<HTMLDivElement>(null);
  let opacity = Math.min(1, Math.max(0, progress * 4));
  if (progress > 0.85 && page < numOfPages - 1) {
    opacity = Math.max(0, (1.0 - progress) * 4);
  }
  return <div ref={refContiner}>{renderContent({ progress })}</div>;
};
