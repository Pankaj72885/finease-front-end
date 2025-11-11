import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Camera, Mail, User } from "lucide-react";
import { useAuth } from "@/Contexts/AuthContext";

const Profile = () => {
  const {
    currentUser: user,
    updateProfile,
    isUpdatingProfile,
    loading,
  } = useAuth();
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.displayName) {
      return;
    }

    updateProfile({
      displayName: formData.displayName,
      photoURL: formData.photoURL,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-xl font-medium">
          Please log in to view your profile.
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <div className="bg-card border rounded-lg p-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <User
                    size={40}
                    className="text-primary-600 dark:text-primary-400"
                  />
                </div>
              )}
              <div className="absolute bottom-0 right-0 bg-primary-600 rounded-full p-1">
                <Camera size={16} className="text-white" />
              </div>
            </div>
            <p className="font-medium">{user.displayName}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          {/* Update Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium mb-2"
              >
                Name
              </label>
              <Input
                id="displayName"
                name="displayName"
                type="text"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium mb-2"
              >
                Profile Photo URL
              </label>
              <Input
                id="photoURL"
                name="photoURL"
                type="url"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-muted-foreground" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  readOnly
                  className="pl-10 bg-muted"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Email cannot be changed here. Contact support if you need to
                update it.
              </p>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isUpdatingProfile}>
                {isUpdatingProfile ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
