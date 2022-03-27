import React from "react";

const VideoPanel = ({title, src, stats}) => {
  return (
    <div  id="print" className="video_panel">
      <div className="title_text">{title}</div>
      <div className="video_div">
        <video className="video" controls autoPlay>
          <source src={src} type="video/mp4" />
        </video>
        (<div>Likes: {stats.diggCount} Comments: {stats.commentCount} Views: {stats.playCount}</div>)
      </div>
    </div>
  );
};

export default VideoPanel;
