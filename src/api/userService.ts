import api from "@/utils/api";

export interface RegisterData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface Role {
  id: number;
  title: "STUDENT" | "PROFESSOR" | "MODERATOR" | "ADMIN";
}

export interface Badge {
  id: number;
  name: string;
  imageUrl: string | null;
}

export interface Course {
  id: number;
  title: string;
  category: string | null;
  description: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  authors: User[];
  badges: Badge[];
}

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: string;
  lastSeen: string;
  about_me: string | null;
  courses: Course[];
  roles: Role[];
  badges: Badge[];
}

export function registerUser(data: RegisterData) {
  return api.post<{ access_token: string }>("/users", data);
}

export function loginUser(data: LoginData) {
  return api.post<{ access_token: string }>("/token/generate", data);
}

export function logoutUser() {
  return api.post("/token/logout");
}

export function refreshToken() {
  return api.post("/token/refresh");
}

export function getCurrentUser() {
  return api.get<User>("/users/me");
}

export function getUsers() {
  return api.get<User[]>("/users");
}

export function getUserById(id: number) {
  return api.get<User>(`/users/${id}`);
}

export function updateUser(id: number, data: Partial<User>) {
  return api.put<User>(`/users/${id}`, data);
}

export function partialUpdateUser(id: number, data: Partial<User>) {
  return api.patch<User>(`/users/${id}`, data);
}

export function deleteUser(id: number) {
  return api.delete(`/users/${id}`);
}

export function updateCurrentUser(data: Partial<Pick<User, "firstName" | "lastName" | "about_me">>) {
  return api.patch<User>("/users/me", data);
}
