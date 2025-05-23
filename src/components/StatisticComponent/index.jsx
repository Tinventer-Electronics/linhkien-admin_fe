import React from "react";

const StatisticComponent = ({
  icon,
  value,
  label,
  layout,
  bgIcon,
  borderRight,
}) => {
  return (
    <div
      className={
        borderRight
          ? 'relative before:absolute before:content-[""] before:w-[2px] before:h-1/2 before:bg-[#ccc] before:top-1/2 before:translate-y-[-50%] before:right-[-3px] before:rounded-[999px] px-11'
          : 'px-11'
      }
    >
      <div className="flex justify-center">
        <div
          className={`mb-4 p-4 rounded-lg w-[70px] h-[70px]`}
          style={{ background: bgIcon }}
        >
          <img className="w-full h-auto" src={icon} alt="icon" />
        </div>
      </div>
      {layout === "vertical" ? (
        <div className="flex flex-col text-center gap-2">
          <span className="font-semibold text-[#5d6679]">{value}</span>
          <span className="font-semibold text-[#5d6679]">{label}</span>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[#5d6679]">{value}</span>
          <span className="font-semibold text-[#5d6679]">{label}</span>
        </div>
      )}
    </div>
  );
};

export default StatisticComponent;
