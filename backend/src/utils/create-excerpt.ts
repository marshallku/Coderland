const EXCERPT_MAX_LENGTH = 50;

export default function createExcerpt(contents: string, excerpt: string) {
  if (!excerpt) {
    if (contents.length > EXCERPT_MAX_LENGTH) {
      return contents.slice(0, EXCERPT_MAX_LENGTH);
    }

    return contents.slice(0, EXCERPT_MAX_LENGTH);
  }

  if (excerpt.length > EXCERPT_MAX_LENGTH) {
    return excerpt.slice(0, EXCERPT_MAX_LENGTH);
  }

  return excerpt;
}
