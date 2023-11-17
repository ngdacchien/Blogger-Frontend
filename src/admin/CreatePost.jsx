import React, { useState, useRef } from "react";
import api from "../service/api";
import { IoIosAddCircleOutline, IoIosCloseCircle } from "react-icons/io";
import "../css/createpost.css";
import AdminLayout from "./AdminLayout";

export const CreatePost = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const selectedPreviews = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    );
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setPreviews((prevPreviews) => [...prevPreviews, ...selectedPreviews]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteFile = (index) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });

    setPreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      for (const file of files) {
        formData.append("files", file);
      }

      await api.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFiles([]);
      setPreviews([]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <AdminLayout></AdminLayout>
      <section className="newPost">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h2>Blogger Post</h2>
            <div className="inputfile">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
                className="titleInput"
              />

              <textarea
                placeholder="Description"
                name=""
                id=""
                cols="30"
                rows="10"
                value={description}
                onChange={handleDescriptionChange}
                className="descriptionInput"
              ></textarea>

              <div className="boxItems">
                {previews.map((preview, index) => (
                  <div key={index} className="previewItem">
                    {files[index].type.startsWith("image/") ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="previewImage"
                      />
                    ) : files[index].type.startsWith("video/") ? (
                      <video src={preview} controls className="previewVideo" />
                    ) : null}
                    <div
                      className="deleteIcon"
                      onClick={() => handleDeleteFile(index)}
                    >
                      <IoIosCloseCircle />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flexCenter">
                <button
                  type="button"
                  className="uploadButton"
                  onClick={handleUploadClick}
                >
                  <IoIosAddCircleOutline className="uploadIcon" />
                  Upload File
                </button>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*, video/*"
                  alt="img"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  multiple
                />
              </div>

              <button type="submit" className="button">
                Create Post
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreatePost;