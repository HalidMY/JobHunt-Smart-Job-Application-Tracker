import { useState, useEffect } from "react";
import "../style/global.css";

export default function ProfileContent() {
    const [avatar, setAvatar] = useState(null);
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        const load = async () => {
            const res = await fetch("http://localhost:5000/profile", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await res.json();

            setProfile({
                username: data.username,
                email: data.email,
                password: "",
            });
        };

        load();
    }, []);

    const handleSave = async () => {
        await fetch("http://localhost:5000/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(profile),
        });
    };

    return (
        <div className="profile-body">

            <div className="profile-avatar-wrapper">
                <div className="profile-avatar">
                    {avatar ? <img src={avatar} alt="avatar" /> : "No Avatar"}
                </div>

                <label className="avatar-upload-btn">
                    Change Photo
                    <input type="file" hidden onChange={(e) =>
                        setAvatar(URL.createObjectURL(e.target.files[0]))
                    }/>
                </label>
            </div>

            <h2>Profile Information</h2>

            <div className="profile-info-wrapper">
                <input
                    type="text"
                    value={profile.username}
                    onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })
                    }
                />

                <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                    }
                />

                <input
                    type="password"
                    placeholder="New password"
                    value={profile.password}
                    onChange={(e) =>
                        setProfile({ ...profile, password: e.target.value })
                    }
                />

                <button className="profile-save-btn" onClick={handleSave}>
                    Save Changes
                </button>
            </div>
        </div>
    );
}
