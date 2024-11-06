import QR from "react-qr-code";

export default function QRCode({
  value,
  title = "",
  ...props
}: {
  value: string;
  title?: string;
}) {
  const onImageCownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg!);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QRCode ${title}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="group relative size-full rounded-lg bg-white p-2.5">
      <button
        className="absolute left-0 top-0 z-20 size-full rounded-lg bg-black/70 text-xl text-white opacity-0 transition-opacity group-hover:opacity-100 "
        onClick={onImageCownload}
      >
        Descargar
      </button>
      <QR
        id="QRCode"
        value={value}
        {...props}
        className="size-full transition-all group-hover:blur-sm"
      />
    </div>
  );
}
