import { Link } from "react-router";
import type { Course } from "@/api/userService";

function CourseCard({ course }: { course: Course }) {
  const authorNames = course.authors
    ?.map((a) => [a.firstName, a.lastName].filter(Boolean).join(" ") || a.username)
    .join(", ");

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group block bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-2xl p-6 hover:border-[var(--color-border)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <h3
        className="text-xl font-semibold text-[var(--color-text)] mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {course.title}
      </h3>
      {course.category && (
        <span className="inline-block px-3 py-1 bg-[var(--color-bg-alt)] text-[var(--color-text-muted)] text-xs font-medium rounded-full mb-3">
          {course.category}
        </span>
      )}
      <p className="text-[var(--color-text-muted)] text-sm leading-relaxed line-clamp-2 mb-4">
        {course.description || "No description"}
      </p>
      <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        <span>{authorNames || "No authors"}</span>
        {course.badges && course.badges.length > 0 && (
          <span>{course.badges.length} badge{course.badges.length !== 1 ? "s" : ""}</span>
        )}
      </div>
    </Link>
  );
}

export default CourseCard;
