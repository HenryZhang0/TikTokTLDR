
import React from 'react'

const VideoPlayer = ({most_common_hashtags_video}) => {
  return (
    <div className="hashtag_video">
        <video className="video" controls autoPlay>
          <source src={most_common_hashtags_video} type="video/mp4"/>
        </video>
    </div>
  )
}

export default VideoPlayer

