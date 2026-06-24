import React from "react";
import "./ImageUpload.css";

const ImageUpload = ({ file, preview, error, onChange }) => {
  return (
    <div className="imageUploadGroup">
      <label className="imgUploadLabel" htmlFor="meterImage">
        Meter Image <span className="imgUploadRequired">*</span>
      </label>

      <div
        className={`imgUploadArea0
          ${error ? "imgUploadArea_error" : ""}
          ${preview ? "imgUploadArea_hasfile" : ""}
        `}
      >
        <input
          className="imguploadinput"
          type="file"
          id="meterImage"
          name="meterImage"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          onChange={onChange}
        />

        {preview ? (
          <div className="imgUploadPreview">
            <img
              src={preview}
              alt="Meter preview"
              className="imgUploadThumb"
            />
            <span className="imgUploadFilename">{file?.name}</span>
          </div>
        ) : (
          <div className="imgUploadPlaceholder">
            <span className="imgUploadIcon" aria-hidden="true">📷</span>
            <span className="imgUploadHint">Click to upload or drag &amp; drop</span>
            <span className="imgUploadFormats">JPG, JPEG, PNG only</span>
          </div>
        )}
      </div>

      {error && (
        <span className="imgUploadError" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default ImageUpload;