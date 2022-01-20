import React, { useState } from "react";
import { Icon } from "@iconify/react";

class FolderNode {
  // Create Node of folder/file to make tree data structure
  constructor(name) {
    this.name = name;
    // if it is folder then we have to go the another descendents if it is file then we have to open it
    this.subFolder = [];
  }
}

class FileNode {
  // Create Node for file
  constructor(name) {
    this.name = name;
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
    console.log(head.name);
    for (let i = 0; i < head.subFolder.length; i++) {
      console.log(head.subFolder[i]);
    }
  };
  const addFolder = () => {
    const content = document.getElementsByClassName("File_Page_Add_Button")[0]
      .files;
    // getting all the file after use input
    const files = Object.values(content);
    // converting file into arrays
    let head = new FolderNode("head");
    // creating head node for the tree structure
    for (let fileCount = 0; fileCount < files.length; fileCount++) {
      // iterating all the files array
      let ptr = head;
      // assigning to ptr to traversal node
      let fileDirectory = files[fileCount].webkitRelativePath.split("/");
      // spliting directory path into array to create a tree structure
      for (
        let fileDirectoryCount = 0;
        fileDirectoryCount < fileDirectory.length;
        fileDirectoryCount++
      ) {
        // iterating to all splitted directory array path
        let include = false;
        // is subFolder is include in subFolder[]
        let file = false;
        // is current iterative is file
        ptr.subFolder.map((value, index) => {
          if (value.name === fileDirectory[fileDirectoryCount]) {
            // if folder name is already included in subFolder
            include = true;
          }
        });
        if (fileDirectory[fileDirectoryCount].includes(".")) {
          // if it is file
          file = true;
        }
        if (!include && !file) {
          // if folder name is not included and it is not file then we will create node and append to the subfolder
          let node = new FolderNode(fileDirectory[fileDirectoryCount]);
          ptr.subFolder.push(node);
        } else if (!include && file) {
          // if file is not included and if it is file then we will create file node and append to the subfolder
          let node = new FileNode(fileDirectory[fileDirectoryCount]);
          ptr.subFolder.push(node);
        }
        ptr = ptr.subFolder[ptr.subFolder.length - 1];
        // traversaling to the next subfolder
      }
    }
    displayTree(head);
  };
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
          // multiple
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
