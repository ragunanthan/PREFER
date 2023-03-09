import { createIcon } from "native-base";
import { Path } from "react-native-svg";

export const FilterIcon = () => {
    const CustomIcon = createIcon({
      viewBox: "0 0 22 22",
      // d: 'M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0',
      path: [
        <Path
          d="M4.45,4.66,10,11V21l4-2V11l5.55-6.34A1,1,0,0,0,18.8,3H5.2A1,1,0,0,0,4.45,4.66Z"
          strokeWidth={"1"}
          strokeLinecap="round"
          fill="none"
          stroke="white"
        />,
      ],
    });
    return <CustomIcon size={6} />;
  };
  