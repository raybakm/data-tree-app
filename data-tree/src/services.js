
const dataTreeAPI = {
  getUserTreeData(treeName) {
    return fetchService(
      `https://test.vmarmysh.com/api.user.tree.get?treeName=${treeName}`
    );
  },
  createTreeNode(treeName, parentNodeId, nodeName) {
    return fetchService(
      `https://test.vmarmysh.com/api.user.tree.node.create?treeName=${treeName}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`
    );
  },
  renameTreeNode(treeName, nodeId, newNodeName) {
    return fetchService(
      `https://test.vmarmysh.com/api.user.tree.node.rename?treeName=${treeName}&nodeId=${nodeId}&newNodeName=${newNodeName}`
    );
  },
  deleteTreeNode(treeName, nodeId) {
    return fetchService(
      `https://test.vmarmysh.com/api.user.tree.node.delete?treeName=${treeName}&nodeId=${nodeId}`
    );
  },
};

const fetchService = (URL) => {
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
  });
};

export default dataTreeAPI;
