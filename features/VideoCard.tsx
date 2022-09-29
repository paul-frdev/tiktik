import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { Video } from "types";
import { Button } from "components/Elements/Button";
import NoAvailableImage from "../assets/no-image.png";

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
}

export const VideoCard: NextPage<IProps> = ({ post, isShowingOnHome }) => {
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { caption, postedBy, video, likes, _id } = post;

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <div className="video-card">
      <div>
        <div className="video-card__content">
          <div className="video-card__container">
            <Link href={`/profile/${postedBy._id}`}>
              <Image
                width={62}
                height={62}
                className={
                  post.postedBy.image
                    ? "video-card__image"
                    : "video-card__image--noavalaiable"
                }
                src={post.postedBy.image || NoAvailableImage}
                alt="avatar"
                layout="responsive"
              />
            </Link>
          </div>
          <div>
            <Link href={`/profile/${postedBy._id}`}>
              <div className="video-card__user">
                <p className="video-card__username">
                  {postedBy.userName}{" "}
                  <GoVerified className="video-card__icon" />
                </p>
                <p className="video-card__usernamelight">{postedBy.userName}</p>
              </div>
            </Link>
            <Link href={`/detail/${_id}`}>
              <p className="video-card__caption">{caption}</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="video-card__screen">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(true)}
        >
          <Link href={`/detail/${_id}`}>
            <video
              className="video-card__player"
              loop
              ref={videoRef}
              src={video.asset.url}
            />
          </Link>

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
                <Button
                  onClick={() => setIsVideoMuted(false)}
                  variant="values"
                  size="sm"
                >
                  <HiVolumeOff />
                </Button>
              ) : (
                <Button
                  onClick={() => setIsVideoMuted(true)}
                  variant="values"
                  size="sm"
                >
                  <HiVolumeUp />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
