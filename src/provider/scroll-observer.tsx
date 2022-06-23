import React from "react";

interface ScrollValue {
  scrollY: number;
}

interface Props {
  children: React.ReactNode;
}

export const ScrollContext = React.createContext<ScrollValue>({
  scrollY: 0,
});

const ScrollObserver = ({ children }: Props) => {
  const [scrollY, setScrollY] = React.useState(0);

  const handleScroll = React.useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  React.useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => document.removeEventListener("scroll", handleScroll);
  });
  return (
    <ScrollContext.Provider value={{ scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollObserver;
