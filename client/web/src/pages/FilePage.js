import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { set } from "mongoose";

class FolderNode {
  // Create Node of folder/file to make tree data structure
  constructor(name, type) {
    this.name = name;
    this.type = type;
    // if it is folder then we have to go the another descendents if it is file then we have to open it
    this.subFolder = [];
  }
}

class FileNode {
  // Create Node for file
  constructor(name, file, type) {
    this.name = name;
    this.type = type;
    this.file = file;
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

  const [currentDisplayedFileandFolder, setCurrentDisplayedFileandFolder] =
    useState([]);

  const displayTree = (head) => {
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
      let file = files[fileCount];
      // getting single file
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
        let isFile = false;
        // is current iterative is file
        ptr.subFolder.map((folder, index) => {
          if (folder.name === fileDirectory[fileDirectoryCount]) {
            // if folder name is already included in subFolder
            include = true;
          }
        });
        if (fileDirectory[fileDirectoryCount].includes(".")) {
          // if it is file
          isFile = true;
        }
        if (!include && !isFile) {
          // if folder name is not included and it is not file then we will create node and append to the subfolder
          let node = new FolderNode(
            fileDirectory[fileDirectoryCount],
            "folder"
          );
          ptr.subFolder.push(node);
        } else if (!include && isFile) {
          // if file is not included and if it is file then we will create file node and append file name and file into the subfolder
          let node = new FileNode(
            fileDirectory[fileDirectoryCount],
            file,
            "file"
          );
          ptr.subFolder.push(node);
        }
        ptr = ptr.subFolder[ptr.subFolder.length - 1];
        // traversaling to the next subfolder
      }
    }
    // displayTree(head);
    setCurrentDisplayedFileandFolder(head.subFolder);
  };
  const Folder = (props) => {
    const openFolder = () => {
      let currentClickedFolder = props.Node;
      setCurrentDisplayedFileandFolder(currentClickedFolder.subFolder);
    };
    if (props.Node.type === "folder") {
      return (
        <>
          <div className="FilePage_Folder_Container" onClick={openFolder}>
            <div className="FilePage_Folder_Inner_Box">
              <Icon
                icon="bx:bxs-folder"
                width="13rem"
                color="rgb(94 138 189)"
              />
              <h1>{props.Node.name}</h1>
            </div>
          </div>
        </>
      );
    } else if (props.Node.type === "file") {
      return (
        <>
          <div className="FilePage_Folder_Container">
            <div className="FilePage_Folder_Inner_Box">
              <Icon
                icon="akar-icons:file"
                width="13rem"
                color="rgb(94 138 189)"
              />
              <h1>{props.Node.name}</h1>
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };
  return (
    <>
      <div className="FilePage_Container">
        <div className="FilePage_List_of_Folder">
          {currentDisplayedFileandFolder.map((node, index) => {
            return <Folder Node={node} key={index} />;
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
