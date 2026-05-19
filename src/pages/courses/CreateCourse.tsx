import { useState } from "react";
import { useNavigate } from "react-router";
import { createCourse } from "@/api/courseService";
import CourseForm from "@/components/course/CourseForm";

function CreateCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: Parameters<typeof createCourse>[0]) {
    setLoading(true);
    try {
      const res = await createCourse(data);
      navigate(`/courses/${res.data.id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-lg mx-auto">
        <h1
          className="text-3xl font-semibold text-[var(--color-text)] mb-8 text-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Create Course
        </h1>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-2xl p-8 shadow-sm">
          <CourseForm
            onSubmit={handleSubmit}
            submitLabel="Create Course"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
