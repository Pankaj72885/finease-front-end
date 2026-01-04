import { blogAPI, queryKeys } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Fetch all public blogs
export const useBlogs = (filter = {}) => {
  const {
    data: blogs = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.blogs(filter),
    queryFn: () => blogAPI.getAll(filter),
    staleTime: 5 * 60 * 1000,
  });

  return { blogs, isLoading, error, refetch };
};

// Fetch single blog
export const useBlog = (id) => {
  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.blog(id),
    queryFn: () => blogAPI.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
  return { blog, isLoading, error };
};

// Manage user's blogs
export const useMyBlogs = () => {
  const queryClient = useQueryClient();

  // Fetch my blogs
  const {
    data: blogs = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.myBlogs,
    queryFn: blogAPI.getMyBlogs,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: blogAPI.create,
    onSuccess: () => {
      toast.success("Blog created!");
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs() });
      queryClient.invalidateQueries({ queryKey: queryKeys.myBlogs });
    },
    onError: (err) => toast.error(err.message || "Failed to create blog"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => blogAPI.update(id, data),
    onSuccess: (data, variables) => {
      toast.success("Blog updated!");
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs() });
      queryClient.invalidateQueries({ queryKey: queryKeys.myBlogs });
      queryClient.invalidateQueries({ queryKey: queryKeys.blog(variables.id) });
    },
    onError: (err) => toast.error(err.message || "Failed to update blog"),
  });

  const deleteMutation = useMutation({
    mutationFn: blogAPI.delete,
    onSuccess: () => {
      toast.success("Blog deleted!");
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs() });
      queryClient.invalidateQueries({ queryKey: queryKeys.myBlogs });
    },
    onError: (err) => toast.error(err.message || "Failed to delete blog"),
  });

  return {
    blogs,
    isLoading,
    error,
    refetch,
    createBlog: createMutation.mutateAsync,
    updateBlog: updateMutation.mutateAsync,
    deleteBlog: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
