'use client';

import { useState } from "react";
import appsData from "../data/apps.json";

interface AppItem {
  id: number;
  title: string;
  category: string;
  tech: string[];
  demoUrl: string;
  repoUrl: string;
  description: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(appsData.map((app) => app.category)))];

  const filteredApps = (appsData as AppItem[]).filter((app) => {
    const matchesSearch =
      app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.tech.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || app.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              D
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                My Dev Lab
              </h1>
              <p className="text-xs text-slate-400">학습용 웹앱 포털 & 런처</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="w-full sm:w-64 relative">
            <input
              type="text"
              placeholder="앱 또는 기술 태그 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">포털 대시보드</h2>
          <p className="text-sm text-slate-400">
            직접 개발한 토이 프로젝트와 유틸리티 앱들을 관리하고 런칭하는 개인 연구소입니다.
          </p>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center sm:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="group flex flex-col justify-between rounded-xl bg-slate-900 border border-slate-800/80 p-5 hover:border-slate-700/80 hover:bg-slate-800/40 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded-md border border-indigo-900/50">
                      {app.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                    {app.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {app.description}
                  </p>
                  
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {app.tech.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-auto">
                  <a
                    href={app.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                  >
                    GitHub →
                  </a>
                  <a
                    href={app.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition-all duration-200"
                  >
                    실행하기
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
            <p className="text-slate-400 text-sm">해당 조건에 일치하는 앱을 찾을 수 없습니다.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} My Dev Lab. Powered by Next.js & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
