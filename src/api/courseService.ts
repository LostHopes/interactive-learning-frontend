import api from "@/utils/api";
import type { Course, Badge } from "./userService";

export interface CreateCourseData {
  title: string;
  category?: string;
  description?: string;
  avatarUrl?: string;
}

export interface UpdateCourseData {
  title?: string;
  category?: string;
  description?: string;
  avatarUrl?: string;
}

export function getCourses() {
  return api.get<Course[]>("/courses");
}

export function getCourse(id: number) {
  return api.get<Course>(`/courses/${id}`);
}

export function createCourse(data: CreateCourseData) {
  return api.post<Course>("/courses", data);
}

export function updateCourse(id: number, data: UpdateCourseData) {
  return api.put<Course>(`/courses/${id}`, data);
}

export function deleteCourse(id: number) {
  return api.delete(`/courses/${id}`);
}

export function enroll(courseId: number) {
  return api.post(`/courses/${courseId}/enroll`);
}

export function unenroll(courseId: number) {
  return api.delete(`/courses/${courseId}/unenroll`);
}

export function getEnrollmentStatus(courseId: number) {
  return api.get<boolean>(`/courses/${courseId}/enrollment-status`);
}

export function getMyEnrollments() {
  return api.get<Course[]>("/users/me/enrollments");
}

export function createBadge(formData: FormData) {
  return api.post<Badge>("/badges", formData);
}

export function linkBadgeToCourse(courseId: number, badgeId: number) {
  return api.post(`/courses/${courseId}/badges/${badgeId}`);
}

export function getCourseBadges(courseId: number) {
  return api.get<Badge[]>(`/courses/${courseId}/badges`);
}

export function getAllBadges() {
  return api.get<Badge[]>("/badges");
}
