import { Link } from "react-router-dom";

export default function PostCardItem({ postList }: IPostCardItemProps) {
  return (
    <div className="post-list-card-wrapper">
      {postList?.map(
        ({
          _id,
          title,
          contents,
          author,
          likes,
          views,
          isCompleted,
          area,
          memberCount,
          tags,
        }) => (
          <Link key={_id} className="post-list__card" to={`/posts/${_id}`}>
            <div>{title}</div>
            <div>{contents}</div>
            <div>{author}</div>
            <div>{likes}</div>
            <div>{views}</div>
            <div>{isCompleted}</div>
            <div>{area}</div>
            <div>{memberCount}</div>
            <div>{tags}</div>
          </Link>
        )
      )}
    </div>
  );
}
