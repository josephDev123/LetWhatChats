export function convertToUrlFriendly(groupName: string) {
  return groupName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// console.log(urlFriendlyGroupName); // Output: my-group-name
