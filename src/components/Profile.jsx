import { useEffect, useState } from "react";
import Button from "../components/UI/Button";
import useFetch from "../hooks/useFetch";
import numberFormatter from "../utils/numberFormatter";

export default function Profile() {
  const [user,setUser]=useState();
  const {data}=useFetch("https://jsonplaceholder.typicode.com/users/1");
  useEffect(()=>{
    if (data!==null||undefined&&!user){
      setUser(data);
    }
  },[data,user])
  return (
    <div>
      <div className="profile">
        <div className="image-wrapper">
          <img src={user?.img ||`src/assets/image.png`} />
        </div>
        <div className="profile-details">
          <div className="profile-name">
            <p>{user?.name||"unknown"}</p>
            <svg
              aria-label="Verified"
              fill="rgb(0, 149, 246)"
              height="18"
              role="img"
              viewBox="0 0 40 40"
              width="18"
            >
              <title>Verified</title>
              <path
                d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="profile-actions">
            <Button cssClass="bg-grey">Follow</Button>
            <Button cssClass="bg-grey">Message</Button>
          </div>
          <div className="followers">
            <a className="data-wrapper">
              <div>{numberFormatter(user?.posts || 123456)}</div>
              <div>posts</div>
            </a>
            <a className="data-wrapper">
              <div>{numberFormatter(user?.followers || 12345678)}</div>
              <div>followers</div>
            </a>
            <a className="data-wrapper">
              <div>{numberFormatter(user?.following || 0)}</div>
              <div>following</div>
            </a>
          </div>
          <div className="bio">{user?.bio || `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus
        voluptates enim porro labore obcaecati quasi voluptatem atque fugit
        recusandae perspiciatis. Eveniet autem tenetur in maxime.`}</div>
        </div>
      </div>
      <div className="bio-res">
      {user?.bio || `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus
        voluptates enim porro labore obcaecati quasi voluptatem atque fugit
        recusandae perspiciatis. Eveniet autem tenetur in maxime.`}
      </div>
      <div className="followers-res">
        <a className="data-wrapper">
          <div>{numberFormatter(user?.posts || 123456)}</div> <p>posts</p>
        </a>
        <a className="data-wrapper">
          <div>{numberFormatter(user?.followers || 12345678)}</div> <p>followers</p>
        </a>
        <a className="data-wrapper">
          <div>{numberFormatter(user?.following || 0)}</div> <p>following</p>
        </a>
      </div>
    </div>
  );
}
