export const sortDependencies = (packageJson) => {
  const sorted = {};
  const types = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
  ];

  for (const key of types) {
    if (packageJson[key]) {
      sorted[key] = {};
      Object.keys(packageJson[key])
        .sort()
        .forEach((name) => {
          sorted[key][name] = packageJson[key][name];
        });
    }
  }

  return {
    ...packageJson,
    ...sorted,
  };
};
