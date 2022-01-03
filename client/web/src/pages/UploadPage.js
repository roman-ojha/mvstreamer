import React, { useState } from "react";
import { instance as axios } from "../services/axios";

const getUploadImage = (event) => {
  try {
    const viewImage = document.getElementsByClassName(
      "Upload_Page_Image_Container"
    )[0];
    const imgTitle = viewImage.children[0];
    const imgContainer = viewImage.children[1];
    imgContainer.style = "visibility:visible; position:static;";
    imgTitle.style = "visibility:hidden;position:absolute";
    const image = URL.createObjectURL(event.target.files[0]);
    imgContainer.src = image;
    //   console.log(image);
  } catch (err) {
    console.log(err);
  }
};

const UploadPage = () => {
  const [songInfo, setSongInfo] = useState({
    title: "",
    singerName: "",
  });

  const getMediaUploadField = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSongInfo({
      ...songInfo,
      [name]: value,
    });
  };
  const uploadMedia = async () => {
    try {
      const media = document.getElementsByClassName("Upload_Page_File_Field")[0]
        .files[0];
      const image = document.getElementsByClassName(
        "Upload_Page_Image_Field"
      )[0].files[0];
      let data = new FormData();
      data.append("image", image);
      // data.append("media", media);
      data.append("title", songInfo.title);
      data.append("singerName", songInfo.singerName);
      // const res = await axios.post("/upload", data, { withCredentials: true });
      const res = await fetch(`${process.env.REACT_APP_BASE_API_URL}/upload`, {
        method: "POST",
        body: data,
      });
      // console.log(await res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="Upload_Page_Container">
        <div className="Upload_Page_Image_Container">
          <h1 style={{ visibility: "visible", position: "static" }}>Image</h1>
          <img
            className="Upload_Page_Image"
            src=""
            alt="img"
            style={{ visibility: "hidden", position: "absolute" }}
          />
        </div>
        <div className="Upload_Page_Input_Field_Container">
          <input
            className="Upload_Page_Title_Field"
            type="text"
            placeholder="Song Title"
            name="title"
            value={songInfo.title}
            onChange={getMediaUploadField}
          />
          <input
            className="Upload_Page_Singer_Name_Field"
            type="text"
            placeholder="Singer Name"
            name="singerName"
            value={songInfo.singerName}
            onChange={getMediaUploadField}
          />
          <label
            htmlFor="image-input"
            className="Upload_Page_Image_Field_Picker"
          >
            <p>Pick Image</p>
          </label>
          <input
            id="image-input"
            className="Upload_Page_Image_Field"
            type="file"
            placeholder="Image"
            onChange={getUploadImage}
            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
          />
          <label htmlFor="file-input" className="Upload_Page_File_Field_Picker">
            <p>Pick File</p>
          </label>
          <input
            id="file-input"
            className="Upload_Page_File_Field"
            type="file"
            placeholder="File"
            accept=".mp3, .wav, .mp4, .mov, .mkv"
          />
          <input
            className="Upload_Page_Upload_Button"
            type="button"
            value="Upload"
            onClick={uploadMedia}
          />
        </div>
      </div>
    </>
  );
};
export default UploadPage;
