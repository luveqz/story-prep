export function slugify(str: string): string {
  // Convert the string to lowercase and replace spaces with dashes
  const slug: string = str.toLowerCase().replace(/\s+/g, '-')

  // Remove any characters that are not letters, numbers, or dashes
  const cleanedSlug: string = slug.replace(/[^a-z0-9-]/g, '')

  // Remove leading and trailing dashes
  const finalSlug: string = cleanedSlug.replace(/^-+|-+$/g, '')

  return finalSlug
}
