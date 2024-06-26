import { markBranchHit } from "../test/instrumentation/coverageData";

export const shouldMutateParking = (parking) => {
  // TODO: Do not mutate parking unless there are changes to parking
  if (!parking || !parking.length) {
    markBranchHit("shouldMutateParking", 0);
    return false;
  }

  markBranchHit("shouldMutateParking", 1);
  return true;
};

export const shouldMutatePathLinks = (
  pathLinkVariables,
  pathLinks,
  originalPathLinks,
) => {
  if (!pathLinkVariables || !pathLinkVariables.length) {
    return false;
  }

  if (pathLinks && originalPathLinks) {
    // only save path links with at least both to and from reference (avoids broken path links)
    const allPathLinksComplete = pathLinks.every(
      (pathLink) => pathLink.from && pathLink.to,
    );

    if (allPathLinksComplete) {
      return JSON.stringify(pathLinks) !== JSON.stringify(originalPathLinks);
    }
  }
  return false;
};
