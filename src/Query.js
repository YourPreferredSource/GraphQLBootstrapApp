const githubQuery = (pageCount, queryString) => {
    return {
        query: `
    {
        viewer {
          location
          bio
        }
        search(query: "${queryString}user:YourPreferredSource sort:updated-desc", type: REPOSITORY, last: ${pageCount}) {
            repositoryCount
            nodes {
                ... on Repository {
                    name
                    description
                    id
                    url
                    viewerSubscription
                }
            }
        }
    }
`,}
        
};

export default githubQuery;