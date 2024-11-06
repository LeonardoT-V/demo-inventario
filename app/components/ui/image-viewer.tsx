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
      <img src={url_img} alt={alt} className={`bg-card p-4 ${className}`} />
    );
  }
  return (
    <div className={`rounded-md bg-card p-4 ${className}`}>
      <IconImage className="size-full" />
    </div>
  );
}
