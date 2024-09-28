import { useEffect, useRef } from "react";

// Define the type for the callback function
type Callback = () => void;

// Define the type for the dependencies array
type Dependencies = ReadonlyArray<any>;

export const useEffectUpdate = (cb: Callback, dependencies: Dependencies) => {
    const isMounting = useRef(true);

    useEffect(() => {
        if (isMounting.current) {
            isMounting.current = false;
            return;
        }
        cb();

        // eslint-disable-next-line
    }, dependencies);
};
