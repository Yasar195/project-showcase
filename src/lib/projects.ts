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
                            { label: "Install via Homebrew", command: "brew install task-cli" },
                            { label: "Verify the installation", command: "tasks --version" },
                        ],
                    },
                    windows: {
                        steps: [
                            {
                                label: "Download the latest release via winget",
                                command: "winget install Yasar195.task-cli",
                            },
                            {
                                label: "Verify the installation",
                                command: "tasks --version",
                            },
                        ],
                    },
                    linux: {
                        steps: [
                            {
                                label: "Download the binary",
                                command:
                                    "curl -L https://github.com/Yasar195/rust_cli_todo/releases/latest/download/tasks-linux -o tasks",
                            },
                            { label: "Make it executable", command: "chmod +x tasks" },
                            { label: "Move to your PATH", command: "sudo mv tasks /usr/local/bin/" },
                            { label: "Verify the installation", command: "tasks --version" },
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
