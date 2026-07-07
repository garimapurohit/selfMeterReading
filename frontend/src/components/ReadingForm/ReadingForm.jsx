import React from "react";
import "./ReadingForm.css";
import ImageUpload from "../ImageUpload/ImageUpload";

const getTodayStr = () => new Date().toISOString().split("T")[0];

const getDaysAgoStr = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
};

const ReadingForm = ({
  form,
  errors,
  imagePreview,
  onChange,
  onFileChange,
  onSave,
  onClear,
}) => {
  return (
    <div className="rform__card">
      <div className="rform__card-header">
        <h2 className="rform__card-title">User's Meter Reading Form</h2>
        <p className="rform__card-subtitle">
          All fields are mandatory. Reading date must be within the last 2 days. 
          Enter the same CA number Used For registration.
        </p>
      </div>

      <form className="rform" onSubmit={onSave} Validate>
       {/* Here in this row added two fields that are CA number and meter number.. both the field are compulsory and verifies for the correct data type */}
        <div className="rform__row">
          <div className="rform__field">
            <label className="rform__label" htmlFor="caNumber">
              CA Number <span className="rform__required">*</span>
            </label>
            <input
              className={`rform__input ${errors.caNumber ? "rform__input--error" : ""}`}
              type="text"
              id="caNumber"
              name="caNumber"
              value={form.caNumber}
              onChange={onChange}
              placeholder="e.g. 1234567890"
              autoComplete="on"
            />
            {errors.caNumber && (
              <span className="rform__error" role="alert">{errors.caNumber}</span>
            )}
          </div>

          <div className="rform__field">
            <label className="rform__label" htmlFor="meterNumber">
              Meter Number <span className="rform__required">*</span>
            </label>
            <input
              className={`rform__input ${errors.meterNumber ? "rform__input--error" : ""}`}
              type="text"
              id="meterNumber"
              name="meterNumber"
              value={form.meterNumber}
              onChange={onChange}
              placeholder="e.g. MTR-00456"
              autoComplete="off"
            />
            {errors.meterNumber && (
              <span className="rform__error" role="alert">{errors.meterNumber}</span>
            )}
          </div>
        </div>

        {/* Row 2: Reading Date */}
        <div className="rform__field">
          <label className="rform__label" htmlFor="readingDate">
            Reading Date <span className="rform__required">*</span>
          </label>
          <input
            className={`rform__input rform__input--date ${errors.readingDate ? "rform__input--error" : ""}`}
            type="date"
            id="readingDate"
            name="readingDate"
            value={form.readingDate}
            onChange={onChange}
            min={getDaysAgoStr(2)}
            max={getTodayStr()}
          />
          {errors.readingDate && (
            <span className="rform__error" role="alert">{errors.readingDate}</span>
          )}
        </div>

        {/* Row 3: KWH + KVH */}
        <div className="rform__row">
          <div className="rform__field">
            <label className="rform__label" htmlFor="kwh">
              KWH <span className="rform__required">*</span>
            </label>
            <div className="rform__unit-wrap">
              <input
                className={`rform__input rform__input--unit ${errors.kwh ? "rform__input--error" : ""}`}
                type="number"
                id="kwh"
                name="kwh"
                value={form.kwh}
                onChange={onChange}
                placeholder="0"
                min="0.01"
                step="0.01"
              />
              <span className="rform__unit-badge">kWh</span>
            </div>
            {errors.kwh && (
              <span className="rform__error" role="alert">{errors.kwh}</span>
            )}
          </div>

          <div className="rform__field">
            <label className="rform__label" htmlFor="kvh">
              kVAh <span className="rform__required">*</span>
            </label>
            <div className="rform__unit-wrap">
              <input
                className={`rform__input rform__input--unit ${errors.kvh ? "rform__input--error" : ""}`}
                type="number"
                id="kvh"
                name="kvh"
                value={form.kvh}
                onChange={onChange}
                placeholder="0"
                min="0.01"
                step="0.01"
              />
              <span className="rform__unit-badge">kVAh</span>
            </div>
            {errors.kvh && (
              <span className="rform__error" role="alert">{errors.kvh}</span>
            )}
          </div>
        </div>

        {/* Row 4: Image Upload */}
        <ImageUpload
          file={form.meterImage}
          preview={imagePreview}
          error={errors.meterImage}
          onChange={onFileChange}
        />

        {/* Action Buttons */}
        <div className="rform__actions">
          <button
            type="button"
            className="rform__btn rform__btn--secondary"
            onClick={onClear}
          >
            Clear
          </button>
          <button
            type="submit"
            className="rform__btn rform__btn--primary"
          >
            Save Reading
          </button>
        </div>

      </form>
    </div>
  );
};

export default ReadingForm;