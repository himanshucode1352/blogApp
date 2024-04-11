import rootApi from "../rootApi";


const blogApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    contactUs: builder.mutation({
      query: (data) => ({
        method: 'POST',
        url: '/contact-us',
        body: data,
      }),
      // invalidatesTags: ['CHANNEL'],
    }),
    getBlogs: builder.query({
        query: () => {
          let url = `/blog/all`;
         
          return url;
        },
        transformResponse: (response) => response,
      }),
      getBlogById: builder.query({
        query: (id) => {
          let url = `/blog/detail/${id}`;
         
          return url;
        },
        transformResponse: (response) => response,
      }),
    addBlog: builder.mutation({
      query: (data) => ({
        method: 'POST',
        url: '/blog/create',
        body: data,
      }),
    }),

    updateBlog: builder.mutation({
        query: ({data,id}) => ({
          method: 'PUT',
          url: `/blog/update/${id}`,
          body: data,
        }),
      }),

      
    deleteBlog: builder.mutation({
        query: (id) => ({
          method: 'delete',
          url: `/blog/delete/${id}`,
        //   body: data,
        }),
      }),

  }),
});

export const {
  useContactUsMutation,
   useAddBlogMutation,
   useGetBlogsQuery,
   useUpdateBlogMutation,
   useDeleteBlogMutation,
   useGetBlogByIdQuery

} = blogApi;
