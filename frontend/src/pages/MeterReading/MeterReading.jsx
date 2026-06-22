import React, { useState } from "react";
import "./MeterReading.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ReadingForm from "../../components/ReadingForm/ReadingForm";
import imageUpload from "../../components/ImageUpload/ImageUpload";

// ── Initial state ──────────────────────────────────────────
const INITIAL_FORM = {
  caNumber: "",
  meterNumber: "",
  readingDate: "",
  kwh: "",
  kvh: "",
  meterImage: null,
};

const INITIAL_ERRORS = {
  caNumber: "",
  meterNumber: "",
  readingDate: "",
  kwh: "",
  kvh: "",
  meterImage: "",
};

// ── Helpers ────────────────────────────────────────────────
const getTodayStr = () => new Date().toISOString().split("T")[0];

const getDaysAgoStr = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
};

// ── Page Component ─────────────────────────────────────────
const MeterReading = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [imagePreview, setImagePreview] = useState(null);

  // ── Validation ───────────────────────────────────────────
  const validate = (fields) => {
    const errs = { ...INITIAL_ERRORS };
    const today = getTodayStr();
    const twoDaysAgo = getDaysAgoStr(2);

    if (!fields.caNumber.trim())
      errs.caNumber = "CA Number is required.";
    else if (!/^\d+$/.test(fields.caNumber)) {
      errs.caNumber = "CA Number must contain digits only.";
    }

    if (!fields.meterNumber.trim())
      errs.meterNumber = "Meter Number is required.";
    else if(!/^\d+$/.test(fields.meterNumber)){
      errs.meterNumber = "Meter Number must contain digits only.";
    }

    if (!fields.readingDate) {
      errs.readingDate = "Reading Date is required.";
    } else if (fields.readingDate > today) {
      errs.readingDate = "Date cannot be in the future.";
    } else if (fields.readingDate < twoDaysAgo) {
      errs.readingDate = "Date cannot be older than 2 days from today.";
    }

    if (fields.kwh === "" || fields.kwh === null) {
      errs.kwh = "KWH reading is required.";
    } else if (Number(fields.kwh) <= 0) {
      errs.kwh = "KWH must be a positive number.";
    }

    if (fields.kvh === "" || fields.kvh === null) {
      errs.kvh = "KVH reading is required.";
    } else if (Number(fields.kvh) <= 0) {
      errs.kvh = "KVH must be a positive number.";
    }

    if (!fields.meterImage)
      errs.meterImage = "Meter image is required.";

    return errs;
  };

  // ── Handlers ─────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        meterImage: "Only .jpg, .jpeg, or .png files are allowed.",
      }));
      setForm((prev) => ({ ...prev, meterImage: null }));
      setImagePreview(null);
      return;
    }

    setForm((prev) => ({ ...prev, meterImage: file }));
    setErrors((prev) => ({ ...prev, meterImage: "" }));

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);

    const hasErrors = Object.values(errs).some((msg) => msg !== "");
    if (hasErrors) return;

    console.log("=== Meter Reading Submission ===");
    console.log({
      caNumber: form.caNumber,
      meterNumber: form.meterNumber,
      readingDate: form.readingDate,
      kwh: Number(form.kwh),
      kvh: Number(form.kvh),
      meterImage: {
        name: form.meterImage.name,
        size: form.meterImage.size,
        type: form.meterImage.type,
      },
    });
    console.log("================================");
  };

  const handleClear = () => {
    setForm(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
    setImagePreview(null);
    const fileInput = document.getElementById("meterImage");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="meter-page">
      <Header />

      <main className="meter-page__main">
        <ReadingForm
          form={form}
          errors={errors}
          imagePreview={imagePreview}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onSave={handleSave}
          onClear={handleClear}
        />
      </main>

      <Footer />
    </div>
  );
};

export default MeterReading;