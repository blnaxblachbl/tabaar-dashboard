import { Typography } from "antd";

import type { TitleProps } from "./types";

export function Title({ actions, title, className }: TitleProps) {
  return (
    <div className={`flex items-end justify-between ${className}`}>
      <Typography.Title level={3} className="mb-0! pb-0!">
        {title}
      </Typography.Title>
      {actions}
    </div>
  );
}
