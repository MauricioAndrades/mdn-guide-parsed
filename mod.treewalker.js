var n = {
    nodeList: [],
    walker: function() {
            var treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, {
                acceptNode: function (node) {
                    return NodeFilter.FILTER_ACCEPT;
                }
            }, false);
            while (treeWalker.nextNode()) this.nodeList.push(treeWalker.currentNode);
        },
    filter: function() {
        var stash = [];
        var node = document.getElementById('content');
        var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_TEXT,{ acceptNode: function(node) {if ( ! /^\s*$/.test(node.data) && node.isVisible) {return NodeFilter.FILTER_ACCEPT;}} },false);

        while ((node = nodeIterator.nextNode())) {
          stash.push(node.data);
        }
        console.log(stash);
    },
    qsa: function(selector) {
        return document.querySelectorAll(selector)[0];
    }
}


