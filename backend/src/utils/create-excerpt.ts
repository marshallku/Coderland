const EXCERPT_MAX_LENGTH = 50;

export default function createExcerpt(contents: string, excerpt: string) {
  if (!excerpt) {
    return contents.slice(EXCERPT_MAX_LENGTH);
  }

  if (excerpt.length > EXCERPT_MAX_LENGTH) {
    return excerpt.slice(EXCERPT_MAX_LENGTH);
  }

  return excerpt;
}
