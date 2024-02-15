import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../../auth";
import {
  deletePostService,
  loadPostUserWise,
} from "../../services/post-service";
import { toast } from "react-toastify";
import AddPost from "../../components/AddPost";
import Base from "../../components/Base";
import Post from "../../components/Post";
import "../../App.css"

const Userdashboard = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    //console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail());
    loadPostData();
  }, []);

  function loadPostData() {
    loadPostUserWise(getCurrentUserDetail().id)
      .then((data) => {
        //  console.log(data);
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading user posts");
      });
  }
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  //function to delete post
  const handleDelete = () => {
    if (postToDelete) {
      deletePostService(postToDelete.postId)
        .then((res) => {
          toast.success("Post Deleted Successfully");
          setPosts(posts.filter((post) => post.postId !== postToDelete.postId));
          setPostToDelete(null);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in deleting post");
        });
    }
    toggleModal();
  };

  const openDeleteModal = (post) => {
    setPostToDelete(post);
    toggleModal();
  };

  return (
    <Base>
      <Container>
        <AddPost />
        <h1 className="my-3">Posts Count: {posts.length}</h1>
        {posts.map((post, index) => (
          <Post
            post={post}
            deletePost={() => openDeleteModal(post)}
            key={index}
          />
        ))}
        <Modal isOpen={modalOpen} toggle={toggleModal} className="modal-center">
          <ModalHeader toggle={toggleModal}>Confirm Delete</ModalHeader>
          <ModalBody>Are you sure you want to delete this post?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDelete}>
              Yes
            </Button>
            <Button color="secondary" onClick={toggleModal}>
              No
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </Base>
  );
};

export default Userdashboard;
