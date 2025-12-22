import React from "react";
import styles from "./GridWrapper.module.scss";

type GridWrapperProps = {
    children: React.ReactNode;
    cols?: number;  // количество колонок, по умолчанию 12
    gap?: string;   // gap, например "2rem"
};

export const GridWrapper = ({ children, cols = 12, gap }: GridWrapperProps) => {
    const style = {
        gap,
        gridTemplateColumns: `repeat(auto-fit, minmax(calc(100% / ${cols}), 1fr))`,
    };

    return <div className={styles.gridWrapper} style={style}>{children}</div>;
};
