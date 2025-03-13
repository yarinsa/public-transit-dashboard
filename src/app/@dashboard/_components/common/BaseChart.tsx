'use client'

import { ChartIcon } from "@/components/icons";
import dynamic from "next/dynamic";
import { ReactElement, ReactNode } from "react";
import { BaseWidget } from "./BaseWidget";

const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false });

type BaseChartProps = {
  title: string | ReactNode;
  icon?: ReactNode;
  children: ReactElement;
  height?: number;
}

export function BaseChart({ title, icon = <ChartIcon />, children, height = 300 }: BaseChartProps) {
  return (
    <BaseWidget title={title} icon={icon}>
        <ResponsiveContainer width="100%" height={height} style={{marginTop: "16px"}}>
          {children}
        </ResponsiveContainer>
    </BaseWidget>
  );
} 