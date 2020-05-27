import * as mermaid from 'mermaid';

const findAndConvertToDiagrams = (searchText, searchNode) => {
  /** This function was derived from https://j11y.io/javascript/find-and-replace-text-with-javascript/ */
  if (!searchText) {
    return;
  }
  var regex = typeof searchText === 'string' ?
  new RegExp(searchText, 'g') : searchText,
  childNodes = (searchNode || document.body).childNodes,
  cnLength = childNodes.length,
  excludes = 'html,head,style,title,link,meta,script,object,iframe';
  while (cnLength--) {
    var currentNode = childNodes[cnLength];
    if (currentNode.nodeType === 1 &&
      (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
      findAndConvertToDiagrams(searchText, currentNode);
    }
    if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
      continue;
    }
    var parent = currentNode.parentNode;
    // Referred from https://github.com/mermaid-js/mermaid/issues/311
    mermaid.init(undefined, parent);
  }
};

findAndConvertToDiagrams(/^(graph (TB|TD|LR))|(sequenceDiagram)|(classDiagram)|(stateDiagram-v2)|(erDiagram)|(journey)|(gantt)|(pie title)/, document.body);
