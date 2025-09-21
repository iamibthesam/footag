import { useState } from "react";
import { ImageUpload } from "./components/ImageUpload";
import { Stream } from "./components/Stream";
import { MyPhotos } from "./components/MyPhotos";

export function InstagramApp() {
  const [activeTab, setActiveTab] = useState<"upload" | "stream" | "my-photos">("stream");

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-white rounded-lg shadow-sm border p-1">
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === "upload"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Upload
          </button>
          <button
            onClick={() => setActiveTab("stream")}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === "stream"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Stream
          </button>
          <button
            onClick={() => setActiveTab("my-photos")}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === "my-photos"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            My Photos
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "upload" && <ImageUpload />}
      {activeTab === "stream" && <Stream />}
      {activeTab === "my-photos" && <MyPhotos />}
    </div>
  );
}
