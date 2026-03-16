<script lang="ts">
  import { page } from '$app/stores';
  import { getProject } from '$lib/projects';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  $: project = getProject($page.params.slug as string);

  type Platform = 'mac' | 'windows' | 'linux';
  let activePlatform: Platform = 'mac';

  const platforms: { id: Platform; label: string; icon: string }[] = [
    { id: 'mac', label: 'macOS', icon: '🍎' },
    { id: 'windows', label: 'Windows', icon: '🪟' },
    { id: 'linux', label: 'Linux', icon: '🐧' },
  ];

  let copiedIndex: number | null = null;

  function copyCommand(cmd: string, index: number) {
    navigator.clipboard.writeText(cmd);
    copiedIndex = index;
    setTimeout(() => (copiedIndex = null), 1500);
  }

  let lightboxSrc: string | null = null;
  function openLightbox(src: string) { lightboxSrc = src; }
  function closeLightbox() { lightboxSrc = null; }
</script>

<svelte:head>
  <title>{project ? project.title : 'Project'} — Projects</title>
</svelte:head>

<main class="min-h-screen bg-white">
  <Navbar />

  {#if project}
    <div class="max-w-3xl mx-auto px-6 py-12">

      <!-- Back link -->
      <a href="/" class="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L6.414 9H17a1 1 0 110 2H6.414l3.293 3.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        All Projects
      </a>

      <!-- Header -->
      <div class="mb-10">
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <span class="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{project.type}</span>
          <span class="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{project.language}</span>
        </div>
        <h1 class="text-3xl font-semibold text-gray-900 mb-4">{project.title}</h1>
        <p class="text-gray-600 leading-relaxed">{project.longDescription}</p>
      </div>

      <!-- Screenshots -->
      {#if project.screenshots && project.screenshots.length > 0}
        <div class="mb-10">
          <h2 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Screenshots</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {#each project.screenshots as shot}
              <button
                on:click={() => openLightbox(shot.src)}
                class="group relative overflow-hidden rounded-lg border border-gray-200 hover:border-gray-400 transition-colors aspect-video bg-gray-50"
                title={shot.caption}
              >
                <img src={shot.src} alt={shot.caption} class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end p-2">
                  <span class="text-xs text-white bg-black/50 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">{shot.caption}</span>
                </div>
              </button>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-10">
        {#each project.tags as tag}
          <span class="text-xs text-gray-500 border border-gray-200 rounded-full px-2.5 py-0.5">{tag}</span>
        {/each}
      </div>

      <!-- GitHub link -->
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 mb-12 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
        View on GitHub
      </a>

      <!-- Installation -->
      <div>
        <h2 class="text-xl font-semibold text-gray-900 mb-5">Installation</h2>

        <!-- Platform tabs -->
        <div class="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit mb-6">
          {#each platforms as p}
            <button
              class="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-all {activePlatform === p.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}"
              on:click={() => activePlatform = p.id}
            >
              <span>{p.icon}</span>
              {p.label}
            </button>
          {/each}
        </div>

        <!-- Steps -->
        <div class="space-y-3">
          {#each project.install[activePlatform].steps as step, i}
            <div>
              {#if step.label}
                <p class="text-xs text-gray-400 mb-1 ml-1">{i + 1}. {step.label}</p>
              {/if}
              <div class="group relative flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                <code class="font-mono text-sm text-gray-800 flex-1 break-all">{step.command}</code>
                <button
                  on:click={() => copyCommand(step.command, i)}
                  class="ml-4 shrink-0 text-gray-400 hover:text-gray-700 transition-colors"
                  title="Copy"
                >
                  {#if copiedIndex === i}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"/>
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/>
                    </svg>
                  {/if}
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>

    </div>
  {:else}
    <div class="max-w-3xl mx-auto px-6 py-12 text-center">
      <p class="text-gray-400">Project not found.</p>
      <a href="/" class="mt-4 inline-block text-sm text-gray-600 underline">Go back</a>
    </div>
  {/if}

  <Footer />

  <!-- Lightbox -->
  {#if lightboxSrc}
    <div
      class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      on:click={closeLightbox}
      role="button"
      tabindex="0"
      on:keydown={(e) => e.key === 'Escape' && closeLightbox()}
    >
      <img src={lightboxSrc} alt="Screenshot" class="max-w-full max-h-full rounded-lg shadow-2xl" />
      <button
        class="absolute top-4 right-4 text-white/70 hover:text-white text-2xl leading-none"
        on:click={closeLightbox}
      >✕</button>
    </div>
  {/if}
</main>
