import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import yaml from "js-yaml";

const SITE = "https://pixelcutter.io";
const CONTENT_DIR = join(import.meta.dirname, "../src/content");
const PROJECTS_DIR = join(CONTENT_DIR, "projects");
const OUTPUT = join(import.meta.dirname, "../public/llms.txt");

function parseFrontmatter(raw) {
	const match = raw.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return { frontmatter: {}, body: "" };

	const frontmatter = yaml.load(match[1]);
	const body = raw.slice(match[0].length).trim();
	return { frontmatter, body };
}

function stripMarkdownImages(text) {
	return text.replace(/!\[.*?\]\(.*?\)\n?/g, "").trim();
}

async function readContent(file) {
	const raw = await readFile(join(CONTENT_DIR, file), "utf-8");
	return parseFrontmatter(raw);
}

async function readProjects() {
	const files = await readdir(PROJECTS_DIR);
	const projects = [];

	for (const file of files.filter((f) => f.endsWith(".md"))) {
		const raw = await readFile(join(PROJECTS_DIR, file), "utf-8");
		const { frontmatter } = parseFrontmatter(raw);
		projects.push({
			slug: frontmatter.slug || file.replace(".md", ""),
			title: frontmatter.title || "",
			excerpt: frontmatter.excerpt || "",
		});
	}

	return projects.sort((a, b) => a.title.localeCompare(b.title));
}

async function main() {
	const home = await readContent("home.md");
	const about = await readContent("about.md");
	const projects = await readProjects();

	const lines = [
		"# Pixelcutter",
		"",
		`> ${home.frontmatter.text}`,
		"",
		"## About",
		"",
		stripMarkdownImages(about.body),
		"",
		"## Pages",
		"",
		`- [Home](${SITE}/)`,
		`- [About](${SITE}/about/)`,
		`- [Projects](${SITE}/projects/)`,
		`- [Contacts](${SITE}/contacts/)`,
		"",
		"## Projects",
		"",
		...projects.map(
			(p) => `- [${p.title}](${SITE}/projects/${p.slug}/): ${p.excerpt}`,
		),
		"",
	];

	await writeFile(OUTPUT, lines.join("\n"), "utf-8");
	console.log(`llms.txt generated → ${OUTPUT}`);
}

main();