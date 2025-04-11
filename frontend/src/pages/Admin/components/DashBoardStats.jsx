import StatsCard from "./StatsCard";
import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";

const DashBoardStats = ({stats}) => {
  const statsData = [
    {
      icon: ListMusic,
      label: "Total Songs",
      value: stats?.songCount,
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Library,
      label: "Total Albums",
      value: stats?.albumCount,
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      icon: Users2,
      label: "Total Artists",
      value: stats?.artistCount,
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      icon: PlayCircle,
      label: "Total Users",
      value: stats?.userCount,
      bgColor: "bg-sky-500/10",
      iconColor: "text-sky-500",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mt-7">
      {statsData.map((obj) => (
        <StatsCard
          temp={obj.label}
          Icon={obj.icon}
          label={obj.label}
          value={obj.value}
          bgColor={obj.bgColor}
          iconColor={obj.iconColor}
        />
      ))}
    </div>
  );
};

export default DashBoardStats;
