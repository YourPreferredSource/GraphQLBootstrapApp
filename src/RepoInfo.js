const RepoInfo = ({repo}) => {
  return (

    <li key={repo.id.toString()}>
      <div>
        <a href={repo.url}>
          {repo.name}
        </a>
      </div>
        <p className={"btn btn-sm d-inline-block " + (repo.viewerSubscription === "SUBSCRIBED" ? "btn-success" : "btn-outline-secondary")}>
          {repo.viewerSubscription}
          </p>

    </li>
  );
};

export default RepoInfo;