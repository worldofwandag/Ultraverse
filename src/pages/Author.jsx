import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const [posts, setPosts] = useState([]);
  const { authorId } = useParams();
  const [loading, setLoading] = useState(true);

  async function fetchAuthorInfo() {
    try {
      console.log("Fetching data for authorId:", authorId);
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );

      console.log("Fetched author data:", response);

      setPosts(Object.values(response));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  }

  useEffect(() => {
    fetchAuthorInfo();
  }, [authorId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <>
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            data-bgimage="url(images/author_banner.jpg) top"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                {loading ? (
                  <h1>temp loading</h1>
                ) : (
                  posts.map((post) => (
                    <div className="col-md-12" key={post.id}>
                      <div className="d_profile de-flex">
                        <div className="de-flex-col">
                          <div className="profile_avatar">
                            <img src={post.authorImage} alt="" />

                            <i className="fa fa-check"></i>
                            <div className="profile_name">
                              <h4>
                                {post.authorName}
                                <span className="profile_username">
                                  {post.tag}
                                </span>
                                <span id="wallet" className="profile_wallet">
                                  UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7
                                </span>
                                <button id="btn_copy" title="Copy Text">
                                  Copy
                                </button>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="profile_follow de-flex">
                          <div className="de-flex-col">
                            <div className="profile_follower">
                              {post.followers} followers
                            </div>
                            <Link to="#" className="btn-main">
                              Follow
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      </div>
    </div>
  );
};

export default Author;
