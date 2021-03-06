import axios from 'axios';

const BASE_URL = 'https://nfc-news.herokuapp.com/api';

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
};

export const postTopic = async (slug, description) => {
  const { data } = await axios.post(`${BASE_URL}/topics`, {
    slug,
    description,
  });
  return data.topic;
};

export const getArticles = async (page, topic, sort_by) => {
  let URL = topic
    ? `${BASE_URL}/topics/${topic}/articles`
    : `${BASE_URL}/articles`;
  if (page) {
    sort_by === undefined
      ? (URL = `${URL}?p=${page}`)
      : (URL = `${URL}?p=${page}&sort_by=${sort_by}`);
  } else {
    URL = sort_by !== undefined ? `${URL}?sort_by=${sort_by}` : `${URL}`;
  }

  const { data } = await axios.get(`${URL}`);
  return data.articles;
};

export const getArticle = async article_id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${article_id}`);
  return data.articles;
};

export const postArticle = async (topic, newArticle) => {
  const { data } = await axios.post(
    `${BASE_URL}/topics/${topic}/articles`,
    newArticle,
  );
  return data.article;
};

export const getComments = async (article_id, page) => {
  let URL = !page
    ? `${BASE_URL}/articles/${article_id}/comments`
    : `${BASE_URL}/articles/${article_id}/comments?p=${page}`;
  const { data } = await axios.get(URL);
  return data.comments;
};

export const postComment = async (article_id, newComment) => {
  const { data } = await axios.post(
    `${BASE_URL}/articles/${article_id}/comments`,
    newComment,
  );
  return data.comment;
};

export const getAllUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`);
  return data.users;
};

export const getUser = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data.users;
};

export const vote = async (article_id, inc_votes, comment_id) => {
  const URL = comment_id
    ? `${BASE_URL}/articles/${article_id}/comments/${comment_id}`
    : `${BASE_URL}/articles/${article_id}`;
  const { data } = await axios.patch(URL, {
    inc_votes,
  });
  return comment_id ? data.comment : data.article;
};

export const deleteComment = async (article_id, comment_id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/articles/${article_id}/comments/${comment_id}`,
  );
  return data;
};

export const deleteArticle = async article_id => {
  const { data } = await axios.delete(`${BASE_URL}/articles/${article_id}/`);
  return data;
};
