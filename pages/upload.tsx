import React, { useState } from "react";
import { topics } from "utils/constants";
import { Head } from "components/Head";
import { VideoAsset } from "features/VideoAsset";

const Upload = () => {
  const [caption, setCaption] = useState("");
  const [topic, setTopic] = useState(topics[0].name);
  const [loading, setLoading] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  return (
    <>
      <Head title="Upload" />
      <div className="upload">
        <div className="upload__container">
          <div>
            <div>
              <h3 className="upload__title">Upload Video</h3>
              <p className="upload__subtitle">Post a video to your account</p>
              <div className="upload__wrapper">
                {loading ? (
                  <p className="upload-loading__text">Loading...</p>
                ) : (
                  <VideoAsset />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
