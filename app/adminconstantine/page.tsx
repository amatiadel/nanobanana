'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PromptItem } from '@/lib/types';

interface FormState {
  title: string;
  prompt: string;
  tags: string;
  projectTitle: string;
  creatorHandle: string;
}

const initialState: FormState = {
  title: '',
  prompt: '',
  tags: '',
  projectTitle: '',
  creatorHandle: '',
};

export default function AdminConstantinePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>(initialState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewIsObjectUrl, setPreviewIsObjectUrl] = useState(false);
  const [galleryPrompts, setGalleryPrompts] = useState<PromptItem[]>([]);
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(true);
  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);

  const clearPreview = useCallback(() => {
    if (previewUrl && previewIsObjectUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setPreviewIsObjectUrl(false);
  }, [previewUrl, previewIsObjectUrl]);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setImageFile(null);
    clearPreview();
    setEditingPromptId(null);
  }, [clearPreview]);

  const loadPrompts = useCallback(async () => {
    setIsLoadingPrompts(true);
    try {
      const response = await fetch('/api/admin/prompts');
      if (!response.ok) {
        throw new Error('Failed to load prompts');
      }
      const data = await response.json();
      const prompts: PromptItem[] = data.prompts || [];
      setGalleryPrompts(prompts);
      setSelectedIds((prev) =>
        prev.filter((id) => prompts.some((prompt) => prompt.id === id))
      );
    } catch (error: any) {
      setStatusType('error');
      setStatusMessage(error.message || 'Failed to load prompts.');
    } finally {
      setIsLoadingPrompts(false);
    }
  }, []);

  useEffect(() => {
    loadPrompts();
  }, [loadPrompts]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageFile(file || null);

    if (previewUrl && previewIsObjectUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setPreviewIsObjectUrl(true);
    } else {
      setPreviewUrl(null);
      setPreviewIsObjectUrl(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingPromptId && !imageFile) {
      setStatusType('error');
      setStatusMessage('Please upload an image for the card.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);
    setStatusType(null);

    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('projectTitle', formData.projectTitle);
      payload.append('prompt', formData.prompt);
      payload.append('tags', formData.tags);
      payload.append('creatorHandle', formData.creatorHandle);

      if (imageFile) {
        payload.append('image', imageFile);
      }

      const endpoint = editingPromptId
        ? `/api/admin/prompts/${editingPromptId}`
        : '/api/admin/prompts';
      const method = editingPromptId ? 'PATCH' : 'POST';

      const response = await fetch(endpoint, {
        method,
        body: payload,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to save prompt');
      }

      setStatusType('success');
      setStatusMessage(
        editingPromptId
          ? 'Prompt has been updated.'
          : 'Prompt has been added to the gallery.'
      );
      await loadPrompts();
      resetForm();
      router.refresh();
    } catch (error: any) {
      setStatusType('error');
      setStatusMessage(error.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (prompt: PromptItem) => {
    setEditingPromptId(prompt.id);
    setFormData({
      title: prompt.title,
      projectTitle: prompt.description || '',
      prompt: prompt.prompt,
      tags: prompt.tags.join(', '),
      creatorHandle: prompt.creator.handle,
    });
    setImageFile(null);
    if (previewUrl && previewIsObjectUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(prompt.coverUrl);
    setPreviewIsObjectUrl(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this prompt?');
    if (!confirmed) return;

    setStatusMessage(null);
    setStatusType(null);

    try {
      const response = await fetch(`/api/admin/prompts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to delete prompt');
      }

      setStatusType('success');
      setStatusMessage('Prompt deleted.');
      if (editingPromptId === id) {
        resetForm();
      }
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
      await loadPrompts();
      router.refresh();
    } catch (error: any) {
      setStatusType('error');
      setStatusMessage(error.message || 'Failed to delete prompt.');
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (galleryPrompts.length === 0) return;
    if (selectedIds.length === galleryPrompts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(galleryPrompts.map((prompt) => prompt.id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;

    const confirmed = window.confirm(
      `Delete ${selectedIds.length} selected prompt${selectedIds.length > 1 ? 's' : ''}?`
    );
    if (!confirmed) return;

    setStatusMessage(null);
    setStatusType(null);
    try {
      await Promise.all(
        selectedIds.map(async (id) => {
          const response = await fetch(`/api/admin/prompts/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || 'Failed to delete prompt');
          }
        })
      );
      if (selectedIds.includes(editingPromptId || '')) {
        resetForm();
      }
      setStatusType('success');
      setStatusMessage('Selected prompts deleted.');
      setSelectedIds([]);
      await loadPrompts();
      router.refresh();
    } catch (error: any) {
      setStatusType('error');
      setStatusMessage(error.message || 'Failed to delete selected prompts.');
    }
  };

  const allSelected =
    galleryPrompts.length > 0 && selectedIds.length === galleryPrompts.length;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto w-full max-w-5xl space-y-10">
        <div className="rounded-2xl bg-white p-8 shadow-card">
          <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
          <p className="mt-2 text-sm text-slate-500">
            Create, edit, or delete cards below. Uploaded images are automatically resized and
            optimized.
          </p>

          {editingPromptId && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Editing existing prompt. Submit to save changes or{' '}
              <button
                type="button"
                onClick={handleCancelEdit}
                className="font-semibold text-amber-900 underline"
              >
                cancel editing
              </button>
              .
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">Card Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  placeholder="e.g. Neon Skyline"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Project Title</label>
                <input
                  type="text"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  placeholder="Project / Collection label"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">Creator Credit</label>
                <input
                  type="text"
                  name="creatorHandle"
                  value={formData.creatorHandle}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  placeholder="e.g. @artbyconst"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  placeholder="cinematic, futuristic, neon"
                />
                <p className="mt-1 text-xs text-slate-400">Separate tags with commas.</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2 w-full rounded-xl border border-dashed border-slate-300 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
              />
              <p className="mt-1 text-xs text-slate-400">
                Images are automatically resized and optimized when you submit the form.
              </p>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-3 h-48 w-full rounded-xl object-cover"
                />
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Prompt</label>
              <textarea
                name="prompt"
                value={formData.prompt}
                onChange={handleChange}
                rows={4}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                placeholder="Full prompt text used to generate the image"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Saving...'
                : editingPromptId
                ? 'Update Prompt'
                : 'Add Prompt to Gallery'}
            </button>
          </form>

          {statusMessage && (
            <div
              className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
                statusType === 'success'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {statusMessage}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Prompt Gallery</h2>
              <p className="text-sm text-slate-500">
                Manage every prompt that appears in the public gallery.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={toggleSelectAll}
                disabled={galleryPrompts.length === 0}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {allSelected ? 'Clear Selection' : 'Select All'}
              </button>
              <button
                type="button"
                onClick={handleDeleteSelected}
                disabled={selectedIds.length === 0}
                className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Delete Selected
              </button>
              <button
                type="button"
                onClick={loadPrompts}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Refresh List
              </button>
            </div>
          </div>

          <div className="mt-6">
            {isLoadingPrompts ? (
              <div className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
                Loading prompts...
              </div>
            ) : galleryPrompts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
                No prompts found. Add one using the form above.
              </div>
            ) : (
              <div className="space-y-4">
                {galleryPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(prompt.id)}
                        onChange={() => toggleSelection(prompt.id)}
                        className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                        aria-label={`Select ${prompt.title}`}
                      />
                      <img
                        src={prompt.coverUrl}
                        alt={prompt.title}
                        className="h-20 w-20 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{prompt.title}</p>
                        <p className="text-xs text-slate-500">
                          by {prompt.creator.handle.replace(/^@/, '')} ·{' '}
                          {new Date(prompt.createdAt).toLocaleDateString()}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                          Tags: {prompt.tags.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(prompt)}
                        className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(prompt.id)}
                        className="rounded-xl border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
