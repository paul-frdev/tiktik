import React, { useState } from "react";
import { Head } from "components/Head";
import { VideoAsset } from "features/VideoAsset";
import { ChooseTopicForm } from "forms/ChooseTopicForm";
import { SanityAssetDocument } from "@sanity/client";
import { client } from "utils/client";

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [wrongFileType, setWrongFileType] = useState(false);
  const [videoAssetValue, setVideoAssetValue] = useState<
    SanityAssetDocument | undefined
  >();

  const uploadVideo = React.useCallback(
    async (e: any) => {
      const selectedFile = e.target.files[0];
      const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

      if (fileTypes.includes(selectedFile.type)) {
        setWrongFileType(false);
        setLoading(true);

        client.assets
          .upload("file", selectedFile, {
            contentType: selectedFile.type,
            filename: selectedFile.name,
          })
          .then((data) => {
            setVideoAssetValue(data);
            setLoading(false);
          });
      } else {
        setLoading(false);
        setWrongFileType(true);
      }
    },
    [videoAssetValue, loading]
  );

  return (
    <>
      <Head title="Upload" />
      <div className="upload">
        <div className="upload__container">
          <div>
            <h3 className="upload__title">Upload Video</h3>
            <p className="upload__subtitle">Post a video to your account</p>
            <div className="upload__wrapper">
              {loading ? (
                <p className="upload-loading__text">Loading...</p>
              ) : (
                <VideoAsset
                  uploadVideo={uploadVideo}
                  videoAssetValue={videoAssetValue}
                  setVideoAssetValue={setVideoAssetValue}
                  wrongType={wrongFileType}
                />
              )}
            </div>
          </div>
        </div>
        <ChooseTopicForm
          videoAssetValue={videoAssetValue}
          setVideoAssetValue={setVideoAssetValue}
        />
      </div>
    </>
  );
};

export default Upload;
