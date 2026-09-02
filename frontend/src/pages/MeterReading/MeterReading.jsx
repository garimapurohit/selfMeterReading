import { useEffect, useState } from "react";
import "./MeterReading.css";

import Navbar from "../../components/Navbar/Navbar";

import Footer from "../../components/Footer/Footer";
import ReadingForm from "../../components/ReadingForm/ReadingForm";
import api from "../../services/api";
// intially the form will have these values- and when user press clear it will reset to these valuse only
const FormInitial = {
  caNumber: "",
  meterNumber: "",
  readingDate: "",
  kwh: "",
  kvh: "",
  kwhImage: null,
  kvahImage: null,
};
// At starting there won't be error it will be visble,,, after userr clickss the save button

const ErrorsInitial = {
  caNumber: "",
  meterNumber: "",
  readingDate: "",
  kwh: "",
  kvh: "",
  kwhImage: "",
  kvahImage: "",
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
  const [kwhPreview, setKwhPreview] = useState(null);
  const [kvahPreview, setKvahPreview] = useState(null);
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    setForm((prev) => ({
      ...prev,
      caNumber: user.caNumber,
    }));
  }
}, []);
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
    if (!fields.kwhImage) {
      errs.kwhImage = "KWH image is required.";
    }
    if (!fields.kvahImage) {
      errs.kvahImage = "KVAH image is required.";
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
const handleImageChange = (e) => {
  const { id, files } = e.target;

  const file = files[0];

  if (!file) return;

  const allowed = [
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (!allowed.includes(file.type)) {
    setErrors((prev) => ({
      ...prev,
      [id]: "Only .jpg, .jpeg or .png files are allowed.",
    }));

    return;
  }

  setForm((prev) => ({
    ...prev,
    [id]: file,
  }));

  setErrors((prev) => ({
    ...prev,
    [id]: "",
  }));

  const reader = new FileReader();

  reader.onloadend = () => {
    if (id === "kwhImage") {
      setKwhPreview(reader.result);
    } else {
      setKvahPreview(reader.result);
    }
  };

  reader.readAsDataURL(file);
};
const handleSave = async (e) => {
  e.preventDefault();
  console.log("button clicked");
    console.log(form);


  const errs = validate(form);
  setErrors(errs);

  const hasErrors = Object.values(errs).some(
    (msg) => msg !== ""
  );

  if (hasErrors) return;

  // Create FormData object
  const formData = new FormData();

  formData.append("caNumber", form.caNumber);
  formData.append("meterNumber", form.meterNumber);
  formData.append("readingDate", form.readingDate);
  formData.append("kwh", form.kwh);
  formData.append("kvh", form.kvh);
  formData.append("kwhImage",form.kwhImage);
  formData.append("kvahImage",form.kvahImage);

try {
  const response = await api.post("/readings", formData);

  const data = response.data;

  console.log("API Response:", data);

  if (data.success) {
    alert("Reading Saved Successfully!");

    handleClear();
  } else {
    alert(data.message);
  }
} catch (error) {
  console.error("Error:", error);
}
};
const handleClear = () => {
  setForm(FormInitial);
  setErrors(ErrorsInitial);

  setKwhPreview(null);
  setKvahPreview(null);

  const kwhInput = document.getElementById("kwhImage");
  const kvahInput = document.getElementById("kvahImage");

  if (kwhInput) kwhInput.value = "";
  if (kvahInput) kvahInput.value = "";
};

  
  return (
    <div className="meter-page">
      <Navbar />

      <main className="meter-page__main">
        <ReadingForm
        form={form}
        errors={errors}
        kwhPreview={kwhPreview}
        kvahPreview={kvahPreview}
        onChange={handleChange}
        onFileChange={handleImageChange}
        onSave={handleSave}
        onClear={handleClear}
        />
      </main>

      <Footer />
    </div>
  );
  
};
export default MeterReading;