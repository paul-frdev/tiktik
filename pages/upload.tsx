import React, { useState } from "react";
import { topics } from "utils/constants";
import { Head } from "components/Head";
import { VideoAsset } from "features/VideoAsset";
import { ChooseTopicForm } from "forms/ChooseTopicForm";

const Upload = () => {
  const [loading, setLoading] = useState(false);
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
              <ChooseTopicForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
