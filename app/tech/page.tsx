"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Feature {
  version: string;
  releaseDate: string;
  features: string[];
  website: string;
}

interface TechData {
  description: string;
  usage: string;
  versions: Feature[];
}

const TechPage: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("techname");
  const [techData, setTechData] = useState<TechData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof searchQuery === "string") {
        try {
          const data = await import(`@/data/techDetail/${searchQuery}.json`);
          setTechData(data.default);
        } catch (error) {
          console.error("データの読み込みに失敗しました:", error);
          setTechData(null);
        }
      }
    };
    fetchData();
  }, [searchQuery]);

  if (!searchQuery) {
    return <p className="text-center text-gray-500">技術情報を取得中...</p>;
  }

  if (!techData) {
    return (
      <p className="text-center text-red-500">技術情報が見つかりません。</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{searchQuery} の概要</h1>
      <p className="text-lg mb-2">
        <strong>説明:</strong> {techData.description}
      </p>
      <p className="text-lg mb-4">
        <strong>用途:</strong> {techData.usage}
      </p>
      <h2 className="text-xl font-semibold mb-2">バージョン情報</h2>
      <ul className="space-y-4">
        {techData.versions.map((version) => (
          <li key={version.version} className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">
              {version.version} ({version.releaseDate})
            </h3>
            <ul className="list-disc list-inside mt-2">
              {version.features.map((feature, index) => (
                <li key={index} className="ml-4">
                  {feature}
                </li>
              ))}
              {version.website ? (
                <li>
                  <Link
                    href={version.website}
                    className="text-blue-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    詳細はこちら
                  </Link>
                </li>
              ) : null}{" "}
              {/* websiteがある場合のみ表示 */}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechPage;
