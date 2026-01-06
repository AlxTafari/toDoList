import type { CSSProperties, ReactNode } from "react";
import s from "./GridWrapper.module.scss";

type Props = {
    children: ReactNode;

    columnTemplate?: string;
    columns?: number;
    gap?: string;
    rowGap?: string;
    minColumnWidth?: string;
    maxColumnWidth?: string;
    place?: string;
};

export const GridWrapper = ({
                                children,
                                columnTemplate,
                                columns,
                                gap,
                                rowGap,
                                minColumnWidth,
                                maxColumnWidth,
                                place,
                            }: Props) => {
    const style: CSSProperties & {
        "--grid-template"?: string;
        "--grid-gap"?: string;
        "--grid-row-gap"?: string;
        "--grid-place"?: string;
    } = {
        ...(columnTemplate && {
            "--grid-template": columnTemplate,
        }),

        ...(columns && {
            "--grid-template": `repeat(${columns}, 1fr)`,
        }),

        ...(!columnTemplate &&
            !columns && {
                "--grid-template": `repeat(auto-fit, minmax(${
                    minColumnWidth || "200px"
                }, ${maxColumnWidth || "1fr"}))`,
            }),

        ...(gap && { "--grid-gap": gap }),
        ...(rowGap && { "--grid-row-gap": rowGap }),
        ...(place && { "--grid-place": place }),
    };

    return (
        <div className={s.grid} style={style}>
            {children}
        </div>
    );
};

