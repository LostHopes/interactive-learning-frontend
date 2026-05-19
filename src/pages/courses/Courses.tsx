import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { getCourses } from "@/api/courseService";
import CourseCard from "@/components/course/CourseCard";
import type { Course } from "@/api/userService";

function Courses() {
  const { user, isLoading: authLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const canCreate = user?.roles?.some((r) =>
    ["PROFESSOR", "MODERATOR", "ADMIN"].includes(r.title)
  );

  useEffect(() => {
    getCourses()
      .then((res) => setCourses(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <p className="text-[var(--color-text-muted)]">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1
              className="text-4xl font-semibold text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Courses
            </h1>
            <p className="text-[var(--color-text-muted)] mt-1">
              {courses.length} course{courses.length !== 1 ? "s" : ""} available
            </p>
          </div>
          {canCreate && (
            <Link
              to="/courses/new"
              className="px-5 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-medium rounded-lg transition-all duration-200"
            >
              Create Course
            </Link>
          )}
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--color-text-muted)]">No courses yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
