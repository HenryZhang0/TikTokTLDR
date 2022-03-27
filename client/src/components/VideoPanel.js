import React from "react";

const VideoPanel = ({title, src}) => {
  return (
    <div  id="print" className="video_panel">
      <div className="title_text">{title}</div>
      <div className="video_div">
        <video className="video" controls autoplay>
          <source src={""} type="video/mp4" />
        </video>
        <div>OOGA BOOGA</div>
      </div>
    </div>
  );
};

export default VideoPanel;
