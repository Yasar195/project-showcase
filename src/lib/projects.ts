export type InstallStep = {
    command: string;
    label?: string;
};

export type PlatformInstructions = {
    steps: InstallStep[];
};

export type Screenshot = {
    src: string;
    caption: string;
};

export type Project = {
    slug: string;
    title: string;
    type: string;
    language: string;
    description: string;
    longDescription: string;
    tags: string[];
    github: string;
    screenshots?: Screenshot[];
    install: {
        mac: PlatformInstructions;
        windows: PlatformInstructions;
        linux: PlatformInstructions;
    };
};

export type Category = {
    id: string;
    name: string;
    description: string;
    projects: Project[];
};

export const categories: Category[] = [
    {
        id: "genai-rag",
        name: "Generative AI and RAG",
        description: "Cutting-edge AI applications focused on Retrieval-Augmented Generation and Model Context Protocol.",
        projects: [
            {
                slug: "mcply",
                title: "mcply",
                type: "CLI Tool",
                language: "Rust",
                description:
                    "Create Model Context Protocol (MCP) servers in real-time. A powerful Rust-based binary for instant tool orchestration.",
                longDescription:
                    "mcply is a high-performance Rust utility that simplifies the creation and management of MCP servers. Just like our task manager, it's a standalone binary that allows you to define tools, connect to various AI providers, and expose them as MCP-compatible interfaces in seconds. Built for speed and flexibility, it bridges the gap between local resources and LLMs through standardized protocol implementation.",
                tags: ["Rust", "MCP", "Generative AI", "RAG", "CLI"],
                github: "https://github.com/Yasar195/mcply",
                screenshots: [
                    { src: "/screenshots/mcply-main.png", caption: "Main Menu" },
                    { src: "/screenshots/mcply-models.png", caption: "Model Management" },
                    { src: "/screenshots/mcply-servers.png", caption: "MCP Server Management" },
                ],
                install: {
                    mac: {
                        steps: [
                            {
                                label: "Run installer script (macOS)",
                                command: "curl -fsSL https://raw.githubusercontent.com/Yasar195/mcply/release/install.sh | sh",
                            },
                            { label: "Verify the installation", command: "mcply" },
                        ],
                    },
                    windows: {
                        steps: [
                            {
                                label: "Run installer script (Windows PowerShell)",
                                command: "irm https://raw.githubusercontent.com/Yasar195/mcply/release/install.ps1 | iex",
                            },
                            { label: "Verify the installation", command: "mcply" },
                        ],
                    },
                    linux: {
                        steps: [
                            {
                                label: "Run installer script (Linux)",
                                command: "curl -fsSL https://raw.githubusercontent.com/Yasar195/mcply/release/install.sh | sh",
                            },
                            { label: "Verify the installation", command: "mcply" },
                        ],
                    },
                },
            },
        ],
    },
    {
        id: "developer-utility",
        name: "Developer Utilities",
        description: "Command-line tools and utilities built for developer productivity.",
        projects: [
            {
                slug: "task-management-cli",
                title: "Task Management CLI",
                type: "CLI Tool",
                language: "Rust",
                description:
                    "A fast, memory-safe command-line application for task orchestration. Features persistent SQLite storage and instant state toggling between 'completed' and 'pending'.",
                longDescription:
                    "Task Management CLI is a blazing-fast terminal tool built in Rust. It uses SQLite for reliable on-disk persistence and exposes a clean command interface for creating, listing, toggling, and deleting tasks. Because it compiles to a single statically-linked binary there are no runtime dependencies — just download and run.",
                tags: ["Rust", "SQLite", "CLI", "Native Binary"],
                github: "https://github.com/Yasar195/rust_cli_todo",
                screenshots: [
                    { src: "/screenshots/task-cli-menu.png", caption: "Main Menu" },
                    { src: "/screenshots/task-cli-tasks.png", caption: "Task List & Details" },
                    { src: "/screenshots/task-cli-settings.png", caption: "Settings" },
                ],
                install: {
                    mac: {
                        steps: [
                            {
                                label: "Run installer script (macOS)",
                                command: "curl -fsSL https://raw.githubusercontent.com/Yasar195/rust_cli_todo/release/install.sh | sh",
                            },
                            { label: "Verify the installation", command: "todo" },
                        ],
                    },
                    windows: {
                        steps: [
                            {
                                label: "Run installer script (Windows PowerShell)",
                                command: "irm https://raw.githubusercontent.com/Yasar195/rust_cli_todo/release/install.ps1 | iex",
                            },
                            { label: "Verify the installation", command: "todo" },
                        ],
                    },
                    linux: {
                        steps: [
                            {
                                label: "Run installer script (Linux)",
                                command: "curl -fsSL https://raw.githubusercontent.com/Yasar195/rust_cli_todo/release/install.sh | sh",
                            },
                            { label: "Verify the installation", command: "todo" },
                        ],
                    },
                },
            },
        ],
    },
];

// Flat list of all projects across all categories (for detail page lookup)
export const projects: Project[] = categories.flatMap((c) => c.projects);

export function getProject(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}
