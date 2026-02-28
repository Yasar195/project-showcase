<script lang="ts">
  import { categories } from '$lib/projects';
</script>

<section class="max-w-4xl mx-auto px-6 py-12">
  <div class="space-y-14">
    {#each categories as category}
      <div>
        <!-- Category header -->
        <div class="flex items-baseline justify-between mb-5 pb-3 border-b border-gray-100">
          <div>
            <h2 class="text-base font-semibold text-gray-900">{category.name}</h2>
            <p class="text-sm text-gray-400 mt-0.5">{category.description}</p>
          </div>
          <span class="text-xs text-gray-400 shrink-0 ml-4">
            {category.projects.length} {category.projects.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        <!-- Projects grid -->
        <div class="grid gap-3 sm:grid-cols-2">
          {#each category.projects as project}
            <a
              href="/projects/{project.slug}"
              class="group flex flex-col p-4 border border-gray-200 rounded-xl hover:border-gray-400 transition-colors"
            >
              <div class="flex items-start justify-between gap-3 mb-2">
                <h3 class="font-medium text-gray-900 group-hover:text-gray-700 transition-colors leading-snug">
                  {project.title}
                </h3>
                <span class="shrink-0 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full mt-0.5">
                  {project.language}
                </span>
              </div>
              <p class="text-sm text-gray-500 leading-relaxed mb-3 flex-1">{project.description}</p>
              <div class="flex flex-wrap gap-1.5">
                {#each project.tags as tag}
                  <span class="text-xs text-gray-400 border border-gray-200 rounded-full px-2 py-0.5">{tag}</span>
                {/each}
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>
