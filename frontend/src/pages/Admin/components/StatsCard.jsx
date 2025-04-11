import React from "react";

const StatsCard = ({temp,Icon,label,value,bgColor,iconColor}) => {
  return (
    <div key={temp} className="h-20 w-48 flex items-center gap-2 p-4 bg-zinc-800/50 hover:bg-zinc-800/85 hover:cursor-pointer rounded-lg transition-colors">
      <div className={`h-12 w-12 rounded-lg ${bgColor} grid place-items-center`}>
        <Icon className={`${iconColor}`}/>
      </div>
      <div>
        <div className="text-zinc-300 text-md font-semibold">{label}</div>
        <div className="text-white text-2xl">{value}</div>
      </div>
    </div>
  );
};

export default StatsCard;
