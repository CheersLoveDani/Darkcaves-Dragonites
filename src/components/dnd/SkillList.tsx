import React from "react";
import { formatModifier } from "../../utils/formatting";

interface SkillListProps {
  skills: Record<string, number>;
  className?: string;
}

export const SkillList: React.FC<SkillListProps> = ({
  skills,
  className = "",
}) => {
  const formatSkillName = (skillName: string) => {
    return skillName
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className={className}>
      <span className="font-semibold text-red-800 dark:text-red-400">
        Skills{" "}
      </span>
      <span className="text-gray-900 dark:text-gray-100">
        {Object.entries(skills)
          .map(
            ([skill, modifier]) =>
              `${formatSkillName(skill)} ${formatModifier(modifier)}`
          )
          .join(", ")}
      </span>
    </div>
  );
};

export default SkillList;
