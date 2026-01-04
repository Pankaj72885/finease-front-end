import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/Contexts/AuthContext";
import {
  Camera,
  CheckCircle,
  Link as LinkIcon,
  Mail,
  Save,
  Settings,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

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
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const hasChanged =
        formData.displayName !== (user.displayName || "") ||
        formData.photoURL !== (user.photoURL || "");
      setHasChanges(hasChanged);
    }
  }, [formData, user]);

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
      <div className="pt-24 pb-12">
        <div className="container-tight">
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-24 pb-12">
        <div className="container-tight text-center py-20">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <User size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Authentication Required
          </h3>
          <p className="text-muted-foreground mb-6">
            Please log in to view your profile
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <div className="container-tight">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            <Settings size={14} />
            <span>Account Settings</span>
          </div>
          <h1 className="text-3xl font-bold font-outfit">My Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card-base p-6 text-center sticky top-24">
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-28 h-28 rounded-2xl object-cover border-4 border-primary/20"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-2xl bg-gradient-primary flex items-center justify-center">
                    <User size={48} className="text-white" />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                  <Camera size={18} className="text-white" />
                </div>
              </div>

              {/* Name & Email */}
              <h2 className="text-xl font-semibold mb-1">
                {user.displayName || "User"}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">{user.email}</p>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm">
                <CheckCircle size={14} />
                <span>Verified Account</span>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-1">
                  Member since
                </p>
                <p className="font-medium">
                  {new Date(
                    user.metadata?.creationTime || Date.now()
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <div className="lg:col-span-2">
            <div className="card-base p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-6">Update Information</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Display Name */}
                <div>
                  <label
                    htmlFor="displayName"
                    className="block text-sm font-medium mb-2"
                  >
                    Display Name
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="displayName"
                      name="displayName"
                      type="text"
                      value={formData.displayName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="pl-11 h-12 rounded-xl"
                    />
                  </div>
                </div>

                {/* Photo URL */}
                <div>
                  <label
                    htmlFor="photoURL"
                    className="block text-sm font-medium mb-2"
                  >
                    Profile Photo URL
                  </label>
                  <div className="relative">
                    <LinkIcon
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="photoURL"
                      name="photoURL"
                      type="url"
                      value={formData.photoURL}
                      onChange={handleChange}
                      placeholder="https://example.com/photo.jpg"
                      className="pl-11 h-12 rounded-xl"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Provide a direct link to your profile image
                  </p>
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      readOnly
                      className="pl-11 h-12 rounded-xl bg-muted cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Email cannot be changed. Contact support if you need
                    assistance.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isUpdatingProfile || !hasChanges}
                    className="rounded-xl bg-gradient-primary hover:opacity-90 px-6"
                  >
                    {isUpdatingProfile ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Updating...
                      </span>
                    ) : (
                      <>
                        <Save size={18} />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
