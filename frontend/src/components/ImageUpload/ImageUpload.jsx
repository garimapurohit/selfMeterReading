import React from "react";
import "./ImageUpload.css";

const ImageUpload = ({
  kwhFile,
  kwhPreview,
  kvahFile,
  kvahPreview,
  errors,
  onKwhChange,
  onKvahChange,
}) => {
  return (
    <div className="imageUploadWrapper">

      {/* KWH IMAGE */}
      <div className="imageUploadGroup">
        <label className="imgUploadLabel" htmlFor="kwhImage">
          KWH Meter Image <span className="imgUploadRequired">*</span>
        </label>

        <div
          className={`imgUploadArea
            ${errors?.kwhImage ? "imgUploadArea_error" : ""}
            ${kwhPreview ? "imgUploadArea_hasfile" : ""}
          `}
        >
          <input
            className="imguploadinput"
            type="file"
            id="kwhImage"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            onChange={onKwhChange}
          />

          {kwhPreview ? (
            <div className="imgUploadPreview">
              <img
                src={kwhPreview}
                alt="KWH Preview"
                className="imgUploadThumb"
              />
              <span className="imgUploadFilename">
                {kwhFile?.name}
              </span>
            </div>
          ) : (
            <div className="imgUploadPlaceholder">
              <span className="imgUploadHint">
                Upload KWH Meter Image
              </span>

              <span className="imgUploadFormats">
                Max size 5 MB
              </span>
            </div>
          )}
        </div>

        {errors?.kwhImage && (
          <span className="imgUploadError">
            {errors.kwhImage}
          </span>
        )}
      </div>

      {/* KVAH IMAGE */}
      <div className="imageUploadGroup">
        <label className="imgUploadLabel" htmlFor="kvahImage">
          KVAH Meter Image <span className="imgUploadRequired">*</span>
        </label>

        <div
          className={`imgUploadArea
            ${errors?.kvahImage ? "imgUploadArea_error" : ""}
            ${kvahPreview ? "imgUploadArea_hasfile" : ""}
          `}
        >
          <input
            className="imguploadinput"
            type="file"
            id="kvahImage"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            onChange={onKvahChange}
          />

          {kvahPreview ? (
            <div className="imgUploadPreview">
              <img
                src={kvahPreview}
                alt="KVAH Preview"
                className="imgUploadThumb"
              />
              <span className="imgUploadFilename">
                {kvahFile?.name}
              </span>
            </div>
          ) : (
            <div className="imgUploadPlaceholder">
              <span className="imgUploadHint">
                Upload KVAH Meter Image
              </span>

              <span className="imgUploadFormats">
                Max size 5 MB
              </span>
            </div>
          )}
        </div>

        {errors?.kvahImage && (
          <span className="imgUploadError">
            {errors.kvahImage}
          </span>
        )}
      </div>

    </div>
  );
};

export default ImageUpload;