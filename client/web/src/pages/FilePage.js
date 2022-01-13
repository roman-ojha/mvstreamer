import React, { useState } from "react";
import { Icon } from '@iconify/react';

const FilePage = () => {
  const [rootFolders,setRootFolder]=useState(["Picture","Image","Studio","Wallpapers","Music","Video"]);


    const addFolder=()=>{
     const content= document.getElementsByClassName('File_Page_Add_Button')[0].files;
     const files=Object.values(content)
     const folder= files[0].webkitRelativePath.split("/")[0];
     setRootFolder([...rootFolders,folder]);
    }

  const Folder=(props)=>{
    return <>
    <div className="FilePage_Folder_Container">
      <div className="FilePage_Folder_Inner_Box">
    <Icon icon="bx:bxs-folder" width="13rem" color="rgb(94 138 189)"/>
    <h1>{props.folderName}</h1>
      </div>
    </div>
    </>
  }
  return (
    <>
    <div className="FilePage_Container">
      <div className="FilePage_List_of_Folder">
        {rootFolders.map((value,index)=>{
          return <Folder folderName={value} key={index}/>
        })}
      </div>
     
          <input
            id="image-input"
            style={{visibility:"hidden",position:"absolute"}}
            className="File_Page_Add_Button"
            type="file"
            placeholder="Image"
            webkitdirectory="true"
            multiple
            onChange={addFolder}
          />
     <label
            htmlFor="image-input"
            className="FilePage_AddFolder_Button"
          >
            <h3>Add Folder</h3>
        <Icon icon="carbon:add-alt" width="4rem" color="white"/>
          </label>
      </div>
    </>
  );
   
  
};

export default FilePage;
