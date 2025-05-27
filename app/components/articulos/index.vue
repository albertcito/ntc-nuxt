<script setup lang="ts">
const props = defineProps<{
  title: string
  path: string
  imagePath: string
  itemsPerPage: number
}>()

const page = defineModel<number>('page', { required: true })
const collection = 'articulos'
const totalSkip = computed(() => (page.value - 1) * props.itemsPerPage)
const { data } = await useAsyncData(
  computed(() => `${collection}_${page.value}_${props.itemsPerPage}`),
  () => queryCollection(collection)
    .order('date', 'DESC')
    .skip(totalSkip.value)
    .limit(props.itemsPerPage)
    .all()
)
const { data: total } = await useAsyncData('total', () => queryCollection(collection)
  .count())
</script>

<template>
  <UPage>
    <UPageHeader :title="title">
      <template #links>
        <div class="flex justify-between items-center gap-2">
          <div>
            {{ itemsPerPage }} de {{ total }} artículos
          </div>
          <UPagination
            v-if="total"
            v-model:page="page"
            :items-per-page="itemsPerPage"
            :total="total"
            :sibling-count="1"
            size="sm"
            :to="(pageSelected) => ({
              path,
              query: { page: pageSelected }
            })"
            :ui="{
              first: 'hidden',
              last: 'hidden'
            }"
            variant="ghost"
          />
        </div>
      </template>
    </UPageHeader>
    <UMain class="flex flex-col gap-8 py-8 items-center ">
      <UBlogPosts class="lg:gap-y-8">
        <UBlogPost
          v-for="(post, index) in data"
          :key="index"
          v-bind="post"
          :to="post.path"
          :image="post.image ? `${imagePath}/${post.image.src}` : undefined"
        />
      </UBlogPosts>
      <UPagination
        v-if="total"
        v-model:page="page"
        :items-per-page="itemsPerPage"
        :total="total"
        :to="(pageSelected) => ({
          path,
          query: { page: pageSelected }
        })"
      />
    </UMain>
  </UPage>
</template>
