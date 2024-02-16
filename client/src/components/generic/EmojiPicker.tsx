import EmojiPicker from "emoji-picker-react";

interface EmojipickerProps {
  className?: string;
  setEmojidata: (item: Object) => void;
  lazyLoadEmojis?: boolean;
  width?: string | number;
  height?: string | number;
}
export default function Emojipicker({
  className,
  setEmojidata,
  lazyLoadEmojis,
  width,
  height,
}: EmojipickerProps) {
  return (
    <EmojiPicker
      className={className}
      lazyLoadEmojis={lazyLoadEmojis}
      width={width}
      height={height}
      onEmojiClick={(item) => setEmojidata(item)}
    />
  );
}
