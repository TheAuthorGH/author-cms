export default {
  namespaced: true,
  actions: {
    async init(context, data) {},
    async getStoryIndex(context, data) {
      const res = await axios.get('/api/stories');
      return res.data;
    }
  }
};