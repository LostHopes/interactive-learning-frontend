import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getCourse, updateCourse } from "@/api/courseService";
import CourseForm from "@/components/course/CourseForm";
import { useAuth } from "@/hooks/useAuth";
import type { Course } from "@/api/userService";

function EditCourse() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getCourse(Number(id))
      .then((res) => setCourse(res.data))
      .catch(() => setError("Course not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const isAuthorized =
    course &&
    user &&
    (user.roles?.some((r) => ["MODERATOR", "ADMIN"].includes(r.title)) ||
      course.authors?.some((a) => a.id === user.id));

  async function handleSubmit(data: Parameters<typeof updateCourse>[1]) {
    if (!id) return;
    setSaving(true);
    try {
      await updateCourse(Number(id), data);
      navigate(`/courses/${id}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <p className="text-[var(--color-text-muted)]">Loading...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <p className="text-[var(--color-text-muted)]">{error || "Course not found"}</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <p className="text-[var(--color-text-muted)]">
          You don't have permission to edit this course.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-lg mx-auto">
        <h1
          className="text-3xl font-semibold text-[var(--color-text)] mb-8 text-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Edit Course
        </h1>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-2xl p-8 shadow-sm hover:cursor-pointer">
          <CourseForm
            initial={{
              title: course.title,
              category: course.category || "",
              description: course.description || "",
              avatarUrl: course.avatarUrl || "",
            }}
            onSubmit={handleSubmit}
            submitLabel="Save Changes"
            loading={saving}
          />
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
