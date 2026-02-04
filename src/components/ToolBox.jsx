
const iconMap = {
  // Core
  "C#": "devicon-csharp-plain",
  ".NET": "devicon-dotnetcore-plain",
  "ASP.NET": "devicon-dotnetcore-plain",

  // Cloud / DevOps
  "Azure": "devicon-azure-plain",
  "Azure DevOps": "devicon-azuredevops-plain",
  "Docker": "devicon-docker-plain",
  "Git": "devicon-git-plain",
  "Jira": "devicon-jira-plain",

  // UI
  "HTML5": "devicon-html5-plain",
  "CSS3": "devicon-css3-plain",
  "JavaScript": "devicon-javascript-plain",
  "jQuery": "devicon-jquery-plain",
  "Bootstrap": "devicon-bootstrap-plain",
  "React": "devicon-react-original",
  "TypeScript": "devicon-typescript-plain",
  "Node.js": "devicon-nodejs-plain",
  "AngularJs" : "devicon-angularjs-plain",
  "Storybook" : "devicon-storybook-plain",

  // Data
  "Microsoft SQL Server": "devicon-microsoftsqlserver-plain",
  "MySQL": "devicon-mysql-plain",

  // Tooling
  "Visual Studio": "devicon-visualstudio-plain",
  "Visual Studio Code": "devicon-vscode-plain",
  "Postman": "devicon-postman-plain",
  "Claude CLI": "bi bi-claude",
  "Eclipse": "devicon-eclipse-plain",

  // Other langs
  "Java": "devicon-java-plain",
  "PHP": "devicon-php-plain",
  "Python": "devicon-python-plain",

  // Testing
  "Selenium" : "devicon-selenium-original",
  "Playwright" : "devicon-playwright-plain"
};

const normalizeItem = (s = "") => s.trim();

// 2) Component now receives the new list as a parameter: `groups`
export default function ToolBox({ groups = [] }) {
  return (
    <>
      {groups.map((group) => {
        const items = (group.items || []).map(normalizeItem);

        const iconItems = items
          .filter((name) => !!iconMap[name])
          .map((name) => ({ name, iconClass: iconMap[name] }));

        const chips = items.filter((name) => !iconMap[name]);

        return (
          <div className="col-12 col-md-6" key={group.area}>
            <div className="p-4 border rounded-4 h-100">
              <h5 className="mb-3">{group.area}</h5>

              {iconItems.length > 0 && (
                <div className="d-flex flex-wrap gap-3 mb-3">
                  {iconItems.map((item) => (
                    <div
                      key={item.name}
                      className="d-flex align-items-center gap-2"
                    >
                      <i className={`${item.iconClass} fs-3 colored`} aria-hidden />
                      <div>{item.name}</div>
                    </div>
                  ))}
                </div>
              )}

              {chips.length > 0 && (
                <div className="d-flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <span key={chip} className="badge text-bg-secondary">
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
