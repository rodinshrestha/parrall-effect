import React from "react";
import useScroll from "src/hooks/useScroll";
import { opacityForBlock } from "src/utils/opacity-for-block";
import style from "./style.module.css";

const Text: React.FC = () => {
  const { scrollY } = useScroll();

  const refContainer = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef<number>(0);
  const { current: elContainer } = refContainer;

  const numOfPages = 3;

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

      progressRef.current = Math.min(
        numOfPages - 0.5,
        Math.max(0.5, perfectY * numOfPages)
      );
    }
  }, [elContainer, scrollY]);

  return (
    <div className="bg-black text-white" ref={refContainer}>
      <div
        className="min-h-screen max-w-5xl max-auto px-10 lg:px-20 py-2
          4 md:py-28 lg:py-36 flex flex-col justify-center items-center text-4xl md:text-6xl lg:text-7xl tracking-tight font-semibold"
      >
        <div className="leading-[1.15]">
          <div
            className={style.skill_Text}
            style={{ opacity: opacityForBlock(progressRef.current, 0) }}
          >
            we know our tools inside out.
          </div>
          <span
            className={`${style.skill_Text} inline-block `}
            style={{ opacity: opacityForBlock(progressRef.current, 1) }}
          >
            Our team has contributed 123 commits to React Native core, powering
            thousands of app world wide
          </span>
          <span
            className={`${style.skill_Text} inline-block `}
            style={{ opacity: opacityForBlock(progressRef.current, 2) }}
          >
            we &apos;re maintaining some of the most popular open-source
            projects with over <strong>1,234</strong> downloads
          </span>
        </div>
      </div>
    </div>
  );
};

export default Text;
