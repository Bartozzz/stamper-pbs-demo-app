/* eslint-disable no-template-curly-in-string */
module.exports = {
  plugins: [
    {
      path: "semantic-release-expo",
      versions: {
        version: "${recommended}",
        android: "${increment}",
        ios: "${recommended}",
      },
    },
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    {
      path: "@semantic-release/git",
      assets: ["CHANGELOG.md", "package.json", "yarn.lock", "app.json"],
    },
    "@semantic-release/github",
  ],
  publish: false,
  success: false,
  fail: false,
};
