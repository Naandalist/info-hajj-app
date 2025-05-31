function removeBrTags(htmlString: string): string {
  return htmlString.replace(/<br\s*\/?>/gi, '');
}

export {removeBrTags};
