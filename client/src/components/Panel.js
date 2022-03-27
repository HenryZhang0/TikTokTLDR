import {FaTwitter, FaInstagram, FaDownload, FaLink} from 'react-icons/fa'
import html2canvas from "html2canvas";

// IMAGE DOWNLOADER
const handleDownloadImage = () => {
  const element = document.getElementById('print');
  html2canvas(document.querySelector("#print"), {
    useCORS: true
  }).then(canvas => {
    if(true){ // set to true for the deployment
      let data = canvas.toDataURL('image/jpg');
      let link = document.createElement('a');
      //console.log(data)
      link.href = data;
      link.download = 'downloaded-image.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else { 
      document.body.appendChild(canvas);
    }
  });
  
  // canvas = html2canvas(element),

  
};
  
const openLink = ({link}) => {
  // window.open(link, "_blank");
};
function copyLink(link) {
  navigator.clipboard.writeText(link);
  alert("Copied share link to clipboard: " + link); 
}
const path = window.location.hostname;
const Panel = ({ backgroundColour, content, username }) => {
  return (
    <div className="panel">
      {content}
      <div className = 'bottomBar'>
          <div className = 'logo-container, share'>
            <img src="https://lh3.googleusercontent.com/TDjcir9c-_WbQxCcOFqx8KAQ8T6ZiQUDSUb_WnXGg8aONczHXjc5DmIdHl8uzQpCiPugCUpQbBKXpWo7QTIffPfZ3Bjve1wv_ILVzKtHuuphjX_IFkOOW-9n3nTh5uFJZSyhiCh5XY0=w2400"
                height = "35"
                className = "logo" 
            />
          </div>
          <div className = 'share-container'>
          <a className="twitter-share-button"
          href={"https://twitter.com/intent/tweet?text=Check%20out%20my%20TikTok%20Stats!%20" + path + "/share/" + username}
          data-size="large">
            <FaTwitter className="share"/> </a>
              <FaLink className="share" onClick={() => copyLink(path + "/share/" + username)}/>
            <FaDownload className="share" onClick={handleDownloadImage}/>
          </div>
          
      </div>
    </div>
  );
};
const videoDiv = {
  height: "200px",
  backgroundColor: "fd3e3e",
};
const video = {
  position: "absolute",
  border: "solid 1px red",
  height: "100%",
  width: "80%",
  padding: "10px",
};

export default Panel;



{/* video embed */}
      {/* <div className="videoDiv" style = {videoDiv}>
        <video className = 'video' style = {video} src = "!https://v16-webapp.tiktok.com/57f35a7c687b30734adbe3a004b67b36/62303541/video/tos/useast2a/tos-useast2a-ve-0068c003/7fb88e4278bb4ceca7104aa76740d12a/?a=1988&br=3576&bt=1788&cd=0%7C0%7C1%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=XOQ9-33Hnz7ThfWdvDXq&l=202203150041260101890741480679ACA5&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amRwNmg6Zm1lOzMzNzczM0ApOTtoaGUzOTtpN2Q2Nmc2NGdnczA2cjRfcmdgLS1kMTZzc2EuYTQ2YWEuXi4zM2A1YTE6Yw%3D%3D&vl=&vr="/>
      </div> */}


      {/* data stuff
      <div>
        <b>OLD TIKTOK DATA</b>
        {typeof userData.most_common_hashtags === "undefined" ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p>{userData.username}</p>
            <img
              src={userData.profilePicture}
              alt="Profile Picture"
              width="178"
              height="178"
            ></img>
            <div id="profilelink">
              <p>
                <a
                  href={"https://www.tiktok.com/@" + String(userData.id)}
                  target="_blank"
                >
                  TikTok Profile
                </a>
              </p>
            </div>
            <b>MOST COMMON HASHTAGS</b>
            <div>
              {userData.most_common_hashtags.map((hasht, i) => (
                <p key={i} style={{ margin: "3px 0" }}>
                  {hasht[0]} - {hasht[1]}
                </p>
              ))}
            </div>
            <b>MOST LIKED USERS</b>
            <div>
              {userData.most_liked_users.map((hasht, i) => (
                <p key={i} style={{ margin: "3px 0" }}>
                  {hasht[0]} - {hasht[1]}
                </p>
              ))}
            </div>
            <b>MOST LIKED SOUNDS</b>
            <div>
                {userData.most_liked_sounds.map((hasht, i) => (
                <p key={i} style={{ margin: "3px 0" }}>
                  {hasht[0]} - {hasht[1]}
                </p>
              ))}
            </div> 
          </div>
        )}
      </div> */}