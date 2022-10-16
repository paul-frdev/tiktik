import React, { useRef, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { Video } from "types";
import { Button } from "components/Elements/Button";
import { useRouter } from "next/router";
import clsx from "clsx";
import { ProfileCard } from "./ProfileCard";

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
}

export const VideoCard: NextPage<IProps> = ({ post }) => {
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { video } = post;

  const router = useRouter();
  const detail = router.pathname === "/detail/[id]";

  const onVideoPress = (event: any) => {
    event.stopPropagation();
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  const onVideoMuted = (event: any) => {
    event.stopPropagation();
    if (videoRef?.current) {
      setIsVideoMuted((prev) => !prev);
      videoRef.current.muted = isVideoMuted;
    }
  };

  return (
    <div
      className={`${clsx("video-card", {
        "details-video__card": detail,
      })}`}
    >
      {!detail && <ProfileCard post={post} />}
      <div className="video-card__screen">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(true)}
        >
          <Link href={`/detail/${post._id}`}>
            <div style={{ position: "relative" }}>
              <video
                className="video-card__player"
                loop
                ref={videoRef}
                src={video.asset.url}
              />
              {isHover && (
                <div className="video-card__buttons">
                  {playing ? (
                    <Button onClick={onVideoPress} variant="values" size="sm">
                      <BsFillPauseFill />
                    </Button>
                  ) : (
                    <Button onClick={onVideoPress} variant="values" size="sm">
                      <BsFillPlayFill />
                    </Button>
                  )}
                  {isVideoMuted ? (
                    <Button onClick={onVideoMuted} variant="values" size="sm">
                      <HiVolumeUp />
                    </Button>
                  ) : (
                    <Button onClick={onVideoMuted} variant="values" size="sm">
                      <HiVolumeOff />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
