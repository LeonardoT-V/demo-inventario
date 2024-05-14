import { IconDot } from "@/lib/icons";
import { Badge } from "./badge";

export interface BadgeStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

function BadgeStats({ content, ...props }: BadgeStatusProps) {
  return (
    <Badge variant="outline" {...props} className="lowercase">
      <IconDot className="text-green-500" />
      {content}
    </Badge>
  );
}

export default BadgeStats;
