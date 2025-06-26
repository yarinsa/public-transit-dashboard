'use client'

import { ChartIcon } from "@/components/icons";
import { useColorMode } from "@/components/ui/color-mode";
import { Box, useToken } from "@chakra-ui/react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { BaseChart } from "../common/BaseChart";

export type TrainPunctualityData = {
  month: number;
  rate: number;
}

type TrainPunctualityWidgetProps = {
  data: TrainPunctualityData[];
}

// Glassy custom tooltip for LineChart
const GlassyTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number }[]; label?: string }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <Box
      bg="rgba(255,255,255,0.15)"
      backdropFilter="blur(8px)"
      border="1px solid rgba(22,163,74,0.2)"
      borderRadius={12}
      boxShadow="0 4px 24px rgba(22,163,74,0.08)"
      color="#111"
      fontWeight={700}
      fontSize={16}
      px={4}
      py={2}
      minW="120px"
    >
      <Box color="#111" fontWeight={700} fontSize={18} mb={1}>{label}</Box>
      {payload.map((entry, idx) => (
        <Box key={idx} color="#16a34a" fontWeight={700} fontSize={16}>
          {entry.name} : {entry.value}
        </Box>
      ))}
    </Box>
  );
};

// Glassy dot renderer
const GlassDot = (props: { cx?: number; cy?: number }) => {
  const { cx = 0, cy = 0 } = props;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill="rgba(22,163,74,0.10)"
        stroke="rgba(22,163,74,0.25)"
        strokeWidth={2}
        filter="url(#glass-blur)"
      />
      <circle
        cx={cx}
        cy={cy}
        r={3.5}
        fill="#fff"
        stroke="#16a34a"
        strokeWidth={2}
        style={{ filter: "drop-shadow(0 2px 6px rgba(22,163,74,0.12))" }}
      />
    </g>
  );
};

export function TrainPunctualityWidgetClient({ data }: TrainPunctualityWidgetProps) {
  const { colorMode } = useColorMode();
  const [gray300, gray500] = useToken("colors", ["gray.300", "gray.500"]);
  const axisColor = colorMode === "dark" ? gray300 : gray500;
  const gridColor = gray500;
  const glassGreen = '#16a34a';

  return (
    <BaseChart title="Train Punctuality Rate (%)" icon={<ChartIcon />}>
      <LineChart data={data}>
        <defs>
          <filter id="glass-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 18 -7"
            />
            <feBlend in="SourceGraphic" in2="blur" mode="normal" />
          </filter>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => {
            const date = new Date();
            date.setMonth(value - 1);
            const month = date.toLocaleString('default', { month: 'short' });
            return month;
          }}
          tick={{ fontSize: 12, fill: axisColor }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: axisColor }}
          domain={["auto", "auto"]}
        />
        <Line
          type="monotone"
          dataKey="rate"
          stroke={glassGreen}
          strokeWidth={2}
          opacity={0.7}
          dot={<GlassDot />}
          activeDot={<GlassDot />}
          animationDuration={1500}
        />
        <Tooltip
          content={<GlassyTooltip />}
          cursor={{ fill: "none" }}
        />
      </LineChart>
    </BaseChart>
  );
}