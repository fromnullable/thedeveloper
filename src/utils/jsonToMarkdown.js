function fmtDateRange(dates) {
  if (!dates) return "";
  const start = dates.start ?? "";
  const end = dates.end ?? "";
  if (!start && !end) return "";
  if (start && end) return `${start} – ${end}`;
  return start || end;
}

function mdList(items = []) {
  if (!items?.length) return "—";
  return items.map((x) => `- ${x}`).join("\n");
}

function mdSkillsGroups(groups = []) {
  if (!groups?.length) return "—";
  return groups
    .map((g) => {
      const area = g.area ?? "Skills";
      const items = (g.items ?? []).join(", ");
      return `- **${area}:** ${items || "—"}`;
    })
    .join("\n");
}

export function jsonToMarkdown(resume) {
  const name = resume?.basics?.name ?? "-";
  const location = resume?.basics?.location ?? "-"
  const email = resume?.basics?.email ?? "-";
  const website = resume?.basics.website ?? "-";
  const summary = resume?.summary ?? "-";

  const strengths = (resume?.strengths ?? [])
    .map((s) => {
      const icon = s.icon ? `${s.icon} ` : "";
      const title = s.summary ?? "—";
      const desc = s.description ?? "";
      return `- ${icon}**${title}** — ${desc}`.trim();
    })
    .join("\n");

  const experience = (resume?.experience ?? [])
    .map((job) => {
      const title = job?.title ?? "—";
      const company = job?.company ?? "—";
      const location = job?.location ?? "—";
      const range = fmtDateRange(job?.dates);
      const jobSummary = job?.summary ?? "—";

      const highlights = mdList(job?.highlights ?? []);
      const skills = mdSkillsGroups(job?.skills ?? []);

      return `### ${title}
**${company}** — ${location}${range ? `  \n*${range}*` : ""}

${jobSummary}

**Highlights**
${highlights}

**Skills**
${skills}
`;
    })
    .join("\n");

  const education = (resume?.education ?? [])
    .map((e) => {
      const degree = e.degree ?? "—";
      const school = e.school ?? "—";
      const year = e.year ?? "";
      return `- **${degree}**, ${school}${year ? ` (${year})` : ""}`;
    })
    .join("\n");

  const technicalSkills = mdSkillsGroups(resume?.technicalSkills ?? []);

  return `# ${name}

- **Localtion:** ${location}
- **Email:** <${email}>
- **Web Site:** <https://${website}>


## Summary
${summary}

## Strengths
${strengths || "—"}

## Experience
${experience || "—"}

## Education
${education || "—"}

## Technical Skills
${technicalSkills || "—"}
`;
}
