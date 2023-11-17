import React, { useState, useEffect } from "react";
import "../css/account.css";
// import "../"

const Account = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const defaultProfileImage =
    "https://i.pinimg.com/originals/96/86/12/968612b62715b539c876a2ff719962fe.png";

  useEffect(() => {
    // Gọi API để lấy thông tin tài khoản
    fetch("/api/account")
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
        setEmail(data.email);
        setPhone(data.phone);
        setProfileImage(data.profileImage);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin tài khoản:", error);
      });
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          phone,
        }),
      });

      if (response.ok) {
        console.log("Thông tin tài khoản đã được cập nhật.");
      } else {
        console.error("Có lỗi xảy ra khi cập nhật thông tin tài khoản.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="accountInfo">
      <div className="container boxItems">
        <h1>Account Information</h1>
        <div className="content">
          <div className="left">
            <div className="img flexCenter">
              <label htmlFor="profileImageUpload">
                <input
                  id="profileImageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {profileImage ? (
                  <img src={profileImage} alt="Profile" />
                ) : (
                  <img src={defaultProfileImage} alt="Default Profile" />
                )}
              </label>
              
            </div>
          </div>
          <div className="right">
            <h3>Username : {username}</h3>
            <label htmlFor="">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="">Phone</label>
            <input
              type="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="button" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;