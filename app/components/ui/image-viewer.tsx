import { IconImage } from "@/lib/icons";

export default function ImageViewer({
  url_img,
  alt = "",
  className = "",
}: {
  url_img?: string;
  alt?: string;
  className?: string;
}) {
  if (url_img) {
    return (
      <img
        src={url_img}
        alt={alt}
        className={`rounded-lg bg-card ${className}`}
      />
    );
  }
  return (
    <div className={`rounded-lg bg-card p-4 ${className}`}>
      <IconImage className="size-full" />
    </div>
  );
}
