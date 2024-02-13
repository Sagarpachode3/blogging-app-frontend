import { myAxios, privateAxios } from "./helper";

//create  post function
export const doCreatePost = (postData) => {
  //console.log(postData);
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => response.data);
};
// @PostMapping("/user/{userId}/category/{categoryId}/posts")

//get all Posts
export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
    )
    .then((response) => response.data);
};

//load single post of given id

export const loadPosts = (postId) => {
  return myAxios.get("/posts/" + postId).then((response) => response.data);
};

//Create Comment
export const createComment = (comment, postId) => {
  return privateAxios.post(`/post/${postId}/comments`, comment);
};

//upload post banner image

export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);

  return privateAxios
    .post(`/post/image/upload/${postId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response.data);
};
