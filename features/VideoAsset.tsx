import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button } from "components/Elements/Button";
import { useAuthStore } from "store/authStore";
import { useRouter } from "next/router";
import { SanityAssetDocument } from "@sanity/client";

interface IVideoAsset {
  uploadVideo?: (e: any) => void;
  setVideoAssetValue?: (data: SanityAssetDocument | undefined) => void;
  videoAssetValue?: SanityAssetDocument | undefined;
  wrongType?: boolean;
}
export const VideoAsset = ({
  uploadVideo,
  videoAssetValue,
  wrongType,
  setVideoAssetValue,
}: IVideoAsset) => {
  const userProfile: any = useAuthStore((state) => state.userProfile);
  const route = useRouter();

  const handleChange = (event: any) => {
    uploadVideo?.(event);
  };

  const resetAssetValue = () => {
    setVideoAssetValue?.(undefined);
  };

  useEffect(() => {
    if (!userProfile) {
      route.push(`/`);
    }
  }, [userProfile, route]);

  return (
    <div className="video-asset">
      {!videoAssetValue ? (
        <label className="video-asset__label">
          <div className="video-asset__wrapper">
            <div className="video-asset__content">
              <p className="video-asset__icon">
                <FaCloudUploadAlt />
              </p>
              <p className="video-asset__title">Select video to upload</p>
            </div>
            <p className="video-asset__subtitle">
              MP4 or WebM or ogg <br />
              720x1280 resolution or higher <br />
              Up to 10 minutes <br />
              Less than 2 GB
            </p>
            <p className="video-asset__button">Select file</p>
          </div>
          <input
            type="file"
            name="upload-video"
            onChange={(event: any) => handleChange(event)}
            className="video-asset__input"
          />
        </label>
      ) : (
        <div className="video-asset__current">
          <video
            src={videoAssetValue.url}
            loop
            controls
            className="video-asset__uploaded"
          />
          <div className="video-asset__filename">
            <p className="video-asset__filename-text">
              {`${videoAssetValue.originalFilename?.slice(1, 10)}...`}
            </p>
            <Button
              onClick={resetAssetValue}
              className="video-asset__filename-button"
            >
              <MdDelete />
            </Button>
          </div>
        </div>
      )}
      {wrongType && (
        <p className="video-asset__wrongtype">
          Please select an video file (mp4 or webm or ogg)
        </p>
      )}
    </div>
  );
};
