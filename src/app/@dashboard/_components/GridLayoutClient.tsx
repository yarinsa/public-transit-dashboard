"use client";

import { Responsive, WidthProvider, Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import React from "react";

const ResponsiveGridLayout = WidthProvider(Responsive);

type GridLayoutClientProps = {
  layouts: Layouts;
  breakpoints: { [key: string]: number };
  cols: { [key: string]: number };
  rowHeight: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export default function GridLayoutClient({
  layouts,
  breakpoints,
  cols,
  rowHeight,
  className,
  style,
  children,
}: GridLayoutClientProps) {
  return (
    <ResponsiveGridLayout
      className={className}
      layouts={layouts}
      breakpoints={breakpoints}
      cols={cols}
      rowHeight={rowHeight}
      margin={[16, 16]}
      isResizable={false}
      isDraggable={false}
      useCSSTransforms={true}
      style={style}
    >
      {children}
    </ResponsiveGridLayout>
  );
} 