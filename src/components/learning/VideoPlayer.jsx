import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from 'lucide-react';

export default function VideoPlayer({ videoUrl, lessonNumber }) {
  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  // Check if it's a Google Drive link
  const isGoogleDrive = videoUrl.includes('drive.google.com');
  const isYouTube = videoUrl.includes('youtube.com');

  // Extract Google Drive file ID
  const getGoogleDriveId = (url) => {
    const match = url.match(/\/d\/([^/]+)/);
    return match ? match[1] : null;
  };

  if (isYouTube) {
    const videoId = getYouTubeId(videoUrl);
    
    return (
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-red-50 to-pink-50">
        <div className="p-4 border-b border-red-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Play className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Video Lecture</h3>
                <p className="text-xs text-slate-500">Lesson {lessonNumber} Explanation</p>
              </div>
            </div>
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`Lesson ${lessonNumber} Video`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Card>
    );
  }

  if (isGoogleDrive) {
    const fileId = getGoogleDriveId(videoUrl);
    
    return (
      <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <Play className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 mb-2">Video Lecture</h3>
            <p className="text-sm text-slate-600 mb-4">
              Lesson {lessonNumber} Explanation (Google Drive)
            </p>
            <div className="flex gap-3">
              <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Watch on Google Drive
                </Button>
              </a>
            </div>
          </div>
        </div>
        {fileId && (
          <div className="mt-4 relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://drive.google.com/file/d/${fileId}/preview`}
              title={`Lesson ${lessonNumber} Video`}
              frameBorder="0"
              allow="autoplay"
            />
          </div>
        )}
      </Card>
    );
  }

  return null;
}