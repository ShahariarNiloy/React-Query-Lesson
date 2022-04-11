import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchUser = (emailId: any) => {
  return axios.get(`http://localhost:4001/users/${emailId}`);
};
const fetchPost = (postId: any) => {
  return axios.get(`http://localhost:4001/post/${postId}`);
};

function DependentQueries() {
  const emailId = "niloy@example.com";
  const user = useQuery(["user", emailId], () => fetchUser(emailId));

  const postId = user?.data?.data?.postId;
  const post = useQuery(["post", postId], () => fetchPost(postId), {
    enabled: !!postId,
  });

  console.log(post);

  return (
    <>
      <h2>Dependent Query</h2>
      <div>
        {post?.data?.data?.team?.map((oneTeam: any) => {
          return <h3>{oneTeam}</h3>;
        })}
      </div>
    </>
  );
}

export default DependentQueries;
