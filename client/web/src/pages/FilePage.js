import React, { useState } from "react";
import { Icon } from '@iconify/react';

class Folder_File_Node{
  // Create Node of folder/file to make tree data structure
  constructor(value,type){
    this.value=value;
    this.type=type;
    // type could be folder or file 
    // if it is folder then we have to go the another descendents if it is file then we have to open it
    this.descendants=[];
  }
};

const FilePage = () => {
  const [rootFolders,setRootFolder]=useState(["Picture","Image","Studio","Wallpapers","Music"]);

    const addFolder=()=>{
     const content= document.getElementsByClassName('File_Page_Add_Button')[0].files;
     const files=Object.values(content)
     let folder;
     let head;
     const folderTree=[];
     for(let file of files){
       let folder_Directory=file.webkitRelativePath.split("/");
       console.log(folder_Directory);
      // for (let i=0;i<folder_Directory.length;i++){
      //   console.log(folder_Directory[i]);
      //   if(head)

      //   if(i===0){
      //     folder=new Folder_File_Node(folder_Directory[i]);
      //     head=new Folder_File_Node(folder_Directory[i]);
      //   }
      //   else{
      //     folder.descendants.push(folder_Directory[i]);
      //     folder=new Folder_File_Node(folder_Directory[i]);
      //   }
      // }
     }
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
