"use client";

import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { updateUserRole, deleteUser } from "@/lib/api/users/action"; // adjust path to match your project

const ManageUsersTable = ({ initialUsers, admin }) => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.trim().toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)
    );
  }, [users, search]);

  // ---------------- TOGGLE ROLE (promote/demote) ----------------
  const handleRoleToggle = async (targetUser) => {
    if (targetUser._id === admin.id) {
      toast.error("You cannot change your own role");
      return;
    }

    const nextRole = targetUser.role === "admin" ? "user" : "admin";

    try {
      setUpdatingId(targetUser._id);
      const res = await updateUserRole(targetUser._id, nextRole, admin.id);

      if (!res.success) {
        throw new Error(res.message || "Failed to update role");
      }

      setUsers((prev) =>
        prev.map((u) =>
          u._id === targetUser._id ? { ...u, role: nextRole } : u
        )
      );
      toast.success(`${targetUser.name} is now ${nextRole}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // ---------------- DELETE ACCOUNT ----------------
  const handleDelete = async () => {
    if (!deleteTarget) return;

    if (deleteTarget._id === admin.id) {
      toast.error("You cannot delete your own account");
      setDeleteTarget(null);
      return;
    }

    try {
      setDeleting(true);
      const res = await deleteUser(deleteTarget._id, admin.id);

      if (!res.success) {
        throw new Error(res.message || "Failed to delete user");
      }

      setUsers((prev) => prev.filter((u) => u._id !== deleteTarget._id));
      toast.success("User account deleted");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const RoleBadge = ({ targetUser }) => {
    const isSelf = targetUser._id === admin.id;
    return (
      <button
        onClick={() => handleRoleToggle(targetUser)}
        disabled={updatingId === targetUser._id || isSelf}
        title={isSelf ? "You cannot change your own role" : ""}
        className={`px-3 py-1 rounded-full text-xs font-medium ${targetUser.role === "admin"
            ? "bg-purple-100 text-purple-700"
            : "bg-blue-100 text-blue-700"
          } ${isSelf ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {targetUser.role}
      </button>
    );
  };

  return (
    <>
      {/* SEARCH */}
      <div className="mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="border p-2 rounded w-full sm:w-80 text-sm"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="border rounded-2xl p-10 text-center text-gray-500">
          No users match your search.
        </div>
      ) : (
        <>
          {/* ---------------- DESKTOP / LARGE SCREEN: TABLE VIEW ---------------- */}
          <div className="hidden lg:block overflow-x-auto border rounded-2xl">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Lessons Created</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="border-t">
                    <td className="p-4 font-medium flex items-center gap-2">
                      <img
                        src={u.image || "/default-avatar.png"}
                        alt={u.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="truncate max-w-[160px]">
                        {u.name}
                        {u._id === admin.id && (
                          <span className="text-gray-400"> (you)</span>
                        )}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 max-w-[220px] truncate">
                      {u.email}
                    </td>
                    <td className="p-4">
                      <RoleBadge targetUser={u} />
                    </td>
                    <td className="p-4">{u.totalLessonsCreated}</td>
                    <td className="p-4">
                      <button
                        onClick={() => setDeleteTarget(u)}
                        disabled={u._id === admin.id}
                        title={
                          u._id === admin.id
                            ? "You cannot delete your own account"
                            : ""
                        }
                        className={`px-3 py-1 rounded-lg bg-red-500 text-white text-xs ${u._id === admin.id
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                          }`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---------------- MOBILE / TABLET: CARD VIEW ---------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {filteredUsers.map((u) => (
              <div
                key={u._id}
                className="border rounded-2xl p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={u.image || "/default-avatar.png"}
                    alt={u.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold truncate">
                      {u.name}
                      {u._id === admin.id && (
                        <span className="text-gray-400 text-xs"> (you)</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {u.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <RoleBadge targetUser={u} />
                  <span className="text-xs text-gray-500">
                    {u.totalLessonsCreated} lessons
                  </span>
                </div>

                <button
                  onClick={() => setDeleteTarget(u)}
                  disabled={u._id === admin.id}
                  className={`px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs ${u._id === admin.id ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  Delete Account
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Delete User</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to permanently delete{" "}
              <span className="font-medium">
                &quot;{deleteTarget.name}&quot;
              </span>
              ? This will not delete their existing lessons.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageUsersTable;