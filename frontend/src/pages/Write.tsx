import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/api";
import { createPost, updatePost } from "../api";
import Button from "../components/Button";
import { Input } from "../components/Input";
import MarkdownEditor from "../components/MarkdownEditor";
import Select from "../components/Select";
import formatClassName from "../utils/formatClassName";
import toast from "../utils/toast";
import "./Write.css";
import { useAuthStore } from "../store";

const MAX_TAGS_LENGTH = 5;

function TechStacksInput({
  tags,
  setTags,
}: {
  tags: Array<string>;
  setTags: React.Dispatch<React.SetStateAction<Array<string>>>;
}) {
  const [tag, setTag] = useState<string>("");
  const [filteredStacks, setFilteredStacks] = useState<Array<string>>();
  // How to handle this darn large array?
  const stacks = [
    "android",
    "angular",
    "apache",
    "apple",
    "atom",
    "azuredevops",
    "behance",
    "bitcoin",
    "blender",
    "blogger",
    "bootstrap",
    "brave",
    "c",
    "cassandra",
    "cloudflare",
    "coffeescript",
    "composer",
    "cpp",
    "csharp",
    "css3",
    "csswizardry",
    "d3-dot-js",
    "dart",
    "deno",
    "dependabot",
    "discord",
    "discourse",
    "django",
    "docker",
    "dot-net",
    "dribbble",
    "electron",
    "express-dot-js",
    "figma",
    "firebase",
    "flask",
    "flutter",
    "freebsd",
    "gatsby",
    "gerrit",
    "ghost",
    "git",
    "github",
    "gitlab",
    "gitpod",
    "gnome",
    "gnu",
    "go",
    "godotengine",
    "googleanalytics",
    "googlechrome",
    "googlecloud",
    "graphql",
    "haskell",
    "heroku",
    "html5",
    "intellijidea",
    "internetexplorer",
    "ios",
    "java",
    "javascript",
    "jekyll",
    "jenkins",
    "jest",
    "jetbrains",
    "joomla",
    "jquery",
    "jsdelivr",
    "jsfiddle",
    "kotlin",
    "kubernetes",
    "letsencrypt",
    "linux",
    "microsoftazure",
    "microsoftedge",
    "mongodb",
    "mozillafirefox",
    "mysql",
    "neo4j",
    "netlify",
    "next-dot-js",
    "nginx",
    "node-dot-js",
    "nodemon",
    "notion",
    "npm",
    "nuget",
    "nuxt-dot-js",
    "octopusdeploy",
    "openssl",
    "php",
    "plex",
    "postgresql",
    "powershell",
    "prettier",
    "proto-dot-io",
    "pypi",
    "python",
    "pytorch",
    "pyup",
    "qualcomm",
    "r",
    "rails",
    "raspberrypi",
    "react",
    "reactrouter",
    "redhat",
    "redis",
    "redux",
    "repl-dot-it",
    "rollup-dot-js",
    "rss",
    "ruby",
    "rust",
    "safari",
    "sass",
    "signal",
    "skype",
    "slack",
    "spring",
    "stackoverflow",
    "strapi",
    "styled-components",
    "stylus",
    "svelte",
    "svg",
    "tensorflow",
    "travisci",
    "typescript",
    "ubuntu",
    "unity",
    "unrealengine",
    "v8",
    "vim",
    "visualstudio",
    "visualstudiocode",
    "vue-dot-js",
    "w3c",
    "webauthn",
    "webpack",
    "webstorm",
    "whitesource",
    "windows",
    "wordpress",
    "xamarin",
    "yarn",
    "zapier",
  ];

  const resetTag = () => {
    setTag("");
  };
  const resetFilteredTags = () => {
    setFilteredStacks([]);
  };

  const addTag = (tagToAdd: string) => {
    if (tags.length >= MAX_TAGS_LENGTH) {
      toast(`${MAX_TAGS_LENGTH}개 이상은 입력하실 수 없습니다!`);
      return;
    }

    if (tags.includes(tagToAdd)) {
      toast("이미 추가한 태그입니다!");
      return;
    }

    setTags([...tags, tagToAdd]);
    resetTag();
    resetFilteredTags();
  };

  return (
    <div className="editor__item editor__item--container">
      <ul className="selected-tags">
        {tags.map((selectedTag) => (
          <li key={selectedTag} className="selected-tags__tag">
            <i className={`icon-${selectedTag}`} />
            {selectedTag}
            <button
              type="button"
              onClick={() => setTags(tags.filter((x) => x !== selectedTag))}
              aria-label="제거"
            >
              <i className="icon-highlight_remove" />
            </button>
          </li>
        ))}
      </ul>
      <form
        className="tag-form"
        onSubmit={(event) => {
          event.preventDefault();

          if (!filteredStacks) {
            return;
          }

          if (filteredStacks.length === 1) {
            const [submittedTag] = filteredStacks;

            addTag(submittedTag);
          }
        }}
      >
        <Input
          id="tags"
          name="tags"
          label="기술 스택 추가"
          autoComplete="off"
          value={tag}
          onChange={(event) => {
            const { value } = event.target;

            setTag(value);

            if (value.length > 0) {
              setFilteredStacks(
                stacks
                  .filter((x) => !tags.includes(x))
                  .filter((x) => x.includes(value))
              );
            } else {
              resetFilteredTags();
            }
          }}
        />
        <ul className="suggested-tags">
          {filteredStacks?.map((x) => (
            <li key={x} className="suggested-tags__tag">
              <button
                type="button"
                onClick={() => {
                  addTag(x);
                }}
              >
                <i className={`icon-${x}`} />
                {x}
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default function Write() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [contents, setContents] = useState<string>("");
  const [currentPostId, setCurrentPostId] = useState("");
  const { subject = "chat", category = "study" } = useParams();
  const location = useLocation();
  const isGather = subject === "gather";
  const isModifying = useMemo(() => !!location.state, []);

  const subjects: Array<TSubject> = [
    "review",
    "gather",
    "article",
    "dev",
    "recruit",
    "chat",
  ];
  const subjectsInKr = [
    "후기 / 회고",
    "팀원 모집",
    "댓글 남겨줘",
    "개발 정보",
    "취업 정보",
    "잡담",
  ];
  const categories: Array<TGatherCategory> = ["study", "code", "team"];
  const categoriesInKr = ["스터디", "모각코", "프로젝트"];

  const requestAddPost = async <T extends IPost | IGatherPost>(
    post: Partial<T>
  ) => {
    if (isGather) {
      const apiResponse = await useApi(
        createPost<IGatherPost>({
          ...post,
          subject: "gather",
          area,
          tags,
          icon: tags[0],
          category: category as TGatherCategory,
        })
      );

      if (!apiResponse) {
        toast("글 작성에 실패했습니다.");
        return;
      }

      navigate(`/gathers/${apiResponse.postId}`);
      return;
    }

    const apiResponse = await useApi(createPost<IPost>(post));

    if (!apiResponse) {
      toast("글 작성에 실패했습니다.");
      return;
    }

    navigate(`/posts/${apiResponse.postId}`);
  };

  const requestUpdatePost = async <T extends IPost | IGatherPost>(
    post: Partial<T>
  ) => {
    if (isGather) {
      const apiResponse = await useApi(
        updatePost<IGatherPost>({
          id: currentPostId,
          post: {
            ...post,
            subject: "gather",
            area,
            tags,
            icon: tags[0],
            category: category as TGatherCategory,
          },
        })
      );

      if (!apiResponse) {
        toast("글 작성에 실패했습니다.");
        return;
      }

      navigate(`/gathers/${apiResponse.postId}`);
      return;
    }

    const apiResponse = await useApi(
      updatePost<IPost>({ id: currentPostId, post })
    );

    if (!apiResponse) {
      toast("글 작성에 실패했습니다.");
      return;
    }

    navigate(`/posts/${apiResponse.postId}`);
  };

  const handleSubmit = async () => {
    const { token } = useAuthStore();

    if (!token) {
      navigate("/login");
      return;
    }

    const post = {
      title,
      contents,
      subject: subject as TSubject,
    } as const;

    if (isGather) {
      const gatherPost = {
        ...post,
        subject: "gather",
        area,
        tags,
        icon: tags[0],
        category: category as TGatherCategory,
      } as const;

      if (isModifying) {
        requestUpdatePost<IGatherPost>(gatherPost);
        return;
      }

      requestAddPost<IGatherPost>(gatherPost);
      return;
    }

    if (isModifying) {
      requestUpdatePost<IPost>(post);
      return;
    }

    requestAddPost<IPost>(post);
  };

  useEffect(() => {
    // Modifying post
    const state = location.state as IPost | IGatherPost;

    if (!isModifying) {
      return;
    }

    setTitle(state.title);
    setContents(state.contents);
    setCurrentPostId(state._id);

    if (!("tags" in state)) {
      return;
    }

    setTags(state.tags);
    setArea(state.area);
  }, []);

  return (
    <div role="form">
      <div
        className={formatClassName(
          "editor__item",
          isGather && "editor__item--gather"
        )}
      >
        <Select
          id="subject"
          readOnly={isModifying}
          list={subjects.map((x, i) => ({
            key: x,
            name: subjectsInKr[i],
            selected: x === subject,
          }))}
          cb={({ key }) =>
            key !== "gather"
              ? navigate(`/write/${key}`)
              : navigate(`/write/${key}/${category}`)
          }
        />
        {isGather && (
          <Select
            id="category"
            list={categories.map((x, i) => ({
              key: x,
              name: categoriesInKr[i],
              selected: x === category,
            }))}
            cb={({ key }) => navigate(`/write/gather/${key}`)}
          />
        )}
      </div>
      <div className="editor__item">
        <Input
          id="title"
          name="title"
          label="제목"
          value={title}
          setValue={setTitle}
        />
      </div>
      {isGather && (
        <>
          <div className="editor__item">
            <Input
              id="area"
              name="area"
              label="지역"
              value={area}
              setValue={setArea}
            />
          </div>
          <TechStacksInput tags={tags} setTags={setTags} />
        </>
      )}
      <div className="editor__item">
        <MarkdownEditor
          id="contents"
          name="contents"
          label="내용"
          value={contents}
          setValue={setContents}
        />
      </div>
      <div className="editor__item">
        <Button value="제출하기" type="submit" onClick={handleSubmit} />
      </div>
    </div>
  );
}
