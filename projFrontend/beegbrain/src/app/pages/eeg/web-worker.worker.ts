/// <reference lib="webworker" />

function removeCache(indexesToRemove : number[], labelsSignal : Map<String,Map<Number,Number>>, normalizedLabelsSignal : Map<String,Map<Number,Number>>) {

    for (const [label, valuesMap] of labelsSignal.entries()) {

      for (let idx of indexesToRemove) {
        valuesMap.delete(idx);
      }
    }

    for (const [label, valuesMap] of normalizedLabelsSignal.entries()) {
      for (let idx of indexesToRemove) {
        valuesMap.delete(idx);
      }
    }

    //console.log("REMOVED ", indexesToRemove)

    return [labelsSignal, normalizedLabelsSignal];

}

addEventListener('message', ({data}) => {
  const response = { resp: removeCache(data.indexesToRemove, data.labelsSignal, data.normalizedLabelsSignal)};
  postMessage(response);
});
