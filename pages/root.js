export default function root() {
  return (
    <div class="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
      <div class="rounded border-gray-300 dark:border-gray-700 border-dashed border-2 h-24">
        <div class=" h-full w-full lg:h-48 lg:w-48 lg:mb-0 mb-3">
          <Image
            class=" w-full  object-scale-down lg:object-cover  lg:h-48 rounded-2xl"
            src={"https:" + thumbnail?.fields?.file?.url}
            width={thumbnail.fields.file.details.image.width}
            height={thumbnail.fields.file.details.image.height}
          />
        </div>
      </div>
      <div class="rounded border-gray-300 dark:border-gray-700 border-dashed border-2 h-24">
        بسيبيسب
      </div>
      <div class="rounded border-gray-300 dark:border-gray-700 border-dashed border-2 h-24">
        بيسبسبيب
      </div>
    </div>
  );
}
