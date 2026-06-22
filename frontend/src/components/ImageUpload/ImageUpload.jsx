import React from "react";
import "./ImageUpload.css";

const ImageUpload = ({ file, preview, error, onChange }) => {
  return (
    <div className="img-upload__group">
      <label className="img-upload__label" htmlFor="meterImage">
        Meter Image <span className="img-upload__required">*</span>
      </label>

      <div
        className={`img-upload__area
          ${error ? "img-upload__area--error" : ""}
          ${preview ? "img-upload__area--has-file" : ""}
        `}
      >
        <input
          className="img-upload__input"
          type="file"
          id="meterImage"
          name="meterImage"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          onChange={onChange}
        />

        {preview ? (
          <div className="img-upload__preview">
            <img
              src={preview}
              alt="Meter preview"
              className="img-upload__thumb"
            />
            <span className="img-upload__filename">{file?.name}</span>
          </div>
        ) : (
          <div className="img-upload__placeholder">
            <span className="img-upload__icon" aria-hidden="true">📷</span>
            <span className="img-upload__hint">Click to upload or drag &amp; drop</span>
            <span className="img-upload__formats">JPG, JPEG, PNG only</span>
          </div>
        )}
      </div>

      {error && (
        <span className="img-upload__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default ImageUpload;