import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";

function Settings() {
  const role = localStorage.getItem("role") || "Admin";
  const [profile, setProfile] = useState({
    name: role,
email: `${role.toLowerCase()}@gmail.com`,
    phone: "9876543210",
    company: "Mini ERP CRM",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    theme: "Light",
    notifications: true,
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [profileImage, setProfileImage] = useState<string | null>(null);
useEffect(() => {
  fetchSettings();
}, []);

const fetchSettings = async () => {
  try {
    const res = await axios.get("http://localhost:5000/settings");

    setProfile({
      ...profile,
      name: res.data.name,
      email: res.data.email,
      phone: res.data.phone,
      company: res.data.company,
    });
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Settings
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col items-center mb-6">

  {profileImage ? (
    <img
      src={profileImage}
      alt="Profile"
      className="w-24 h-24 rounded-full object-cover border"
    />
  ) : (
    <FaUserCircle className="text-7xl text-gray-500" />
  )}

  <label className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
    Upload Photo

    <input
      type="file"
      accept="image/*"
      hidden
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          setProfileImage(URL.createObjectURL(file));
        }
      }}
    />
  </label>

</div>
        <h2 className="text-2xl font-semibold">
          Profile Information
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="email"
          placeholder="Email"
          value={profile.email}
          onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })
          }
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="text"
          placeholder="Phone"
          value={profile.phone}
          onChange={(e) =>
            setProfile({ ...profile, phone: e.target.value })
          }
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="text"
          placeholder="Company"
          value={profile.company}
          onChange={(e) =>
            setProfile({ ...profile, company: e.target.value })
          }
          className="border p-3 rounded-lg w-full"
        />

        <hr />

        <h2 className="text-2xl font-semibold">
          Change Password
        </h2>

        <div className="relative">
  <input
    type={showOldPassword ? "text" : "password"}
    placeholder="Old Password"
    value={profile.oldPassword}
    onChange={(e) =>
      setProfile({ ...profile, oldPassword: e.target.value })
    }
    className="border p-3 rounded-lg w-full"
  />

  <button
    type="button"
    onClick={() => setShowOldPassword(!showOldPassword)}
    className="absolute right-3 top-4"
  >
    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>
        <div className="relative">
  <input
    type={showNewPassword ? "text" : "password"}
    placeholder="New Password"
    value={profile.newPassword}
    onChange={(e) =>
      setProfile({ ...profile, newPassword: e.target.value })
    }
    className="border p-3 rounded-lg w-full"
  />

  <button
    type="button"
    onClick={() => setShowNewPassword(!showNewPassword)}
    className="absolute right-3 top-4"
  >
    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

        <div className="relative">
  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm Password"
    value={profile.confirmPassword}
    onChange={(e) =>
      setProfile({ ...profile, confirmPassword: e.target.value })
    }
    className="border p-3 rounded-lg w-full"
  />

  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-3 top-4"
  >
    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>
        <hr />

        <h2 className="text-2xl font-semibold">
          Preferences
        </h2>

        <select
          value={profile.theme}
          onChange={(e) =>
            setProfile({ ...profile, theme: e.target.value })
          }
          className="border p-3 rounded-lg w-full"
        >
          <option>Light</option>
          <option>Dark</option>
        </select>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={profile.notifications}
            onChange={(e) =>
              setProfile({
                ...profile,
                notifications: e.target.checked,
              })
            }
          />

          Enable Notifications

        </label>

        <button
  onClick={async () => {
    if (profile.newPassword !== profile.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.put("http://localhost:5000/settings", {
  name: profile.name,
  email: profile.email,
  phone: profile.phone,
  company: profile.company,
  newPassword: profile.newPassword,
});

      alert("Settings Saved Successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to save settings");
    }
  }}
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
>
  Save Changes
</button>

      </div>

    </div>
  );
}

export default Settings;