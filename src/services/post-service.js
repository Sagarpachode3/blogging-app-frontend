import { privateAxios } from "./helper";

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
