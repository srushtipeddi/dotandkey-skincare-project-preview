import React from "react";
import "./UserProfile.css";

function UserProfile() {
  const user = JSON.parse(localStorage.getItem("userData") || "{}");

  return (
    <div className="profile-page">
      <div className="profile-box">
        <div className="profile-avatar">
          {(user.username || user.email || "U").charAt(0).toUpperCase()}
        </div>

        <h1>My Profile</h1>

        <div className="profile-info">
          <p><b>Name:</b> {user.username || user.name || "User"}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Status:</b> {user.status || "USER"}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;