import "../styles/GalleryEditor.css";

/**
 * existingImages: [{ id, image }]  — backendda saqlangan, alohida o'chiriladi
 * newFiles: File[]  — hali saqlanmagan, faqat lokal preview
 * onDeleteExisting(id)
 * onNewFilesChange(File[])
 */
function ImageGalleryEditor({
  existingImages = [],
  newFiles = [],
  onDeleteExisting,
  onNewFilesChange,
}) {
  const handleAdd = (e) => {
    const picked = Array.from(e.target.files || []);
    if (picked.length === 0) return;
    onNewFilesChange([...newFiles, ...picked]);
    e.target.value = "";
  };

  const removeNewFile = (idx) => {
    onNewFilesChange(newFiles.filter((_, i) => i !== idx));
  };

  return (
    <div className="gallery-editor">
      {(existingImages.length > 0 || newFiles.length > 0) && (
        <div className="gallery-grid">
          {existingImages.map((img) => (
            <div className="gallery-item" key={img.id}>
              <img src={img.image} alt="" />
              <button
                type="button"
                className="gallery-remove"
                onClick={() => onDeleteExisting(img.id)}
                title="O'chirish"
              >
                ×
              </button>
            </div>
          ))}

          {newFiles.map((file, idx) => (
            <div className="gallery-item gallery-item-new" key={`new-${idx}`}>
              <img src={URL.createObjectURL(file)} alt="" />
              <span className="gallery-new-badge">yangi</span>
              <button
                type="button"
                className="gallery-remove"
                onClick={() => removeNewFile(idx)}
                title="Bekor qilish"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="gallery-add-btn">
        + Rasm qo'shish (bir nechtasini birga tanlash mumkin)
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleAdd}
          hidden
        />
      </label>
    </div>
  );
}

export default ImageGalleryEditor;
