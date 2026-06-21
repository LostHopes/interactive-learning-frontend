import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import {
  getCourse,
  deleteCourse,
  enroll,
  unenroll,
  getEnrollmentStatus,
  createBadge,
  linkBadgeToCourse,
} from "@/api/courseService";
import type { Course } from "@/api/userService";

function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolled, setEnrolled] = useState(false);
  const [badgeName, setBadgeName] = useState("");
  const [badgeImage, setBadgeImage] = useState<File | null>(null);
  const [badgeUrl, setBadgeUrl] = useState("");
  const [badgeLoading, setBadgeLoading] = useState(false);

  const courseId = Number(id);

  const isAuthor =
    course?.authors?.some((a) => a.id === user?.id) ?? false;
  const isModOrAdmin = user?.roles?.some((r) =>
    ["MODERATOR", "ADMIN"].includes(r.title)
  );
  const canManage = isAuthor || isModOrAdmin;
  const canCreateBadge = user?.roles?.some((r) =>
    ["PROFESSOR", "MODERATOR", "ADMIN"].includes(r.title)
  );

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      getCourse(courseId),
      getEnrollmentStatus(courseId).catch(() => ({ data: false })),
    ])
      .then(([courseRes, enrollRes]) => {
        setCourse(courseRes.data);
        setEnrolled(enrollRes.data);
      })
      .catch(() => setError("Course not found"))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleEnroll() {
    try {
      await enroll(courseId);
      setEnrolled(true);
    } catch {
      setError("Failed to enroll");
    }
  }

  async function handleUnenroll() {
    try {
      await unenroll(courseId);
      setEnrolled(false);
    } catch {
      setError("Failed to unenroll");
    }
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteCourse(courseId);
      navigate("/courses");
    } catch {
      setError("Failed to delete course");
    }
  }

  async function handleCreateBadge(e: React.FormEvent) {
    e.preventDefault();
    if (!badgeName.trim()) return;
    setBadgeLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", badgeName.trim());
      if (badgeImage) formData.append("image", badgeImage);
      else if (badgeUrl.trim()) formData.append("imageUrl", badgeUrl.trim());

      const badgeRes = await createBadge(formData);
      await linkBadgeToCourse(courseId, badgeRes.data.id);

      const courseRes = await getCourse(courseId);
      setCourse(courseRes.data);

      setBadgeName("");
      setBadgeImage(null);
      setBadgeUrl("");
    } catch {
      setError("Failed to create badge");
    } finally {
      setBadgeLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <p className="text-text-muted">Loading course...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <p className="text-text-muted">{error || "Course not found"}</p>
      </div>
    );
  }

  const authorNames = course.authors
    ?.map((a) => [a.firstName, a.lastName].filter(Boolean).join(" ") || a.username)
    .join(", ");

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/courses"
          className="text-sm text-text-muted hover:text-accent transition-colors mb-6 inline-block"
        >
          &larr; Back to courses
        </Link>

        <div className="bg-surface border border-border-light rounded-2xl p-8 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1
                className="text-3xl font-semibold text-text mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {course.title}
              </h1>
              {course.category && (
                <span className="inline-block px-3 py-1 bg-bg-alt text-text-muted text-xs font-medium rounded-full">
                  {course.category}
                </span>
              )}
            </div>
            {canManage && (
              <div className="flex gap-2">
                <Link
                  to={`/courses/${course.id}/edit`}
                  className="px-4 py-2 border border-border hover:bg-bg-alt text-text text-sm font-medium rounded-lg transition-all duration-200"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 text-sm font-medium rounded-lg transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <p className="text-text-muted leading-relaxed mb-6">
            {course.description || "No description"}
          </p>

          <div className="flex items-center gap-4 text-sm text-text-muted mb-6">
            <span>By {authorNames || "Unknown"}</span>
          </div>

          {!canManage && (
            <button
              onClick={enrolled ? handleUnenroll : handleEnroll}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                enrolled
                  ? "border border-border hover:bg-bg-alt text-text"
                  : "bg-accent hover:bg-accent-hover text-white"
              }`}
            >
              {enrolled ? "Unenroll" : "Enroll"}
            </button>
          )}

          {course.badges && course.badges.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border-light">
              <h2
                className="text-lg font-semibold text-text mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Badges
              </h2>
              <div className="flex flex-wrap gap-3">
                {course.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-2 px-4 py-2 bg-bg-alt rounded-xl"
                  >
                    {badge.imageUrl && (
                      <img
                        src={badge.imageUrl}
                        alt={badge.name}
                        className="w-6 h-6 object-contain rounded"
                      />
                    )}
                    <span className="text-sm text-text">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {canCreateBadge && (
            <div className="mt-8 pt-6 border-t border-border-light">
              <h2
                className="text-lg font-semibold text-text mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Add Badge
              </h2>
              <form onSubmit={handleCreateBadge} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Badge name"
                  value={badgeName}
                  onChange={(e) => setBadgeName(e.target.value)}
                  required
                  disabled={badgeLoading}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 disabled:opacity-50"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBadgeImage(e.target.files?.[0] ?? null)}
                  disabled={badgeLoading}
                  className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent file:text-white hover:file:bg-accent-hover"
                />
                <input
                  type="url"
                  placeholder="Or enter image URL"
                  value={badgeUrl}
                  onChange={(e) => setBadgeUrl(e.target.value)}
                  disabled={badgeLoading}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={badgeLoading || !badgeName.trim()}
                  className="self-start px-5 py-2.5 bg-accent hover:bg-accent-hover disabled:bg-accent-hover text-white text-sm font-medium rounded-lg transition-all duration-200"
                >
                  {badgeLoading ? "Creating..." : "Create Badge"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
