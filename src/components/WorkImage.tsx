import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo] = useState(false);

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        target="_blank"
        rel="noreferrer"
        aria-label={props.alt ? `View ${props.alt} on GitHub` : undefined}
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img src={props.image} alt={props.alt || "Project Image"} loading="lazy" decoding="async" />
        {isVideo && props.video && <video src={props.video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
