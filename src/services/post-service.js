import { myAxios } from "./helper";
export const doCreatePost = (postData) => {
  return myAxios.post("", postData).then((response) => response.data);
};
// @PostMapping("/user/{userId}/category/{categoryId}/posts")
