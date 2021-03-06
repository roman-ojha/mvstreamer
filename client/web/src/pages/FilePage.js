import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  currentAudioAction,
  currentVideoAction,
  filePageFolderTreeAction,
} from "../services/redux-actions";

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
  constructor(name, fileUrl, type, extention) {
    this.name = name;
    this.fileUrl = fileUrl;
    this.type = type;
    this.extention = extention;
  }
}

const FilePage = () => {
  const dispatch = useDispatch();
  const treeFolder = useSelector((state) => state.filePageFolderTreeReducer);
  const userProfileDetail = useSelector((state) => state.userProfileDetail);
  const navigate = useNavigate();
  const [girdView, setGirdView] = useState(true);
  const [currentDisplayedFileandFolder, setCurrentDisplayedFileandFolder] =
    useState(treeFolder);
  const addFolder = () => {
    const content = document.getElementsByClassName("File_Page_Add_Button")[0]
      .files;
    // getting all the file after use input
    const files = Object.values(content);
    // converting file into arrays
    let head = new FolderNode("head", "root");
    // creating head node for the tree structure
    for (let fileCount = 0; fileCount < files.length; fileCount++) {
      // iterating all the files array
      let file = files[fileCount];
      let fileUrl = URL.createObjectURL(file);
      // getting single file
      let ptr = head;
      // assigning to ptr to traversal node
      let fileDirectory = files[fileCount].webkitRelativePath.split("/");
      // spliting directory path into array to create a tree structure
      let fileExtention = fileDirectory[fileDirectory.length - 1].split(".")[1];
      // getting file extention
      // console.log(fileExtention);
      if (
        fileExtention !== "mp3" &&
        fileExtention !== "wav" &&
        fileExtention !== "mp4" &&
        fileExtention !== "mov" &&
        fileExtention !== "mkv"
      ) {
        // if file extention are not '.mp3, .wav, .mp4, .mov, .mkv' then we will not except that file
        continue;
        // accept=".mp3, .wav, .mp4, .mov, .mkv"
      }
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
            fileUrl,
            "file",
            fileExtention
          );
          ptr.subFolder.push(node);
        }
        ptr = ptr.subFolder[ptr.subFolder.length - 1];
        // traversaling to the next subfolder
      }
    }
    dispatch(filePageFolderTreeAction(head.subFolder[0]));
  };
  const Folder = (props) => {
    // Component
    const openFolder = () => {
      let currentClickedFolder = props.Node;
      setCurrentDisplayedFileandFolder(currentClickedFolder.subFolder);
    };
    if (props.Node.type === "folder") {
      // showing folder component if node is folder
      return (
        <>
          <div className="FilePage_Folder_Container" onClick={openFolder}>
            <div className="FilePage_Folder_Inner_Box">
              <Icon
                icon="bx:bxs-folder"
                width={girdView ? "13rem" : "7rem"}
                color="rgb(94 138 189)"
              />
              <h1>{props.Node.name}</h1>
            </div>
          </div>
        </>
      );
    } else if (props.Node.type === "file") {
      // showing file component if node is file
      if (props.Node.extention === "mp3" || props.Node.extention === "wav") {
        // if file is mp3 or wav then we will show or play audio
        const playAudio = () => {
          // const audioObj = props.Node.file;
          const audioURL = props.Node.fileUrl;
          dispatch(currentAudioAction(new Audio(audioURL)));
          navigate(
            `/mplayer/${props.Node.name.replace(".mp3" || ".wav", "")}`,
            {
              // navigating to mplayer page to play music
              state: {
                from: "local",
                metaData: {
                  title: props.Node.name.replace(".mp3" || ".wav", ""),
                  singerName: "NaN",
                },
              },
            }
          );
        };
        return (
          <>
            <div className="FilePage_Folder_Container" onClick={playAudio}>
              <div className="FilePage_Folder_Inner_Box">
                <Icon
                  icon="bi:music-player-fill"
                  width={girdView ? "13rem" : "7rem"}
                  color="#bc3847e3"
                />
                <h1>{props.Node.name.replace(".mp3" || ".wav", "")}</h1>
              </div>
            </div>
          </>
        );
      } else {
        const playVideo = () => {
          const videoURL = props.Node.fileUrl;
          dispatch(currentVideoAction(videoURL));
          navigate(
            `/vplayer/${props.Node.name.replace(
              ".mp4" || ".mov" || ".mkv",
              ""
            )}`,
            {
              // navigating to vplayer page to play video
              state: {
                from: "local",
                metaData: {
                  title: props.Node.name.replace(
                    ".mp4" || ".mov" || ".mkv",
                    ""
                  ),
                  singerName: "NaN",
                },
              },
            }
          );
        };
        return (
          <>
            <div className="FilePage_Folder_Container" onClick={playVideo}>
              <div className="FilePage_Folder_Inner_Box">
                <Icon
                  icon="akar-icons:video"
                  width={girdView ? "13rem" : "7rem"}
                  color="#6461cc"
                />
                <h1>
                  {props.Node.name.replace(".mp4" || ".mov" || ".mkv", "")}
                </h1>
              </div>
            </div>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    setCurrentDisplayedFileandFolder(treeFolder);
  }, [treeFolder]);
  return (
    <>
      <div className="FilePage_NavigationBar_Container">
        <div className="FilePage_NavigationBar">
          <div className="FilePage_BackButton_Container" onClick={() => {}}>
            <Icon
              icon="eva:arrow-ios-back-outline"
              width="5rem"
              color="#858585"
            />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          {girdView ? (
            <Icon
              icon="mdi:view-grid"
              width="5rem"
              color="#858585"
              cursor="pointer"
              onClick={() => {
                setGirdView(!girdView);
                document.getElementById(
                  "FilePage_Swap_Folder_and_File_View"
                ).className = "FilePage_List_of_Folder_and_File";
              }}
            />
          ) : (
            <Icon
              icon="mdi:view-list"
              width="5rem"
              color="#858585"
              cursor="pointer"
              onClick={() => {
                setGirdView(!girdView);
                document.getElementById(
                  "FilePage_Swap_Folder_and_File_View"
                ).className = "FilePage_Grid_of_Folder_and_File";
              }}
            />
          )}
          <div className="FilePage_Search_Input_Field">
            <Icon
              icon="bx:bx-search-alt"
              width="3.7rem"
              color="rgb(110, 110, 110)"
            />
            <input type="text" placeholder="Search.." />
          </div>
          <img
            className="FilePage_User_Icon"
            src={userProfileDetail.picture}
            alt="icon"
          />
        </div>
      </div>
      <div className="FilePage_Container">
        <div
          className="FilePage_Grid_of_Folder_and_File"
          id="FilePage_Swap_Folder_and_File_View"
        >
          {currentDisplayedFileandFolder.map((node, index) => {
            return <Folder Node={node} key={index} />;
          })}
        </div>
        <input
          id="image-input"
          style={{ visibility: "hidden", position: "absolute" }}
          className="File_Page_Add_Button"
          type="file"
          placeholder="File"
          webkitdirectory="true"
          mozfullpath="true"
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
