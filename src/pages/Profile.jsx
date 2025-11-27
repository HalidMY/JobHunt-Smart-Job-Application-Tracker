import Sidebar from "../components/dashboard/Sidebar";
import "../style/global.css";
import { useState, useEffect } from "react";

export default function Profile() {
    const [avatar, setAvatar] = useState(null);
    const [profileData, setProfileData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if ( !file ) return;
        setAvatar(URL.createObjectURL(file));
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch("http://localhost:5000/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json();
                setProfileData({
                    username: data.username,
                    email: data.email,
                    password: ""
                });
            } catch (err) {
                console.error(err);
            }
        }
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSave = async () => {
        try {
            await fetch("http://localhost:5000/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(profileData)
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="profile-page">
            <Sidebar />
            <div className="profile-body">
                <div className="profile-avatar-wrapper">
                    <div className="profile-avatar">
                        {avatar ? (
                            <img src={avatar} alt="Avatar" className="profile-avatar-image" />
                        ) : (
                            <div className="profile-avatar-placeholder">No Avatar</div>
                        )}
                    </div>
                    <label className="avatar-upload-btn">
                        Change Photo
                        <input type="file" accept="image" onChange={handleAvatarChange} hidden />
                    </label>
                </div>
                <h2>Profile Information</h2>
                <div className="profile-info-wrapper">
                    <div className="profile-info-labels">
                        <label>Username:</label>
                        <input type="text" value={profileData.username} onChange={handleInputChange} />
                    </div>

                    <div className="profile-info-labels">
                        <label>Email:</label>
                        <input type="email" value={profileData.email} onChange={handleInputChange} />
                    </div>

                    <div className="profile-info-labels">
                        <label>Password:</label>
                    <input type="password" value={profileData.password} onChange={handleInputChange} />
                    </div>

                    <button type="button" className="profile-save-btn" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </div>
    );
}