"use client";

import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const SmartCare = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/smart-care?userId=demo123`);

        if (!res.ok) {
          const errorText = await res.text(); // Read error message from server
          console.error("API Error response:", errorText);
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched data:", data);

        // Use your data here
      } catch (error) {
        console.error("Fetch error:", error);
        // Show error message to user or fallback UI
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
    const interval = setInterval(fetchInsights, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white py-10 px-4 md:px-10">
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4 text-center">Smart Care Dashboard</h1>
      <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">AI-powered care insights to support your baby's journey.</p>

      {loading ? (
        <div className="text-center text-gray-500">Loading insights...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <Card title="Feeding" icon="🍼" color="text-pink-600" className="border border-pink-400 rounded-xl shadow-md p-6">
            <p>Next feed in: {insights?.feeding?.nextFeed || "N/A"}</p>
            <p>Prediction: {insights?.feeding?.prediction || "N/A"}</p>
          </Card>

          <Card title="Sleep" icon="😴" color="text-purple-600" className="border border-purple-600 rounded-xl shadow-md p-6">
            <p>Next nap: {insights?.sleep?.nextNap || "N/A"}</p>
            <p>Fussy hour: {insights?.sleep?.fussyHour || "N/A"}</p>
          </Card>

          <Card title="Growth" icon="📈" color="text-blue-600" className="border border-blue-600 rounded-xl shadow-md p-6">
            <p>Milestone: {insights?.growth?.milestone || "N/A"}</p>
            <p>Tip: {insights?.growth?.tip || "N/A"}</p>
          </Card>

          <div className="col-span-full sm:col-span-2 lg:col-span-1 p-[2px] rounded-xl bg-gradient-to-r from-green-400 to-teal-500 shadow-md">
            <Card title="Smart Feedback" icon="✅" color="text-green-600" className="bg-white rounded-xl p-6">
              <p>Confidence: {insights?.confidenceScore || "N/A"}%</p>
              <div className="flex gap-4 mt-3">
                <button onClick={() => sendFeedback(true)} className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-green-400 to-teal-500 hover:opacity-90 transition">
                  👍 Helpful
                </button>
                <button onClick={() => sendFeedback(false)} className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90 transition">
                  👎 Not Helpful
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
};

export default SmartCare;
