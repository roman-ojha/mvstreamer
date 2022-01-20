import React, { useState } from "react";
import { Icon } from "@iconify/react";

class Folder_File_Node {
  // Create Node of folder/file to make tree data structure
  constructor(value, type) {
    this.value = value;
    this.type = type;
    // type could be folder or file
    // if it is folder then we have to go the another descendents if it is file then we have to open it
    this.descendants = [];
  }
}

const FilePage = () => {
  const [rootFolders, setRootFolder] = useState([
    "Picture",
    "Image",
    "Studio",
    "Wallpapers",
    "Music",
  ]);

  const displayTree = (head) => {
    // while(head.descendants!==null){
    //   console.log(head.value);
    //   head=head.descendants
    // }
    console.log(head.value);
    console.log(head.descendants);
    for (let i = 0; i < head.descendants.length; i++) {
      console.log(head.descendants[i]);
      // for (let j = 0; j < head.descendants[i].descendants.length; j++) {
      //   console.log(head.descendants[j].descendants[j]);
      //   for (let k = 0; k < head.descendants[j].descendants.length; k++) {
      //     console.log(head.descendants[k].descendants[k]);
      //   }
      // }
    }
  };

  const createNode = (data) => {
    const n = new Folder_File_Node(data, "folder");
    n.descendants = [];
    return n;
  };

  const addFolder = () => {
    const content = document.getElementsByClassName("File_Page_Add_Button")[0]
      .files;
    const files = Object.values(content);
    let head = createNode("head", "folder");
    let ptr = head;
    // for (let file of files) {
    //   let folder_Directory = file.webkitRelativePath.split("/");
    //   if (head.descendants.length === 0) {
    //     let node = createNode(folder_Directory[0]);
    //     head.descendants.push(node);
    //   }
    //   for (let i = 1; i < folder_Directory.length; i++) {
    //     let node = createNode(folder_Directory[i]);
    //     ptr.descendants.push(node);
    //     // console.log(node);
    //     ptr = ptr.descendants[ptr.descendants.length - 1];
    //   }
    //   console.log(folder_Directory);
    // }
    // displayTree(head);
    // let i, j, k;
    // i = 0;
    // while (i < files.length) {
    //   j = 0;
    //   while (j < files.length) {
    //     let folder_Directory = files[j].webkitRelativePath.split("/");
    //     k = 0;
    //     while (k < folder_Directory.length) {
    //       console.log(folder_Directory[j]);
    //       k++;
    //     }
    //     j++;
    //   }
    //   i++;
    // }
    // while()
    let folder_Directory_Length = files[0].webkitRelativePath.split("/").length;
    let i = 0;
    let j = 0;
    let k = 0;
    while (i < folder_Directory_Length && j < files.length) {
      files.map((value, index) => {
        let folder_Directory = value.webkitRelativePath.split("/");
        console.log(folder_Directory[k]);
        folder_Directory_Length = folder_Directory.length;
        j = k;
        i = index;
      });
      k++;
    }
    // console.log(files);
  };

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
  const Folder = (props) => {
    return (
      <>
        <div className="FilePage_Folder_Container">
          <div className="FilePage_Folder_Inner_Box">
            <Icon icon="bx:bxs-folder" width="13rem" color="rgb(94 138 189)" />
            <h1>{props.folderName}</h1>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="FilePage_Container">
        <div className="FilePage_List_of_Folder">
          {rootFolders.map((value, index) => {
            return <Folder folderName={value} key={index} />;
          })}
        </div>

        <input
          id="image-input"
          style={{ visibility: "hidden", position: "absolute" }}
          className="File_Page_Add_Button"
          type="file"
          placeholder="Image"
          webkitdirectory="true"
          multiple
          onChange={addFolder}
        />
        <label htmlFor="image-input" className="FilePage_AddFolder_Button">
          <h3>Add Folder</h3>
          <Icon icon="carbon:add-alt" width="4rem" color="white" />
        </label>
      </div>
    </>
  );
};

export default FilePage;
