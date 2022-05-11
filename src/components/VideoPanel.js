import React from "react";

const VideoPanel = ({ title, src, stats }) => {
  return (
    <div id="print" className="video_panel">
      <div className="title_text">{title}</div>
      <div className="video_div">
        <video className="video" controls autoPlay>
          <source src={src} type="video/mp4" />
        </video>
        <div className="user_stats">
          <div className="stats_name">
            <div>Likes:</div>
            <b>{stats.diggCount}</b>
          </div>
          <div className="stats_name">
          <div>Comments:</div>
            <b>{stats.commentCount}</b>
          </div>
          <div className="stats_name">
          <div>Views:</div> 
            <b>{stats.playCount} </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;
