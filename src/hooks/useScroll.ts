import React from "react";

import { ScrollContext } from "src/provider/scroll-observer";

const useScroll = () => React.useContext(ScrollContext);

export default useScroll;
