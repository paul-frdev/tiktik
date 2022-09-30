import React, { useEffect, useState } from "react";
import { SanityAssetDocument } from "@sanity/client";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button } from "components/Elements/Button";
import { useAuthStore } from "store/authStore";
import { useRouter } from "next/router";
import { client } from "utils/client";

export const VideoAsset = () => {
  const [wrongFileType, setWrongFileType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoAssetValue, setVideoAssetValue] = useState<
    SanityAssetDocument | undefined
  >();

  const userProfile: any = useAuthStore((state) => state.userProfile);
  const route = useRouter();

  useEffect(() => {
    if (!userProfile) {
      route.push(`/`);
    }
  }, [userProfile, route]);

  const uploadVideo = async (e: any) => {
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
  };
  return (
    <div className="video-asset">
      {!videoAssetValue ? (
        <label className="video-asset__label">
          <div className="video-asset__wrapper">
            <div className="video-asset__content">
              <p className="video-asset__icon">
                <FaCloudUploadAlt />
              </p>
              <p className="video-asset__title"> Select video to upload</p>
            </div>
            <p className="video-asset__subtitle">
              MP4 or WebM or ogg <br />
              720x1280 resolution or higher <br />
              Up to 10 minutes <br />
              Less than 2 GB
            </p>
            <Button variant="primary" className="video-asset__button">
              Select file
            </Button>
          </div>
          <input
            type="file"
            name="upload-video"
            className="video-asset__input"
            onChange={(e) => uploadVideo(e)}
          />
        </label>
      ) : null}
    </div>
  );
};
