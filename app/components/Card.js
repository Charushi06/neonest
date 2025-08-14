"use client";

import React from "react";

export default function Card({ title, icon, color = "text-gray-700", children, className = "" }) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-lg  ${className}`}>
      <h2 className={`text-xl font-semibold flex items-center gap-2 mb-3 ${color}`}>
        <span className="text-2xl">{icon}</span> {title}
      </h2>
      <div className="text-gray-700 text-sm">{children}</div>
    </div>
  );
}
