import React, { useState } from "react";
import "./MeterReading.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ReadingForm from "../../components/ReadingForm/ReadingForm";
// intially the form will have these values- and when user press clear it will reset to these valuse only
const FormInitial = {
  caNumber: "",
  meterNumber: "",
  readingDate: "",
  kwh: "",
  kvh: "",
  meterImage: null,
};
// At starting there won't be error it will be visble,,, after userr clickss the save button

const ErrorsInitial = {
  caNumber: "",
  meterNumber: "",
  readingDate: "",
  kwh: "",
  kvh: "",
  meterImage: "",
};

// converted string to get the date format.. becoz we need to compareee..
const getTodayStr = () =>
  new Date().toISOString().split("T")[0];
// we need to get the state two days ago...
// Here we take days given by user as input and calculate the  date that was 2 days before...
// this was done so that the user cannot upload reading of many days before..

const getDaysAgoStr = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
};
// for storing the valuse...of the components..
const MeterReading = () => {
  const [form, setForm] = useState(FormInitial);
  const [errors, setErrors] = useState(ErrorsInitial);
  const [imagePreview, setImagePreview] = useState(null);

  const validate = (fields) => {
    const errs = { ...ErrorsInitial };

    const today = getTodayStr();
    const twoDaysAgo = getDaysAgoStr(2);

    if (!fields.caNumber.trim()) {
      errs.caNumber = "CA Number is required.";
    } else if (!/^\d+$/.test(fields.caNumber)) {
      errs.caNumber = "CA Number must contain digits only.";
    }

    if (!fields.meterNumber.trim()) {
      errs.meterNumber = "Meter Number is required.";
    }

    if (!fields.readingDate) {
      errs.readingDate = "Reading Date is required.";
    } else if (fields.readingDate > today) {
      errs.readingDate = "Date cannot be in the future.";
    } else if (fields.readingDate < twoDaysAgo) {
      errs.readingDate =
        "Date cannot be older than 2 days from today.";
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

    if (!fields.meterImage) {
      errs.meterImage = "Meter image is required.";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowed = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        meterImage:
          "Only .jpg, .jpeg, or .png files are allowed.",
      }));

      setForm((prev) => ({
        ...prev,
        meterImage: null,
      }));

      setImagePreview(null);

      return;
    }

    setForm((prev) => ({
      ...prev,
      meterImage: file,
    }));

    setErrors((prev) => ({
      ...prev,
      meterImage: "",
    }));

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const errs = validate(form);
    setErrors(errs);

    const hasErrors = Object.values(errs).some(
      (msg) => msg !== ""
    );

    if (hasErrors) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/readings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            caNumber: form.caNumber,
            meterNumber: form.meterNumber,
            readingDate: form.readingDate,
            kwh: Number(form.kwh),
            kvh: Number(form.kvh),
          }),
        }
      );

      const data = await response.json();

      console.log("API Response:", data);

      if (data.success) {
        alert("Reading Saved Successfully!");

        handleClear();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClear = () => {
    setForm(FormInitial);
    setErrors(ErrorsInitial);
    setImagePreview(null);

    const fileInput =
      document.getElementById("meterImage");

    if (fileInput) {
      fileInput.value = "";
    }
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