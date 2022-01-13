import React from "react";
import { Icon } from '@iconify/react';

const FilePage = () => {
  const Folder=()=>{
    return <>
    <div className="FilePage_Folder_Container">
      <div className="FilePage_Folder_Inner_Box">
    <Icon icon="bx:bxs-folder" width="13rem" color="rgb(94 138 189)"/>
    <h1>Folder 01</h1>
      </div>
    </div>
    </>
  }
  return (
    <>
    <div className="FilePage_Container">
      <Folder/>
      <Folder/>
      <Folder/>
      <Folder/>
      <Folder/>
      <Folder/>
      <Folder/>
      <Folder/>
      <Folder/>
      <Folder/>
      <Folder/>
      <Folder/>
      </div>
    </>
  );
   
  
};

export default FilePage;
