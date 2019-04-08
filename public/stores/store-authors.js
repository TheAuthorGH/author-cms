export default {
  namespaced: true,
  actions: {
    async init(context, data) {},
    async getAuthorIndex(context, data) {
      const res = await axios.get('/api/authors');
      return res.data;
    },
    async getAuthor(context, data) {
      const res = await axios.get(`/api/authors/${data.id}`);
      return res.data;
    }
  }
};