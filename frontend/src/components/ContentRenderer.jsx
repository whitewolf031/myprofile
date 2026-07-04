import "../styles/ContentRenderer.css";

/**
 * Matn va rasmlarni birga chiroyli tartibda chiqaradi.
 * Joylashuv qoidasi (frontendda belgilangan, admin alohida joy
 * ko'rsatmaydi — shunchaki matn yozadi va rasmlarni yuklaydi):
 *   1-paragraf, 1-rasm, 2-paragraf, 2-rasm, ... shu tartibda davom etadi.
 *   Agar rasmlar paragraflardan ko'p bo'lsa, qolganlari oxirida
 *   galereya sifatida chiqadi. Agar paragraflar ko'p bo'lsa, qolган
 *   matn rasmlarsiz davom etadi.
 */
function ContentRenderer({ content, images = [] }) {
  const paragraphs = (content || "")
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const blocks = [];
  let imgIdx = 0;

  paragraphs.forEach((p, i) => {
    blocks.push({ type: "text", value: p, key: `t-${i}` });
    if (imgIdx < images.length) {
      blocks.push({ type: "image", value: images[imgIdx], key: `i-${imgIdx}` });
      imgIdx++;
    }
  });

  const leftoverImages = images.slice(imgIdx);

  if (blocks.length === 0 && leftoverImages.length === 0) {
    return null;
  }

  return (
    <div className="content-blocks">
      {blocks.map((b) =>
        b.type === "text" ? (
          <p key={b.key} className="content-paragraph">
            {b.value}
          </p>
        ) : (
          <img key={b.key} src={b.value} alt="" className="content-image" />
        )
      )}

      {leftoverImages.length > 0 && (
        <div className="content-gallery">
          {leftoverImages.map((src, idx) => (
            <img key={`gallery-${idx}`} src={src} alt="" className="content-gallery-image" />
          ))}
        </div>
      )}
    </div>
  );
}

export default ContentRenderer;
