import { SanityAssetDocument } from "@sanity/client";
import axios from "axios";
import { Button } from "components/Elements/Button";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthStore } from "store/authStore";
import { BASE_URL } from "utils";
import { topics } from "utils/constants";

interface IChooseTopicForm {
  videoAssetValue?: SanityAssetDocument | undefined;
  setVideoAssetValue?: (data: SanityAssetDocument | undefined) => void;
}
export const ChooseTopicForm = ({
  videoAssetValue,
  setVideoAssetValue,
}: IChooseTopicForm) => {
  const [caption, setCaption] = useState("");
  const [topic, setTopic] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const userProfile: any = useAuthStore((state) => state.userProfile);
  const router = useRouter();

  const handlePost = async () => {
    if (caption && videoAssetValue?._id && topic) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAssetValue?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic,
      };

      await axios.post(`${BASE_URL}/api/post`, document);
      router.push("/");
    }
  };

  const handleDiscard = () => {
    setSavingPost(false);
    setVideoAssetValue?.(undefined);
    setCaption("");
    setTopic("");
  };

  return (
    <form className="choose-topic">
      <label className="choose-topic__label">Caption</label>
      <input
        className="choose-topic__input"
        type="text"
        onChange={(e) => setCaption(e.target.value)}
      />
      <label className="choose-topic__label">Choose a topic</label>
      <select
        className="choose-topic__select"
        onChange={(e) => setTopic(e.target.value)}
      >
        {topics.map((item: any) => (
          <option
            className="choose-topic__option"
            value={item.name}
            key={item.id}
          >
            {item.name}
          </option>
        ))}
      </select>
      <div className="choose-topic__buttons">
        <Button onClick={handleDiscard} className="choose-topic__buttos-btn">
          Discard
        </Button>
        <Button
          disabled={!videoAssetValue?.url || !caption || !topic}
          onClick={handlePost}
          className="choose-topic__buttons-btn"
        >
          {savingPost ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  );
};
