import React from "react";
import {
  FaBaby,
  FaHome,
  FaFemale,
  FaStethoscope,
  FaBone,
  FaEye,
  FaPumpMedical,
} from "react-icons/fa";

const departments = [
  {
    name: "소아청소년과",
    icon: <FaBaby size={16} />,
    bgColor: "bg-yellow-100",
  },
  { name: "가정의학과", icon: <FaHome size={16} />, bgColor: "bg-lime-100" },
  { name: "산부인과", icon: <FaFemale size={16} />, bgColor: "bg-pink-100" },
  { name: "내과", icon: <FaStethoscope size={16} />, bgColor: "bg-red-100" },
  { name: "정형외과", icon: <FaBone size={16} />, bgColor: "bg-green-100" },
  {
    name: "피부과",
    icon: <FaPumpMedical size={16} />,
    bgColor: "bg-orange-100",
  },
  { name: "안과", icon: <FaEye size={16} />, bgColor: "bg-blue-100" },
];

export default function Page() {
  return (
    <main className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span role="img" aria-label="hospital">
          🏥
        </span>
        진료과로 병원 찾기{" "}
      </h2>
      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {departments.map((dept, index) => (
          <div
            key={index}
            className={`min-w-[120px] rounded-2xl p-4 ${dept.bgColor} flex items-center justify-center flex-col gap-2 shadow-sm`}
          >
            <div className="text-2xl">{dept.icon}</div>
            <div className="text-sm font-medium text-center">{dept.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
