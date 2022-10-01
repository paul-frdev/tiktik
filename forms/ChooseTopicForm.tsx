import { Button } from "components/Elements/Button";
import React, { useState } from "react";
import { topics } from "utils/constants";

export const ChooseTopicForm = () => {
  const [caption, setCaption] = useState("");
  const [topic, setTopic] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  return (
    <div className="choose-topic">
      <label className="choose-topic__label">Caption</label>
      <input
        className="choose-topic__input"
        type="text"
        onChange={(e) => setCaption(e.target.value)}
      />
      <label className="choose-topic__main">Choose a topic</label>
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
        <Button>Discard</Button>
        <Button>{savingPost ? "Posting..." : "Post"}</Button>
      </div>
    </div>
  );
};
