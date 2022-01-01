import React from "react";

const Upload = () => {
  return (
    <>
      <div className="Upload_Page_Container">
        <div className="Upload_Page_Input_Field_Container">
          <input
            className="Upload_Page_Title_Field"
            type="text"
            placeholder="Song Title"
          />
          <input
            className="Upload_Page_Singer_Name_Field"
            type="text"
            placeholder="Singer Name"
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
          />
          <label htmlFor="file-input" className="Upload_Page_File_Field_Picker">
            <p>Pick File</p>
          </label>
          <input
            id="file-input"
            className="Upload_Page_File_Field"
            type="file"
            placeholder="File"
          />
          <input
            className="Upload_Page_Upload_Button"
            type="button"
            value="Upload"
          />
        </div>
      </div>
    </>
  );
};
export default Upload;
