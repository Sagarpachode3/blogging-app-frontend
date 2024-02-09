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
    .get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .then((response) => response.data);
};
