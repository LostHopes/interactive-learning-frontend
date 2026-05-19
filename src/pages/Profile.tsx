import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { updateCurrentUser } from "@/api/userService";
import { getMyEnrollments } from "@/api/courseService";
import type { Course } from "@/api/userService";

function Profile() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAboutMe(user.about_me ?? "");
      getMyEnrollments()
        .then((res) => setEnrolledCourses(res.data))
        .catch(() => {});
    }
  }, [user, authLoading, navigate]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await updateCurrentUser({ firstName, lastName, about_me: aboutMe || null });
      setMessage("Profile updated successfully");
    } catch {
      setMessage("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <p className="text-[var(--color-text-muted)]">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-4xl font-semibold text-[var(--color-text)] mb-10 text-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Profile
        </h1>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-2xl p-8 shadow-sm mb-8">
          <h2
            className="text-xl font-semibold text-[var(--color-text)] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Account Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <span className="text-[var(--color-text-muted)]">Email</span>
              <p className="text-[var(--color-text)] font-medium">{user.email}</p>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)]">Username</span>
              <p className="text-[var(--color-text)] font-medium">{user.username}</p>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)]">Role</span>
              <p className="text-[var(--color-text)] font-medium">
                {user.roles?.map((r) => r.title).join(", ") || "STUDENT"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="text-sm font-medium text-[var(--color-text)]">
                  First Name
                </label>
                <input
                  type="text" id="firstName" value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-200 disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="text-sm font-medium text-[var(--color-text)]">
                  Last Name
                </label>
                <input
                  type="text" id="lastName" value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-200 disabled:opacity-50"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="aboutMe" className="text-sm font-medium text-[var(--color-text)]">
                About Me
              </label>
              <textarea
                id="aboutMe" value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                rows={4} disabled={saving}
                className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-200 disabled:opacity-50 resize-none"
              />
            </div>
            {message && (
              <p className={`text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
            <button
              type="submit" disabled={saving}
              className="self-start px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:bg-[var(--color-accent-hover)] text-white text-sm font-medium rounded-xl transition-all duration-200"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-2xl p-8 shadow-sm">
          <h2
            className="text-xl font-semibold text-[var(--color-text)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            My Enrolled Courses
          </h2>
          {enrolledCourses.length === 0 ? (
            <p className="text-[var(--color-text-muted)] text-sm">
              You are not enrolled in any courses yet.{" "}
              <Link to="/courses" className="text-[var(--color-accent)] hover:underline">
                Browse courses
              </Link>
            </p>
          ) : (
            <div className="space-y-3">
              {enrolledCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="block px-4 py-3 bg-[var(--color-bg)] rounded-xl hover:bg-[var(--color-bg-alt)] transition-colors"
                >
                  <p className="text-[var(--color-text)] font-medium">{course.title}</p>
                  {course.category && (
                    <span className="text-xs text-[var(--color-text-muted)]">{course.category}</span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
