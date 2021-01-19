# Convention – Versioning

Upon releasing new versions of applications, we want to know what features are released, which features are served on which instance. There are a few things we do to address those issues:

- version each application package;
- increase our commits readability;
- create a changelog to include changes since the last release.

We use [semantic release](https://semantic-release.gitbook.io/semantic-release/) to automatically generate changelogs based on commits' names. It automatically pushes the updated `CHANGELOG.md` to the repository on each release. The example content is:

```
# 1.0.0 (2020-01-01)

### Bug Fixes
* **MAS-1234:** merge request/commit title ([commit ID](link to commit))
* **MAS-1235:** merge request/commit title ([commit ID](link to commit))
* **MAS-1236:** merge request/commit title ([commit ID](link to commit))

### Features
* **MAS-1237:** merge request/commit title ([commit ID](link to commit))
```

We use semantic release to automatically calculate new application versions with respect to [semver](https://semver.org/). It calculates the new version, creates tags as well as a GitHub release on each push to the target branch.
