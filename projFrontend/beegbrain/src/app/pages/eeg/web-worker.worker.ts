/// <reference lib="webworker" />

function removeCache(indexesToRemove : number[],normalizedLabelsSignal : Map<String,Map<Number,Number>>) {

    for (const [label, valuesMap] of normalizedLabelsSignal.entries()) {

      for (let idx of indexesToRemove) {
        valuesMap.delete(idx);
      }
    }
    
    return normalizedLabelsSignal;

}

addEventListener('message', ({data}) => {
  const response = { resp: removeCache(data.indexesToRemove, data.normalizedLabelsSignal)};
  postMessage(response);
});
