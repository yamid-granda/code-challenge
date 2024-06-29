import { IEmojiProps } from "./types";

export default function EmojiText(props: Readonly<IEmojiProps>) {
  const {
    emoji,
    children,
  } = props

  return <><span className="mr-1">{emoji}</span> {children}</>
};
