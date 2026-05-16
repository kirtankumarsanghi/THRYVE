import { useState } from "react";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function EmployeeProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    department: "Engineering",
    role: "Senior Software Engineer",
    manager: "Jane Smith",
    joinDate: "2022-01-15",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <Breadcrumb />
      <BackButton to="/employee/dashboard" label="Back to Dashboard" />

      <header className="mb-10 mt-6">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">person</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-secondary">
            User Profile
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            My Profile
          </h2>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="px-6 py-3 bg-primary hover:bg-primary-fixed text-on-primary rounded-lg font-title-md text-body-sm font-semibold transition-all shadow-[0_0_15px_rgba(192,193,255,0.2)] hover:shadow-[0_0_25px_rgba(192,193,255,0.4)] flex items-center justify-center gap-2 w-full md:w-auto"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isEditing ? "save" : "edit"}
            </span>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary to-primary mx-auto mb-4 flex items-center justify-center text-[48px] font-bold text-surface-container-lowest">
              {formData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-1">{formData.name}</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">{formData.role}</p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full text-[10px] font-label-caps uppercase tracking-wider bg-secondary/20 text-secondary border border-secondary/30">
                Employee
              </span>
            </div>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 text-[12px]">
                <span className="material-symbols-outlined text-on-surface-variant text-[16px]">email</span>
                <span className="text-on-surface-variant">{formData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-[12px]">
                <span className="material-symbols-outlined text-on-surface-variant text-[16px]">phone</span>
                <span className="text-on-surface-variant">{formData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-[12px]">
                <span className="material-symbols-outlined text-on-surface-variant text-[16px]">location_on</span>
                <span className="text-on-surface-variant">{formData.location}</span>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 mt-6">
            <h3 className="font-title-md text-body-base text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">bar_chart</span>
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Active Goals</span>
                <span className="font-title-md text-body-base text-on-surface font-bold">10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Completed</span>
                <span className="font-title-md text-body-base text-on-surface font-bold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Achievements</span>
                <span className="font-title-md text-body-base text-on-surface font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Avg Progress</span>
                <span className="font-title-md text-body-base text-on-surface font-bold">85%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 mb-6">
            <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">badge</span>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-2 block">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2.5 text-body-base text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                ) : (
                  <p className="font-body-sm text-body-sm text-on-surface">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-2 block">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2.5 text-body-base text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                ) : (
                  <p className="font-body-sm text-body-sm text-on-surface">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-2 block">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2.5 text-body-base text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                ) : (
                  <p className="font-body-sm text-body-sm text-on-surface">{formData.phone}</p>
                )}
              </div>

              <div>
                <label className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-2 block">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2.5 text-body-base text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                ) : (
                  <p className="font-body-sm text-body-sm text-on-surface">{formData.location}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
            <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">work</span>
              Work Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-2 block">
                  Department
                </label>
                <p className="font-body-sm text-body-sm text-on-surface">{formData.department}</p>
              </div>

              <div>
                <label className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-2 block">
                  Role
                </label>
                <p className="font-body-sm text-body-sm text-on-surface">{formData.role}</p>
              </div>

              <div>
                <label className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-2 block">
                  Manager
                </label>
                <p className="font-body-sm text-body-sm text-on-surface">{formData.manager}</p>
              </div>

              <div>
                <label className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-2 block">
                  Join Date
                </label>
                <p className="font-body-sm text-body-sm text-on-surface">{formData.joinDate}</p>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 rounded-lg font-title-md text-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-all border border-outline-variant/20 hover:border-outline-variant/40"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-primary hover:bg-primary-fixed text-on-primary rounded-lg font-title-md text-body-sm font-semibold transition-all shadow-[0_0_15px_rgba(192,193,255,0.2)] hover:shadow-[0_0_25px_rgba(192,193,255,0.4)] flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
